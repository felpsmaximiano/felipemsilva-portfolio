import { useEffect, useRef } from 'react';
import './PortfolioTitle.css';

interface PortfolioTitleProps {
  /** Quando verdadeiro, o contorno se desenha e o preenchimento passa da esquerda para a direita. */
  play: boolean;
  /** Com movimento reduzido, o título já aparece pronto. */
  animate: boolean;
}

/** "PORTFÓLIO" gigante só com contorno. O desenho é feito por CSS (estado declarativo). */
export function PortfolioTitle({ play, animate }: PortfolioTitleProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const state = !animate ? 'is-static' : play ? 'is-drawn' : 'is-waiting';

  // leve paralaxe com a rolagem
  useEffect(() => {
    const onScroll = () => {
      if (svgRef.current && window.scrollY < 900) {
        svgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`portfolio-title ${state}`}
      viewBox="0 0 1240 270"
      role="img"
      aria-label="Portfólio"
      data-intro="hero.titulo"
      data-intro-mode="draw"
    >
      <text
        className="portfolio-title__stroke"
        x="620"
        y="245"
        textAnchor="middle"
        textLength="1230"
        lengthAdjust="spacingAndGlyphs"
      >
        PORTFÓLIO
      </text>
      <text
        className="portfolio-title__fill"
        x="620"
        y="245"
        textAnchor="middle"
        textLength="1230"
        lengthAdjust="spacingAndGlyphs"
      >
        PORTFÓLIO
      </text>
    </svg>
  );
}
