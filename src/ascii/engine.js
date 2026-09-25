// Real-time 3D rendered as text. Three passes, all on the GPU:
//
//   1. scene   raymarch the SDF at 2x3 samples per character cell (each one
//              supersampled 2x2), writing shade / accent / coverage
//   2. glyphs  per cell, contrast-shape the six samples and pick the glyph
//              whose shape vector is nearest (see glyphs.js)
//   3. draw    per pixel, stamp that glyph out of a font atlas in the theme's
//              colours
//
// Nothing is read back to the CPU, so a full-bleed hero costs about as much as
// a thumbnail would with a per-pixel ASCII post-process.

import {
    CELL_H,
    CELL_W,
    CHARSET,
    FONT_STACK,
    RAMP,
    buildAtlas,
    rampIndices,
    glyphVectorTexels,
} from "./glyphs";
import { SCENES } from "./scenes";

const VERT = `#version 300 es
void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const PRELUDE = `
uniform float uTime;
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float sdBox2(vec2 p, vec2 b) { vec2 d = abs(p) - b; return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0); }
float sdBox(vec3 p, vec3 b) { vec3 q = abs(p) - b; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0); }
float sdTorus(vec3 p, vec2 t) { vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdOcta(vec3 p, float s) { p = abs(p); return (p.x + p.y + p.z - s) * 0.57735027; }
float extrude(vec3 p, float d2, float h) { vec2 w = vec2(d2, abs(p.z) - h); return min(max(w.x, w.y), 0.0) + length(max(w, 0.0)); }
float sdBoxFrame(vec3 p, vec3 b, float e) {
    p = abs(p) - b;
    vec3 q = abs(p + e) - e;
    return min(min(
        length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
        length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)),
        length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0));
}
`;

const sceneFrag = (scene) => `#version 300 es
precision highp float;
uniform vec2 uView;
uniform vec2 uSampleRes;
uniform vec2 uRot;
uniform vec3 uLight;
uniform float uScale;
uniform vec2 uOffset;
uniform float uCamDist;
out vec4 outColor;
${PRELUDE}
${scene}
float sceneW(vec3 pw, out float mat) {
    vec3 p = pw;
    p.xz *= rot(uRot.x);
    p.yz *= rot(uRot.y);
    return map(p / uScale, mat) * uScale;
}
float sceneD(vec3 p) { float m; return sceneW(p, m); }
vec3 normalAt(vec3 p) {
    const vec2 k = vec2(1.0, -1.0);
    const float h = 0.002;
    return normalize(k.xyy * sceneD(p + k.xyy * h) + k.yyx * sceneD(p + k.yyx * h) +
                     k.yxy * sceneD(p + k.yxy * h) + k.xxx * sceneD(p + k.xxx * h));
}
vec3 shadeRay(vec2 uv) {
    vec3 ro = vec3(0.0, 0.0, uCamDist);
    vec3 rd = normalize(vec3((uv - uOffset) * 0.2867, -1.0));
    float t = uCamDist - 3.2 * uScale;
    float mat = 0.0;
    for (int i = 0; i < 90; i++) {
        vec3 p = ro + rd * t;
        float d = sceneW(p, mat);
        if (d < 0.0012 * t) {
            vec3 n = normalAt(p);
            // Point light, so even flat faces carry a gradient across them
            vec3 L = normalize(uLight * 5.0 * uScale - p);
            float dif = max(dot(n, L), 0.0);
            float rim = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
            float spec = pow(max(dot(reflect(-L, n), -rd), 0.0), 18.0);
            float s = 0.12 + 0.82 * dif + 0.28 * rim + 0.4 * spec;
            s *= mix(1.0, 0.6, clamp((t - uCamDist + 2.0 * uScale) / (4.0 * uScale), 0.0, 1.0));
            return vec3(s, mat, 1.0);
        }
        t += d * 0.8;
        if (t > uCamDist + 3.5 * uScale) break;
    }
    return vec3(0.0);
}
void main() {
    vec2 foot = uView / uSampleRes;
    vec2 base = floor(gl_FragCoord.xy);
    vec3 acc = vec3(0.0);
    for (int j = 0; j < 2; j++) {
        for (int i = 0; i < 2; i++) {
            vec2 px = (base + vec2(0.25 + 0.5 * float(i), 0.25 + 0.5 * float(j))) * foot;
            acc += shadeRay((px - 0.5 * uView) / (0.5 * uView.y));
        }
    }
    acc *= 0.25;
    outColor = vec4(clamp(acc.x, 0.0, 1.0), acc.y, acc.z, 1.0);
}`;

const GLYPH_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uSamples;
uniform sampler2D uGlyphVec;
uniform int uGlyphCount;
uniform float uContrast;
uniform float uGain;
uniform int uRamp[${RAMP.length}];
uniform float uFlat;
out vec4 outColor;
void main() {
    ivec2 c = ivec2(gl_FragCoord.xy);
    float s[6];
    float mx = 0.0;
    float accent = 0.0;
    for (int k = 0; k < 6; k++) {
        vec4 t = texelFetch(uSamples, ivec2(c.x * 2 + k % 2, c.y * 3 + 2 - k / 2), 0);
        s[k] = t.r * uGain;
        mx = max(mx, s[k]);
        accent += t.g;
    }
    if (mx < 0.035) { outColor = vec4(0.0); return; }
    float mean = (s[0] + s[1] + s[2] + s[3] + s[4] + s[5]) / 6.0;
    float dev = 0.0;
    for (int k = 0; k < 6; k++) dev += (s[k] - mean) * (s[k] - mean);
    dev = sqrt(dev / 6.0);
    if (dev < uFlat) {
        int r = int(clamp(mean, 0.0, 0.999) * float(${RAMP.length}));
        outColor = vec4(float(uRamp[r]) / 255.0, clamp(mean, 0.0, 1.0), accent / 6.0, 1.0);
        return;
    }
    float bright = mean * 6.0;
    for (int k = 0; k < 6; k++) s[k] = pow(s[k] / mx, uContrast) * mx;
    int best = 0;
    float bestD = s[0]*s[0] + s[1]*s[1] + s[2]*s[2] + s[3]*s[3] + s[4]*s[4] + s[5]*s[5];
    for (int i = 1; i < 128; i++) {
        if (i >= uGlyphCount) break;
        vec4 a = texelFetch(uGlyphVec, ivec2(i * 2, 0), 0);
        vec4 b = texelFetch(uGlyphVec, ivec2(i * 2 + 1, 0), 0);
        vec3 d1 = vec3(s[0], s[1], s[2]) - a.rgb;
        vec3 d2 = vec3(s[3], s[4], s[5]) - vec3(a.a, b.r, b.g);
        float d = dot(d1, d1) + dot(d2, d2);
        if (d < bestD) { bestD = d; best = i; }
    }
    outColor = vec4(float(best) / 255.0, clamp(bright / 6.0, 0.0, 1.0), accent / 6.0, 1.0);
}`;

