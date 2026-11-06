export type Lang = 'pt' | 'en';

/** Valor traduzido: o mesmo dado em cada idioma suportado. */
export type Localized<T> = Record<Lang, T>;

/** Texto com trechos em destaque: strings comuns ou `{ b: '...' }` para negrito. */
export type RichText = ReadonlyArray<string | { b: string }>;

export interface Project {
  id: string;
  name: string;
  tag: Localized<string>;
  summary: Localized<string>;
  highlights: Localized<string[]>;
  /** Endereço público. Sem `url`, o projeto é de uso interno. */
  url?: string;
  domain?: string;
  /** Ocupa duas colunas na grade. */
  wide?: boolean;
}

export interface TimelineItem {
  period: Localized<string>;
  role: Localized<string>;
  place: string;
  description: Localized<string>;
  current?: boolean;
  image?: { src: string; alt: Localized<string> };
}

export interface SkillGroup {
  id: string;
  title: Localized<string>;
  kicker: Localized<string>;
  items: ReadonlyArray<string | Localized<string>>;
}

export interface SpokenLanguage {
  name: Localized<string>;
  level: Localized<string>;
  /** Nível de 1 a 5, usado no medidor. */
  score: 1 | 2 | 3 | 4 | 5;
}
