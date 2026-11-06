interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  on: boolean;
  size: number;
}

interface HalftoneOptions {
  text: string;
  caption: string;
  reducedMotion: boolean;
  onPointer?: (x: number, y: number) => void;
}

/**
 * Desenha um texto em meio-tom (pontos) num canvas. Os pontos fogem do ponteiro
 * e voltam para o lugar com uma mola simples. Retorna a função de limpeza.
 */
export function mountHalftone(canvas: HTMLCanvasElement, host: HTMLElement, opts: HalftoneOptions) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  let dots: Dot[] = [];
  let width = 0;
  let height = 0;
  let pointer = { x: -999, y: -999 };
  let frame = 0;

  function build() {
    const rect = host.getBoundingClientRect();
    width = Math.round(rect.width);
    height = Math.round(rect.height);
    if (!width || !height) return;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // rasteriza o texto num canvas auxiliar e amostra uma grade de pontos
    const off = document.createElement('canvas');
    off.width = width;
    off.height = height;
    const g = off.getContext('2d')!;
    g.fillStyle = '#000';
    g.fillRect(0, 0, width, height);
    g.fillStyle = '#fff';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = `400 ${width * 0.62}px Anton, Impact, sans-serif`;
    g.fillText(opts.text, width / 2, height * 0.42);
    g.font = `600 ${width * 0.06}px "JetBrains Mono", monospace`;
    g.fillText(opts.caption, width / 2, height * 0.8);

    const data = g.getImageData(0, 0, width, height).data;
    const step = Math.max(6, Math.round(width / 46));
    dots = [];
    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        const on = data[(Math.floor(y) * width + Math.floor(x)) * 4] > 128;
        dots.push({ x, y, ox: x, oy: y, on, size: step });
      }
    }
  }

  function draw(time: number) {
    ctx!.clearRect(0, 0, width, height);
    for (const d of dots) {
      if (!opts.reducedMotion) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          const force = (90 - dist) / 90;
          d.x += (dx / dist) * force * 6;
          d.y += (dy / dist) * force * 6;
        }
        d.x += (d.ox - d.x) * 0.08;
        d.y += (d.oy - d.y) * 0.08;
      }
      const radius = d.on ? 0.42 : 0.07 + 0.04 * Math.sin(time / 900 + d.ox * 0.05 + d.oy * 0.03);
      ctx!.fillStyle = d.on ? '#ffffff' : 'rgba(255,255,255,.55)';
      ctx!.beginPath();
      ctx!.arc(d.x, d.y, d.size * radius, 0, Math.PI * 2);
      ctx!.fill();
    }
    frame = requestAnimationFrame(draw);
  }

  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    opts.onPointer?.(pointer.x, pointer.y);
  };
  const onLeave = () => {
    pointer = { x: -999, y: -999 };
  };

  const resize = new ResizeObserver(() => build());
  resize.observe(host);
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);
  build();
  frame = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(frame);
    resize.disconnect();
    host.removeEventListener('pointermove', onMove);
    host.removeEventListener('pointerleave', onLeave);
  };
}
