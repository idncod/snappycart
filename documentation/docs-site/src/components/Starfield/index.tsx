import type {ReactNode} from 'react';
import {useEffect, useRef} from 'react';
import styles from './styles.module.scss';

type Star = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    a: number;
};

export default function Starfield(): ReactNode {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const starsRef = useRef<Star[]>([]);
    const sizeRef = useRef({w: 0, h: 0, dpr: 1});

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const resize = () => {
            const parent = canvas.parentElement;
            const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
            sizeRef.current = {w: rect.width, h: rect.height, dpr};

            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(rect.height * dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const area = rect.width * rect.height;
            const count = Math.max(90, Math.min(280, Math.floor(area / 6200)));

            starsRef.current = Array.from({length: count}).map(() => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                r: 0.6 + Math.random() * 1.7,
                vx: -0.15 - Math.random() * 0.55,
                vy: 0.03 + Math.random() * 0.18,
                a: 0.3 + Math.random() * 0.7,
            }));
        };

        const step = () => {
            const {w, h} = sizeRef.current;
            ctx.clearRect(0, 0, w, h);

            const stars = starsRef.current;
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                s.x += s.vx;
                s.y += s.vy;

                if (s.x < -10) s.x = w + 10;
                if (s.y > h + 10) s.y = -10;

                ctx.globalAlpha = s.a;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }

            ctx.globalAlpha = 1;

            if (!reduced) rafRef.current = window.requestAnimationFrame(step);
        };

        const ro = new ResizeObserver(resize);
        if (canvas.parentElement) ro.observe(canvas.parentElement);

        resize();
        step();

        return () => {
            ro.disconnect();
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