const DRAW_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uCells;
uniform sampler2D uAtlas;
uniform vec2 uCell;
uniform vec3 uFg;
uniform vec3 uAccent;
uniform vec3 uDim;
uniform float uField;
uniform int uFieldIdx;
uniform vec2 uFieldCenter;
uniform vec2 uFieldRadius;
out vec4 outColor;
void main() {
    vec2 f = gl_FragCoord.xy;
    ivec2 cell = ivec2(floor(f / uCell));
    vec4 c = texelFetch(uCells, cell, 0);
    int idx = int(c.r * 255.0 + 0.5);
    vec3 col;
    float opacity;
    if (idx == 0) {
        if (uField <= 0.0) discard;
        vec2 d = (vec2(cell) + 0.5 - uFieldCenter) / uFieldRadius;
        float fall = 1.0 - smoothstep(0.25, 1.0, length(d));
        // every other column only, so it reads as a dot grid, not a haze
        if (fall <= 0.0 || (cell.x % 2) == 1) discard;
        idx = uFieldIdx;
        col = uDim;
        opacity = uField * fall;
    } else {
        col = mix(uFg, uAccent, step(0.3, c.b));
        opacity = mix(0.45, 1.0, smoothstep(0.04, 0.6, c.g));
    }
    vec2 local = f - vec2(cell) * uCell;
    ivec2 at = ivec2(idx * int(uCell.x) + int(local.x), int(uCell.y) - 1 - int(local.y));
    float a = texelFetch(uAtlas, at, 0).a * opacity;
    outColor = vec4(col * a, a);
}`;

const compile = (gl, type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`ascii shader: ${log}`);
    }
    return sh;
};

const program = (gl, frag) => {
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        throw new Error(`ascii link: ${gl.getProgramInfoLog(p)}`);
    const uniforms = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
        const { name } = gl.getActiveUniform(p, i);
        uniforms[name] = gl.getUniformLocation(p, name);
    }
    return { p, u: uniforms };
};

const texture = (gl, w, h, data = null) => {
    const t = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
};

const target = (gl, w, h) => {
    const tex = texture(gl, w, h);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return { tex, fbo, w, h };
};

const measureCell = (fontPx) => {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${fontPx}px ${FONT_STACK}`;
    const w = ctx.measureText("M").width || fontPx * CELL_W;
    return [Math.max(2, Math.round(w)), Math.max(4, Math.round(fontPx * CELL_H))];
};

