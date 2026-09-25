// Glyph set for the ASCII renderer, measured by shape rather than brightness.
//
// Each glyph gets a 6-number "shape vector": how much ink falls in six sampling
// circles laid out 2 wide by 3 tall across the cell. The renderer samples the
// 3D scene at the same six spots per cell and picks the glyph whose vector is
// closest, so a diagonal silhouette comes out as `/` instead of a smudge of `%`.
// Technique from Alex Harri's "ASCII characters are not pixels".

// Order is irrelevant to matching; index 0 must stay the space.
// Letters are mostly left out on purpose: they match shapes well but a solid
// face full of 8s and Bs reads as text noise instead of a surface.
export const CHARSET = " .,:;'`\"^-_~=+*!|/\\()<>[]{}ilLJTvx#%@";

// Flat regions (all six samples about equal) use this density ramp instead of
// shape matching, so faces shade smoothly and only silhouettes get the
// directional glyphs. Every character here must also be in CHARSET.
export const RAMP = " .:-=+*#%@";
export const rampIndices = () => [...RAMP].map((c) => CHARSET.indexOf(c));

// Rendered at the end of the atlas but never matched: the faint dot field
// drawn in empty cells around the object.
export const FIELD_GLYPH = "·";

// Sub-sample layout inside a cell, row-major from the top-left. The scene pass
// shades exactly these six regions, so the two must agree.
export const SAMPLE_POINTS = [
    [0.25, 1 / 6],
    [0.75, 1 / 6],
    [0.25, 0.5],
    [0.75, 0.5],
    [0.25, 5 / 6],
    [0.75, 5 / 6],
];

export const FONT_STACK = '"Victor Mono", ui-monospace, Menlo, monospace';

// Victor Mono's advance is 600/1100 em. Cells are a little shorter than the
// font's line box so the vertical resolution holds up.
export const CELL_W = 600 / 1100;
export const CELL_H = 1.2;

const shapeVectors = () => {
    // Measured once, large, so small cells don't quantise the result
    const px = 96;
    const w = Math.round(px * CELL_W);
    const h = Math.round(px * CELL_H);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const radius = w * 0.3;

    const vectors = [];
    for (const ch of CHARSET) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#fff";
        ctx.font = `${px}px ${FONT_STACK}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ch, w / 2, h / 2);
        const data = ctx.getImageData(0, 0, w, h).data;

        const vec = SAMPLE_POINTS.map(([sx, sy]) => {
            const cx = sx * w;
            const cy = sy * h;
            let ink = 0;
            let n = 0;
            for (let y = Math.floor(cy - radius); y <= cy + radius; y++) {
                for (let x = Math.floor(cx - radius); x <= cx + radius; x++) {
                    if (x < 0 || y < 0 || x >= w || y >= h) continue;
                    if ((x - cx) ** 2 + (y - cy) ** 2 > radius * radius)
                        continue;
                    ink += data[(y * w + x) * 4 + 3] / 255;
                    n++;
                }
            }
            return n ? ink / n : 0;
        });
        vectors.push(vec);
    }

    // Normalise so the inkiest glyph region reads as full brightness
    const max = Math.max(...vectors.flat());
    return vectors.map((v) => v.map((x) => x / max));
};

let cachedVectors = null;

// Shape vectors packed two RGBA texels per glyph: (v0 v1 v2 v3) (v4 v5 0 0)
export const glyphVectorTexels = () => {
    cachedVectors ??= shapeVectors();
    const data = new Uint8Array(cachedVectors.length * 8);
    cachedVectors.forEach((v, i) => {
        for (let k = 0; k < 6; k++) data[i * 8 + k] = Math.round(v[k] * 255);
    });
    return { data, count: cachedVectors.length };
};

// One row of cells, white glyphs on transparent, at device-pixel cell size.
export const buildAtlas = (cw, ch, fontPx) => {
    const glyphs = CHARSET + FIELD_GLYPH;
    const canvas = document.createElement("canvas");
    canvas.width = cw * glyphs.length;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.font = `${fontPx}px ${FONT_STACK}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    [...glyphs].forEach((g, i) => ctx.fillText(g, i * cw + cw / 2, ch / 2));
    return canvas;
};
