import type { Box } from './geometry';
import { docBox } from './geometry';
import type { Timeline } from './timing';

const CURSOR_SVG =
  '<svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true"><path d="M2 2 L2 19 L7 14.5 L10.5 22 L13.5 20.6 L10 13.2 L17 13.2 Z" fill="#fff" stroke="#07080d" stroke-width="1.6" stroke-linejoin="round"/></svg>';

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, html = '') {
  const node = document.createElement(tag);
  node.className = className;
  node.innerHTML = html;
  return node;
}

/**
 * Camada visual que imita um editor de design por cima da página:
 * cursor com nome, caixa de seleção, guias de medida e painel de preenchimento.
 */
export class EditorOverlay {
  readonly root = el('div', 'editor-layer');
  private cursor = el('div', 'editor-cursor', `${CURSOR_SVG}<span></span>`);
  private selection = el('div', 'editor-selection', '<b></b><b></b><b></b><b></b><em></em><i></i>');
  private fill = el(
    'div',
    'editor-fill',
    '<div class="editor-fill__head"><span>Fill</span><span>100%</span></div><div class="editor-fill__swatches"></div><div class="editor-fill__hex"></div>',
  );
  private x = 0;
  private y = 0;

  constructor(
    private timeline: Timeline,
    userName: string,
  ) {
    this.root.setAttribute('aria-hidden', 'true');
    this.cursor.querySelector('span')!.textContent = userName;
    this.root.append(this.selection, this.fill, this.cursor);
    document.body.appendChild(this.root);
  }

  destroy() {
    this.root.remove();
  }

  private place() {
    this.cursor.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }

  /** Cursor entra pelo canto inferior direito da tela, se ainda não estiver visível. */
  private enter() {
    if (this.cursor.classList.contains('is-visible')) return;
    this.x = window.scrollX + window.innerWidth * 0.92;
    this.y = window.scrollY + window.innerHeight * 0.92;
    this.place();
    this.cursor.classList.add('is-visible');
  }

  async moveTo(x: number, y: number, token: number, duration = 620) {
    this.enter();
    const x0 = this.x;
    const y0 = this.y;
    await this.timeline.tween(duration, token, (e) => {
      this.x = x0 + (x - x0) * e;
      this.y = y0 + (y - y0) * e - Math.sin(e * Math.PI) * 18; // leve arco, como mão humana
      this.place();
    });
  }

  /** Mantém o cursor "grudado" num ponto durante um arraste. */
  follow(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.place();
  }

  press() {
    this.cursor.classList.add('is-pressed');
  }

  release() {
    this.cursor.classList.remove('is-pressed');
  }

  async click(token: number) {
    this.press();
    await this.timeline.wait(140, token);
    this.release();
    await this.timeline.wait(90, token);
  }

  async leave(token: number) {
    await this.moveTo(window.scrollX + window.innerWidth + 40, this.y, token, 650);
    this.cursor.classList.remove('is-visible');
  }

  hideCursor() {
    this.cursor.classList.remove('is-visible');
  }

  select(target: Element, label: string, variant: 'object' | 'text' = 'object') {
    const box = docBox(target);
    this.selection.className = `editor-selection is-visible${variant === 'text' ? ' is-text' : ''}`;
    Object.assign(this.selection.style, {
      left: `${box.x}px`,
      top: `${box.y}px`,
      width: `${box.w}px`,
      height: `${box.h}px`,
    });
    this.selection.querySelector('em')!.textContent = label;
    this.selection.querySelector('i')!.textContent = `${Math.round(box.w)} × ${Math.round(box.h)}`;
  }

  unselect() {
    this.selection.className = 'editor-selection';
  }

  /** Linha vermelha de medida/alinhamento. Retorna o elemento para ser removido depois. */
  guide(box: Box, label?: string) {
    const g = el('div', 'editor-guide', label ? `<em>${label}</em>` : '');
    Object.assign(g.style, {
      left: `${box.x}px`,
      top: `${box.y}px`,
      width: `${Math.max(1, box.w)}px`,
      height: `${Math.max(1, box.h)}px`,
    });
    g.classList.toggle('is-horizontal', box.w > box.h);
    this.root.appendChild(g);
    requestAnimationFrame(() => g.classList.add('is-visible'));
    return g;
  }

  clearGuides(guides: HTMLElement[]) {
    guides.forEach((g) => {
      g.classList.remove('is-visible');
      setTimeout(() => g.remove(), 300);
    });
  }

  /** Abre o painel de preenchimento ao lado do alvo e devolve as amostras de cor. */
  openFill(anchor: Element, colors: string[], current: string) {
    const box = docBox(anchor);
    const left = Math.min(box.x + box.w + 16, window.scrollX + window.innerWidth - 206);
    Object.assign(this.fill.style, { left: `${left}px`, top: `${box.y}px` });
    const swatches = this.fill.querySelector('.editor-fill__swatches')!;
    swatches.innerHTML = colors.map((c) => `<i style="background:${c}"></i>`).join('');
    this.setFillHex(current);
    this.fill.classList.add('is-visible');
    return Array.from(swatches.children) as HTMLElement[];
  }

  setFillHex(hex: string) {
    this.fill.querySelector('.editor-fill__hex')!.textContent = hex.toUpperCase();
  }

  closeFill() {
    this.fill.classList.remove('is-visible');
  }
}
