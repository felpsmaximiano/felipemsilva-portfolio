import { profile, projects } from '@/content';
import { useLanguage } from '@/i18n';
import { useCountUp } from '@/hooks/useCountUp';

/** Números calculados a partir do conteúdo, para nunca ficarem desatualizados. */
export function HeroStats({ play }: { play: boolean }) {
  const { t } = useLanguage();
  const liveProjects = projects.filter((p) => p.url).length;
  const years = new Date().getFullYear() - profile.careerStartYear;

  const projectCount = useCountUp(liveProjects, play);
  const yearCount = useCountUp(years, play);

  return (
    <div className="hero__stats" data-intro="estatisticas" data-intro-mode="fade">
      <div className="hero__stat">
        <b>
          <em>{projectCount}</em>
        </b>
        <span>{t.statProjects}</span>
      </div>
      <div className="hero__stat">
        <b>
          <em>{yearCount}</em> {t.statYearsUnit}
        </b>
        <span>{t.statYears}</span>
      </div>
      <div className="hero__stat">
        <b>
          API → <em>deploy</em>
        </b>
        <span>{t.statDeploy}</span>
      </div>
    </div>
  );
}
