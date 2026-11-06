import { profile } from '@/content';
import { useLanguage } from '@/i18n';
import { useTypewriterLoop } from '@/hooks/useTypewriterLoop';
import { TypedText } from '@/components/editor/TypedText';
import { HeroStats } from './HeroStats';
import { PhotoCard } from './PhotoCard';
import { PortfolioTitle } from './PortfolioTitle';
import { SkillInspector } from './SkillInspector';
import './Hero.css';

interface HeroProps {
  /** Verdadeiro quando a abertura termina: dispara as animações do topo. */
  play: boolean;
  /** Verdadeiro quando a caixa da abertura pousa sobre o título. */
  titleDrawn: boolean;
  reducedMotion: boolean;
}

export function Hero({ play, titleDrawn, reducedMotion }: HeroProps) {
  const { t, pick } = useLanguage();
  const role = useTypewriterLoop(pick(profile.roles), play, !reducedMotion);

  return (
    <header className="hero" id="topo">
      <div className="container">
        <PortfolioTitle play={titleDrawn} animate={!reducedMotion} />

        <div className="hero__grid">
          <div className="hero__main">
            <div className="hero__hello" data-edit="hello" data-intro="olá" data-intro-mode="fade">
              {t.hello}
            </div>
            <h1
              className="hero__name"
              data-edit="name"
              data-layer="h1.nome"
              data-offset="170,-46,-7,1"
              data-intro="h1.nome"
            >
              {profile.firstName}.
            </h1>
            <div className="hero__fullname mono" data-intro="nome.completo" data-intro-mode="fade">
              {profile.fullName} · {profile.location}
            </div>

            <div className="hero__role mono" data-intro="cargo" data-intro-mode="fade">
              <i />
              <span>{role}</span>
              <span className="hero__role-caret" />
            </div>

            <TypedText
              className="hero__lead"
              data-edit="lead"
              data-intro="p.apresentacao"
              typingId="lead"
              text={pick(profile.lead)}
            />

            <div className="hero__ctas" data-intro="cta.botoes">
              <a className="button button--primary" href="#projetos">
                {t.ctaProjects} →
              </a>
              <a className="button" href="#contato">
                {t.ctaContact}
              </a>
            </div>

            <HeroStats play={play} />
          </div>

          <PhotoCard reducedMotion={reducedMotion} />
          <SkillInspector play={play} />
        </div>
      </div>
    </header>
  );
}
