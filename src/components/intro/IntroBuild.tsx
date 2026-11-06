import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLanguage } from '@/i18n';
import { SelectionBox } from '@/components/ui/SelectionBox';
import { collectTargets, isOnScreen, measure, reveal, type Placement } from './introTargets';
import './IntroBuild.css';

type Phase = 'waiting' | 'flying' | 'landed' | 'gone';

interface FlyingBox {
  id: number;
  label: string;
  from: { x: number; y: number };
  to: Placement;
  phase: Phase;
}

interface IntroBuildProps {
  /** A caixa do título pousou: hora de desenhar o "PORTFÓLIO". */
  onTitle: () => void;
  /** A abertura terminou: começa a sessão de edição. */
  onDone: () => void;
}

const FIRST_DELAY = 150;
const STAGGER = 140;
const FLIGHT = 720;
const HOLD = 650;
const FADE_STAGGER = 90;

function boxStyle(box: FlyingBox): CSSProperties {
  if (box.phase === 'waiting') {
    return { left: box.from.x, top: box.from.y, width: 40, height: 30, transform: 'rotate(0deg)' };
  }
  const { cx, cy, w, h, rotate } = box.to;
  return { left: cx - w / 2, top: cy - h / 2, width: w, height: h, transform: `rotate(${rotate}deg)` };
}

/**
 * Abertura: caixas de seleção voam até as posições REAIS dos elementos da página
 * e cada elemento é desenhado dentro da sua caixa. Não há cortina: a página
 * aparece peça por peça, no lugar onde vai ficar.
 */
export function IntroBuild({ onTitle, onDone }: IntroBuildProps) {
  const { t } = useLanguage();
  const [boxes, setBoxes] = useState<FlyingBox[]>([]);
  const [logLines, setLogLines] = useState(0);
  const [finished, setFinished] = useState(false);
  const timers = useRef<number[]>([]);
  const done = useRef(false);
  const callbacks = useRef({ onTitle, onDone });
  callbacks.current = { onTitle, onDone };

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const setPhase = (id: number, phase: Phase) =>
    setBoxes((list) => list.map((b) => (b.id === id ? { ...b, phase } : b)));

  /** Termina (ou pula) a abertura: tudo que faltou aparece na hora. */
  const finish = () => {
    if (done.current) return;
    done.current = true;
    timers.current.forEach(window.clearTimeout);
    collectTargets().forEach(({ el }) => {
      if (!el.dataset.introState) reveal(el, 'fade');
    });
    document.documentElement.classList.remove('is-intro');
    setLogLines(t.buildLog.length);
    setBoxes((list) => list.map((b) => ({ ...b, phase: 'gone' })));
    setFinished(true);
    callbacks.current.onTitle();
    callbacks.current.onDone();
  };

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      const targets = collectTargets();
      const flying = targets.filter((x) => x.mode !== 'fade' && isOnScreen(x.el));
      const fading = targets.filter((x) => !flying.includes(x));

      setBoxes(
        flying.map((x, i) => ({
          id: i,
          label: x.label,
          from: { x: Math.random() * window.innerWidth * 0.8, y: Math.random() * window.innerHeight * 0.8 },
          to: measure(x.el),
          phase: 'waiting',
        })),
      );

      flying.forEach((x, i) => {
        const takeoff = FIRST_DELAY + i * STAGGER;
        later(() => setPhase(i, 'flying'), takeoff);
        later(() => {
          setPhase(i, 'landed');
          reveal(x.el, x.mode === 'draw' ? 'show' : 'wipe');
          if (x.mode === 'draw') callbacks.current.onTitle();
        }, takeoff + FLIGHT);
        later(() => setPhase(i, 'gone'), takeoff + FLIGHT + HOLD);
      });

      const lastLanding = FIRST_DELAY + Math.max(0, flying.length - 1) * STAGGER + FLIGHT;
      fading.forEach((x, i) => later(() => reveal(x.el, 'fade'), lastLanding + 120 + i * FADE_STAGGER));
      t.buildLog.forEach((_, i) =>
        later(() => setLogLines(i + 1), 200 + (i * lastLanding) / t.buildLog.length),
      );
      later(finish, lastLanding + 120 + fading.length * FADE_STAGGER + HOLD);
    };

    // espera as fontes e o layout final para medir as posições certas
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(run)));

    return () => {
      cancelled = true;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- roda uma única vez na montagem
  }, []);

  return (
    <div className={`intro${finished ? ' is-done' : ''}`} aria-hidden="true">
      {boxes.map((box) => (
        <div key={box.id} className={`intro__box is-${box.phase}`} style={boxStyle(box)}>
          <SelectionBox label={box.label} className="intro__selection" />
        </div>
      ))}
      <div className="intro__log">
        {t.buildLog.slice(0, logLines).map((line, i) => (
          <div key={line} className={i === t.buildLog.length - 1 ? 'is-ok' : undefined}>
            {line}
          </div>
        ))}
      </div>
      <button type="button" className="intro__skip" onClick={finish}>
        {t.skip}
      </button>
    </div>
  );
}
