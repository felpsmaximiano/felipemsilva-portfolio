interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

/** Rastro de partículas que segue o mouse (só em dispositivos com ponteiro fino). */
export function mountCursorTrail(canvas: HTMLCanvasElement, color = '91,116,255') {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let particles: Particle[] = [];
  let frame = 0;

  const resize = () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const onMove = (e: PointerEvent) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6 - 0.4,
        life: 1,
        size: 1 + Math.random() * 2.2,
      });
    }
  };

  const loop = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter((p) => (p.life -= 0.03) > 0);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      ctx.fillStyle = `rgba(${color},${p.life * 0.8})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    frame = requestAnimationFrame(loop);
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
  };
}
