import { useCallback, useContext } from 'react';
import type { Localized } from '@/content';
import { LanguageContext } from './LanguageContext';

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage precisa estar dentro de <LanguageProvider>');

  const { lang } = ctx;
  /** Escolhe a versão do idioma atual de um valor traduzido. */
  const pick = useCallback(<T,>(value: Localized<T>): T => value[lang], [lang]);

  return { ...ctx, pick };
}
