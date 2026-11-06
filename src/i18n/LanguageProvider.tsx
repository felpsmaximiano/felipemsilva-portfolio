import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ui, type Lang } from '@/content';
import { LanguageContext } from './LanguageContext';

const STORAGE_KEY = 'fm-lang';

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'pt';
  } catch {
    return 'pt';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // armazenamento indisponível (aba anônima, por exemplo): só não lembra a escolha
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === 'pt' ? 'en' : 'pt')), []);

  const value = useMemo(() => ({ lang, t: ui[lang], setLang, toggleLang }), [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
