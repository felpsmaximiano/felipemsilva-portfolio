export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Retângulo do elemento em coordenadas do documento (não da janela). */
export function docBox(el: Element): Box {
  const r = el.getBoundingClientRect();
  return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
}

export interface Offset {
  tx: number;
  ty: number;
  rotate: number;
  scale: number;
}

/**
 * Lê o "erro de posição" declarado no HTML: `data-offset="tx,ty,rotação,escala"`.
 * Usa as propriedades CSS independentes (translate/rotate/scale) para não
 * brigar com `transform` de outras animações.
 */
export function readOffset(el: HTMLElement): Offset | null {
  const raw = el.dataset.offset;
  if (!raw) return null;
  const [tx = 0, ty = 0, rotate = 0, scale = 1] = raw.split(',').map(Number);
  return { tx, ty, rotate, scale };
}

export function applyOffset(el: HTMLElement, o: Offset, progress = 0) {
  const k = 1 - progress;
  el.style.translate = `${o.tx * k}px ${o.ty * k}px`;
  el.style.rotate = `${o.rotate * k}deg`;
  el.style.scale = String(o.scale + (1 - o.scale) * progress);
}

export function clearOffset(el: HTMLElement) {
  el.style.translate = '';
  el.style.rotate = '';
  el.style.scale = '';
}
