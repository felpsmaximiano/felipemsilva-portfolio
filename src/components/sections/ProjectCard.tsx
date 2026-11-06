import type { PointerEvent } from 'react';
import type { Project } from '@/content';
import { useLanguage } from '@/i18n';
import { useReveal } from '@/hooks/useReveal';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Começa fora do lugar para o cursor do editor ajustar quando a seção aparece. */
  misplaced?: boolean;
}

/** Atualiza a posição do brilho que acompanha o mouse dentro do card. */
function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

export function ProjectCard({ project, index, misplaced = false }: ProjectCardProps) {
  const { t, pick } = useLanguage();
  const ref = useReveal<HTMLElement>();
  const editAttrs = misplaced
    ? { 'data-edit-section': 'card', 'data-layer': `card.${project.id}`, 'data-offset': '-60,46,-4,1' }
    : {};

  return (
    <article
      ref={ref}
      className={`project-card${project.wide ? ' project-card--wide' : ''}`}
      onPointerMove={trackSpotlight}
      {...editAttrs}
    >
      <span className="project-card__number" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="project-card__tag">{pick(project.tag)}</span>
      <h3>{project.name}</h3>
      <p>{pick(project.summary)}</p>
      <ul>
        {pick(project.highlights).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <footer className="project-card__footer">
        {project.url ? (
          <>
            <span>{project.domain}</span>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {t.viewLive} ↗
            </a>
          </>
        ) : (
          <span>{t.internalUse}</span>
        )}
      </footer>
    </article>
  );
}
