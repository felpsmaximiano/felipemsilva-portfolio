import { readOffset } from '@/lib/editor-session/geometry';

/**
 * Elementos da página marcados com `data-intro="rótulo"` participam da abertura.
 * - padrão (`box`): uma caixa de seleção voa até o elemento e ele é "desenhado" dentro dela
 * - `draw`: igual, mas o próprio elemento cuida do desenho (ex.: título em SVG)
 * - `fade`: aparece suavemente no fim, sem caixa
 */
export type IntroMode = 'box' | 'draw' | 'fade';

export interface IntroTarget {
  el: HTMLElement;
  label: string;
  mode: IntroMode;
}

export interface Placement {
  cx: number;
  cy: number;
  w: number;
  h: number;
  rotate: number;
}

export function collectTargets(): IntroTarget[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-intro]')).map((el) => ({
    el,
    label: el.dataset.intro ?? '',
    mode: (el.dataset.introMode as IntroMode | undefined) ?? 'box',
  }));
}

/**
 * Posição real do elemento na tela, incluindo rotação e escala de quando ele
 * está "fora do lugar". Assim a caixa pousa exatamente em cima dele.
 */
export function measure(el: HTMLElement): Placement {
  const rect = el.getBoundingClientRect();
  const offset = readOffset(el);
  const scale = offset?.scale ?? 1;
  const hasLayoutSize = el instanceof HTMLElement && el.offsetWidth > 0;
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
    w: hasLayoutSize ? el.offsetWidth * scale : rect.width,
    h: hasLayoutSize ? el.offsetHeight * scale : rect.height,
    rotate: offset?.rotate ?? 0,
  };
}

export const isOnScreen = (el: HTMLElement) => el.getBoundingClientRect().top < window.innerHeight;

/** Marca o elemento como revelado; o CSS cuida da animação de entrada. */
export function reveal(el: HTMLElement, how: 'wipe' | 'fade' | 'show') {
  el.dataset.introState = how;
}
