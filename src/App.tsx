import { useCallback, useEffect, useMemo, useState } from 'react';
import { CursorTrail } from '@/components/editor/CursorTrail';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { Hero } from '@/components/hero/Hero';
import { IntroBuild } from '@/components/intro/IntroBuild';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';
import { profile } from '@/content';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { createEditorSession } from '@/lib/editor-session';

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [introDone, setIntroDone] = useState(reducedMotion);
  const [titleDrawn, setTitleDrawn] = useState(reducedMotion);

  // motor da "sessão de edição": cursor que arruma o layout depois da abertura
  const session = useMemo(
    () => createEditorSession({ userName: profile.firstName, reducedMotion }),
    [reducedMotion],
  );

  useEffect(() => {
    session.prepare();
    return () => session.destroy();
  }, [session]);

  const handleTitle = useCallback(() => setTitleDrawn(true), []);

  const handleIntroDone = useCallback(() => {
    setIntroDone(true);
    window.setTimeout(() => session.start(), 500);
  }, [session]);

  return (
    <>
      {!reducedMotion && <IntroBuild onTitle={handleTitle} onDone={handleIntroDone} />}
      <CursorTrail enabled={!reducedMotion} />
      <Navbar />
      <main>
        <Hero play={introDone} titleDrawn={titleDrawn} reducedMotion={reducedMotion} />
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
      {!reducedMotion && <EditorToolbar visible={introDone} onReplay={session.replay} />}
    </>
  );
}
