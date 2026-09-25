import { useEffect, useRef, useState } from "react";
import { createAscii } from "./engine";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    const rgb = (name) =>
        cs
            .getPropertyValue(`--${name}`)
            .trim()
            .split(/\s+/)
            .map((x) => Number(x) / 255);
    return { fg: rgb("fg"), accent: rgb("accent"), dim: rgb("dim") };
};

// A live ASCII-rendered 3D object. It turns toward the pointer, the light
// follows the pointer too, and it can be flung around by dragging. Renders
// only while on screen; with reduced motion the clock stops but it still
// answers the pointer.
//
// fontSize can be a number or (width) => number, so the character grid can get
// finer on small screens instead of the object getting chunkier.
export default function AsciiObject({
    scene,
    fontSize = 12,
    scale = 1,
    offset = [0, 0],
    anchor = null,
    field = 0,
    fieldRadius = 0.6,
    spin = 0.35,
    camDist = 8,
    follow = 0.55,
    className = "",
    fallback = null,
}) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);
    const [failed, setFailed] = useState(false);
    const props = useRef({});
    props.current = {
        fontSize,
        scale,
        offset,
        anchor,
        field,
        fieldRadius,
        spin,
        camDist,
        follow,
    };

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        let engine = null;
        try {
            engine = createAscii(canvas, scene);
        } catch (e) {
            console.warn(e);
        }
        if (!engine) {
            setFailed(true);
            return;
        }

        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        engine.setColors(readColors());

        let disposed = false;
        let view = { width: 1, height: 1 };
        // anchor [fx, fy] places the object at that fraction of the canvas;
        // the engine wants it in view-height units from the centre.
        const objOffset = () => {
            const a = props.current.anchor;
            if (!a) return props.current.offset;
            return [
                ((a[0] - 0.5) * 2 * view.width) / view.height,
                (0.5 - a[1]) * 2,
            ];
        };
        const resize = () => {
            if (disposed) return;
            const r = wrap.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) return;
            const fs = props.current.fontSize;
            view = engine.resize(
                r.width,
                r.height,
                typeof fs === "function" ? fs(r.width) : fs,
            );
            kick();
        };

        const ptr = { x: 0, y: 0 };
        const cur = { yaw: 0, pitch: 0, lx: 0, ly: 0 };
        let drag = null;
        let spinVel = 0;
        let spinAngle = 0;

        const onMove = (e) => {
            const r = canvas.getBoundingClientRect();
            const [ox, oy] = objOffset();
            const cx = r.left + r.width / 2 + (ox * r.height) / 2;
            const cy = r.top + r.height / 2 - (oy * r.height) / 2;
            const span = Math.max(r.height, 320);
            ptr.x = clamp((e.clientX - cx) / span, -1.2, 1.2);
            ptr.y = clamp((e.clientY - cy) / span, -1.2, 1.2);
            if (drag) {
                spinVel = (e.clientX - drag) * 0.012;
                spinAngle += spinVel;
                drag = e.clientX;
            }
            kick();
        };
        const onDown = (e) => {
            drag = e.clientX;
            canvas.setPointerCapture?.(e.pointerId);
        };
        const onUp = () => {
            drag = null;
        };

        let raf = 0;
        let visible = true;
        let settled = 0;
        const t0 = performance.now();

        const frame = (now) => {
            raf = 0;
            const p = props.current;
            const time = reduce ? 3 : (now - t0) / 1000;
            const k = 0.075;
            const tYaw = ptr.x * p.follow;
            const tPitch = ptr.y * p.follow * 0.6;
            cur.yaw += (tYaw - cur.yaw) * k;
            cur.pitch += (tPitch - cur.pitch) * k;
            cur.lx += (ptr.x - cur.lx) * 0.1;
            cur.ly += (ptr.y - cur.ly) * 0.1;
            if (!drag) {
                spinVel *= 0.94;
                spinAngle += spinVel;
            }
            const idle = reduce ? 0 : Math.sin(time * 0.23) * p.spin;
            engine.render({
                time,
                yaw: cur.yaw + idle + spinAngle,
                pitch: cur.pitch,
                light: [-0.35 + cur.lx * 1.1, 0.5 - cur.ly * 0.9, 0.75],
                scale: p.scale,
                offset: objOffset(),
                camDist: p.camDist,
                field: p.field,
                fieldRadius: p.fieldRadius,
            });

            // With motion on, run while visible. With it off, run only until
            // the pointer easing has settled.
            const moving =
                Math.abs(tYaw - cur.yaw) > 1e-3 ||
                Math.abs(spinVel) > 1e-3 ||
                drag !== null;
            settled = moving ? 0 : settled + 1;
            if (visible && !document.hidden && (!reduce || settled < 30)) {
                raf = requestAnimationFrame(frame);
            }
        };
        const kick = () => {
            if (disposed) return;
            settled = 0;
            if (!raf && visible) raf = requestAnimationFrame(frame);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(wrap);
        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) kick();
        });
        io.observe(wrap);
        const mo = new MutationObserver(() => {
            engine.setColors(readColors());
            kick();
        });
        mo.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-scheme"],
        });
        const onVis = () => !document.hidden && kick();
        const onLost = (e) => {
            e.preventDefault();
            setFailed(true);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        canvas.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        document.addEventListener("visibilitychange", onVis);
        canvas.addEventListener("webglcontextlost", onLost);
        // Glyph shapes are measured from the real font, so wait for it
        document.fonts?.ready.then(resize) ?? resize();

        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            mo.disconnect();
            window.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            document.removeEventListener("visibilitychange", onVis);
            canvas.removeEventListener("webglcontextlost", onLost);
            engine.destroy();
        };
    }, [scene]);

    return (
        <div
            ref={wrapRef}
            aria-hidden="true"
            className={`relative flex items-center justify-center overflow-hidden ${className}`}
        >
            {failed ? (
                fallback
            ) : (
                <canvas
                    ref={canvasRef}
                    className="block cursor-grab active:cursor-grabbing touch-pan-y"
                />
            )}
        </div>
    );
}
