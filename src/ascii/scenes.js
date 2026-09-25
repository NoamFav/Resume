// SDF scenes for the ASCII renderer. Each one is GLSL defining
//   float map(vec3 p, out float mat)
// in object space, roughly within a radius of 2.5. `mat` is 1 for the parts
// drawn in the accent colour, 0 otherwise. uTime is available.

// The NF monogram, extruded, with an accent orbit and a satellite riding it.
const monogram = /* glsl */ `
float letterN(vec2 p) {
    float l = sdBox2(p - vec2(-0.8, 0.0), vec2(0.17, 1.0));
    float r = sdBox2(p - vec2(0.8, 0.0), vec2(0.17, 1.0));
    vec2 q = p * rot(0.8961);
    float diag = max(sdBox2(q, vec2(1.28, 0.2)), abs(p.y) - 1.0);
    return min(min(l, r), diag);
}
float letterF(vec2 p) {
    float stem = sdBox2(p - vec2(-0.62, 0.0), vec2(0.17, 1.0));
    float top = sdBox2(p - vec2(0.05, 0.83), vec2(0.67, 0.17));
    float mid = sdBox2(p - vec2(-0.05, 0.02), vec2(0.55, 0.15));
    return min(stem, min(top, mid));
}
float map(vec3 p, out float mat) {
    mat = 0.0;
    float d2 = min(letterN(p.xy - vec2(-1.05, 0.0)), letterF(p.xy - vec2(1.3, 0.0)));
    float letters = extrude(p, d2, 0.3) - 0.035;

    vec3 q = p;
    q.yz *= rot(0.38);
    q.xy *= rot(-0.12);
    q.xz *= rot(uTime * 0.32);
    float ring = sdTorus(q, vec2(2.6, 0.045));
    float sat = length(q - vec3(2.6, 0.0, 0.0)) - 0.15;
    float orbit = min(ring, sat);

    if (orbit < letters) { mat = 1.0; return orbit; }
    return letters;
}
`;

// Dev suite: a gear with windows, turning, around an accent hub.
const gear = /* glsl */ `
float map(vec3 p, out float mat) {
    mat = 0.0;
    vec3 g = p;
    g.xy *= rot(uTime * 0.45);
    float r = length(g.xy);
    float a = atan(g.y, g.x);
    float sector = 6.2831853 / 10.0;
    float a2 = mod(a + sector * 0.5, sector) - sector * 0.5;
    vec2 q = r * vec2(cos(a2), sin(a2));
    float tooth = sdBox2(q - vec2(1.12, 0.0), vec2(0.2, 0.15)) - 0.03;
    float body = r - 1.0;
    float d2 = min(body, tooth);
    float w = 6.2831853 / 5.0;
    float a3 = mod(a + w * 0.5, w) - w * 0.5;
    vec2 wq = r * vec2(cos(a3), sin(a3)) - vec2(0.66, 0.0);
    d2 = max(d2, -(length(wq) - 0.19));
    d2 = max(d2, 0.34 - r);
    float gearD = extrude(g, d2, 0.2) - 0.02;

    float hub = sdTorus(g.xzy, vec2(0.34, 0.075));
    if (hub < gearD) { mat = 1.0; return hub; }
    return gearD;
}
`;

// Sys suite: live telemetry bars on a plinth; bars peaking go accent.
const bars = /* glsl */ `
float map(vec3 p, out float mat) {
    mat = 0.0;
    float d = 1e9;
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float h = 0.22 + 0.72 * (0.5 + 0.5 * sin(uTime * 1.5 + fi * 1.7 + sin(uTime * 0.6 + fi * 2.3)));
        vec3 q = p - vec3(-1.2 + fi * 0.6, -1.0 + h, 0.0);
        float b = sdBox(q, vec3(0.19, h, 0.19)) - 0.02;
        if (b < d) { d = b; mat = step(0.82, h); }
    }
    float base = sdBox(p - vec3(0.0, -1.1, 0.0), vec3(1.62, 0.05, 0.42)) - 0.01;
    if (base < d) { d = base; mat = 0.0; }
    return d;
}
`;

// Iris suite: an eye. The pupil faces the camera, so when the object turns
// toward the pointer, it looks at you. Surface ripples like a voice.
const iris = /* glsl */ `
float map(vec3 p, out float mat) {
    mat = 0.0;
    float ripple = 0.022 * sin(11.0 * p.y - uTime * 3.2) * sin(8.0 * p.x + uTime * 2.1);
    float s = length(p) - 0.92 - ripple;
    float pupil = length(p - vec3(0.0, 0.0, 1.04)) - 0.44;
    s = max(s, -pupil);

    vec3 q = p;
    q.yz *= rot(1.2);
    q.xy *= rot(0.35);
    q.xz *= rot(uTime * 0.55);
    float ring = sdTorus(q, vec2(1.42, 0.045));
    float sat = length(q - vec3(1.42, 0.0, 0.0)) - 0.11;
    float acc = min(ring, sat);
    if (acc < s) { mat = 1.0; return acc; }
    return s;
}
`;

// Lab suite: an open cube frame with an accent octahedron spinning inside.
const lab = /* glsl */ `
float map(vec3 p, out float mat) {
    mat = 0.0;
    vec3 f = p;
    f.xz *= rot(uTime * 0.3);
    f.xy *= rot(0.5);
    float frame = sdBoxFrame(f, vec3(0.95), 0.07) - 0.01;

    vec3 o = p;
    o.xz *= rot(-uTime * 0.8);
    o.yz *= rot(uTime * 0.5);
    float octa = sdOcta(o, 0.62) - 0.02;
    if (octa < frame) { mat = 1.0; return octa; }
    return frame;
}
`;

// Languages: `</>`, extruded, with the slash spinning between the chevrons.
const code = /* glsl */ `
float chevron(vec2 p) {
    p.y = abs(p.y);
    vec2 q = (p - vec2(0.0, 0.35)) * rot(-0.7188);
    return sdBox2(q, vec2(0.53, 0.12));
}
float map(vec3 p, out float mat) {
    mat = 0.0;
    float l = chevron(p.xy - vec2(-1.4, 0.0));
    float r = chevron(vec2(1.4 - p.x, p.y));
    float brackets = extrude(p, min(l, r), 0.26) - 0.03;

    vec3 s = p;
    s.xz *= rot(uTime * 0.9);
    float slash = extrude(s, sdBox2(s.xy * rot(-1.218), vec2(1.0, 0.11)), 0.26) - 0.03;
    if (slash < brackets) { mat = 1.0; return slash; }
    return brackets;
}
`;

// Frameworks: a stack of layers, each turning at its own pace; the top one
// is the accent.
const stack = /* glsl */ `
float map(vec3 p, out float mat) {
    mat = 0.0;
    float d = 1e9;
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        vec3 q = p - vec3(0.0, -0.8 + fi * 0.8 + 0.06 * sin(uTime * 1.3 + fi * 1.9), 0.0);
        q.xz *= rot(uTime * (0.22 + 0.18 * fi) + fi * 0.5);
        float b = sdBox(q, vec3(1.0, 0.11, 1.0)) - 0.06;
        if (b < d) { d = b; mat = step(1.5, fi); }
    }
    return d;
}
`;

export const SCENES = { monogram, gear, bars, iris, lab, code, stack };