export const createAscii = (canvas, sceneName) => {
    const gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        depth: false,
        stencil: false,
    });
    if (!gl) return null;

    const scene = program(gl, sceneFrag(SCENES[sceneName] ?? SCENES.monogram));
    const glyph = program(gl, GLYPH_FRAG);
    const draw = program(gl, DRAW_FRAG);

    const vectors = glyphVectorTexels();
    const ramp = new Int32Array(rampIndices());
    const glyphTex = texture(gl, vectors.count * 2, 1, vectors.data);

    let grid = null;
    let colors = { fg: [1, 1, 1], accent: [0.7, 1, 0.4], dim: [0.4, 0.4, 0.4] };

    const disposeGrid = () => {
        if (!grid) return;
        for (const t of [grid.samples, grid.cells]) {
            gl.deleteTexture(t.tex);
            gl.deleteFramebuffer(t.fbo);
        }
        gl.deleteTexture(grid.atlas);
    };

    // Fit the character grid inside cssW x cssH. Returns the canvas's CSS size,
    // which is whole cells and therefore usually a hair smaller than asked.
    const resize = (cssW, cssH, fontSize) => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const fontPx = fontSize * dpr;
        const [cw, ch] = measureCell(fontPx);
        const cols = Math.max(1, Math.floor((cssW * dpr) / cw));
        const rows = Math.max(1, Math.floor((cssH * dpr) / ch));
        disposeGrid();

        canvas.width = cols * cw;
        canvas.height = rows * ch;
        const view = [canvas.width / dpr, canvas.height / dpr];
        canvas.style.width = `${view[0]}px`;
        canvas.style.height = `${view[1]}px`;

        const atlasCanvas = buildAtlas(cw, ch, fontPx);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        const atlas = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, atlas);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, gl.RGBA, gl.UNSIGNED_BYTE, atlasCanvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        grid = {
            cols,
            rows,
            cw,
            ch,
            dpr,
            view,
            atlas,
            samples: target(gl, cols * 2, rows * 3),
            cells: target(gl, cols, rows),
        };
        return { width: view[0], height: view[1], cols, rows };
    };

    const setColors = (c) => {
        colors = c;
    };

    const bindTex = (unit, tex, loc) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(loc, unit);
    };

    const render = ({
        time = 0,
        yaw = 0,
        pitch = 0,
        light = [-0.45, 0.55, 0.7],
        scale = 1,
        offset = [0, 0],
        camDist = 8,
        field = 0,
        fieldRadius = 0.6,
        contrast = 1.6,
        gain = 1.1,
        flat = 0.07,
    }) => {
        if (!grid || gl.isContextLost()) return;
        const { cols, rows, cw, ch, view, samples, cells, atlas } = grid;
        const l = Math.hypot(...light) || 1;

        // 1. scene
        gl.bindFramebuffer(gl.FRAMEBUFFER, samples.fbo);
        gl.viewport(0, 0, samples.w, samples.h);
        gl.useProgram(scene.p);
        gl.uniform2f(scene.u.uView, view[0], view[1]);
        gl.uniform2f(scene.u.uSampleRes, samples.w, samples.h);
        gl.uniform2f(scene.u.uRot, yaw, pitch);
        gl.uniform3f(scene.u.uLight, light[0] / l, light[1] / l, light[2] / l);
        gl.uniform1f(scene.u.uScale, scale);
        gl.uniform2f(scene.u.uOffset, offset[0], offset[1]);
        gl.uniform1f(scene.u.uCamDist, camDist);
        gl.uniform1f(scene.u.uTime, time);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // 2. glyph choice
        gl.bindFramebuffer(gl.FRAMEBUFFER, cells.fbo);
        gl.viewport(0, 0, cols, rows);
        gl.useProgram(glyph.p);
        bindTex(0, samples.tex, glyph.u.uSamples);
        bindTex(1, glyphTex, glyph.u.uGlyphVec);
        gl.uniform1i(glyph.u.uGlyphCount, vectors.count);
        gl.uniform1f(glyph.u.uContrast, contrast);
        gl.uniform1f(glyph.u.uGain, gain);
        gl.uniform1iv(glyph.u["uRamp[0]"], ramp);
        gl.uniform1f(glyph.u.uFlat, flat);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        // 3. draw
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(draw.p);
        bindTex(0, cells.tex, draw.u.uCells);
        bindTex(1, atlas, draw.u.uAtlas);
        gl.uniform2f(draw.u.uCell, cw, ch);
        gl.uniform3f(draw.u.uFg, ...colors.fg);
        gl.uniform3f(draw.u.uAccent, ...colors.accent);
        gl.uniform3f(draw.u.uDim, ...colors.dim);
        gl.uniform1f(draw.u.uField, field);
        gl.uniform1i(draw.u.uFieldIdx, CHARSET.length);
        // Object centre and falloff radius, in cells, y up
        const cellCss = [cw / grid.dpr, ch / grid.dpr];
        const cx = view[0] / 2 + (offset[0] * view[1]) / 2;
        const cy = view[1] / 2 + (offset[1] * view[1]) / 2;
        const r = fieldRadius * view[1];
        gl.uniform2f(draw.u.uFieldCenter, cx / cellCss[0], cy / cellCss[1]);
        gl.uniform2f(draw.u.uFieldRadius, r / cellCss[0], r / cellCss[1]);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const destroy = () => {
        disposeGrid();
        gl.deleteTexture(glyphTex);
        // No loseContext(): React remounts onto the same canvas in StrictMode,
        // and a lost context can't be got back.
        for (const p of [scene, glyph, draw]) gl.deleteProgram(p.p);
    };

    return { resize, render, setColors, destroy };
};
