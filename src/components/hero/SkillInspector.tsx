import { coreSkills } from '@/content';
import { useLanguage } from '@/i18n';
import './SkillInspector.css';

/** O 2º card começa fora do lugar; o cursor do "editor" o devolve para a coluna. */
const editAttributes = (index: number) => {
  if (index === 0) return { 'data-edit': 'skill-card-first' };
  if (index === 1) {
    return { 'data-edit': 'skill-card', 'data-layer': 'card.backend', 'data-offset': '90,12,5,1' };
  }
  return {};
};

const introLabels = ['card.frontend', 'card.backend', 'card.dados'];

/** Coluna à direita do topo, no formato do painel "inspetor" de um editor. */
export function SkillInspector({ play }: { play: boolean }) {
  const { pick } = useLanguage();

  return (
    <aside className="skill-inspector">
      {coreSkills.map((skill, i) => (
        <div
          key={skill.title.pt}
          className="skill-inspector__card"
          data-intro={introLabels[i]}
          {...editAttributes(i)}
        >
          <h4>
            {pick(skill.title)} <small>{String(i + 1).padStart(2, '0')}</small>
          </h4>
          <p>{pick(skill.body)}</p>
          <div className="skill-inspector__bar">
            <i style={{ width: play ? `${skill.level}%` : 0, transitionDelay: `${300 + i * 180}ms` }} />
          </div>
        </div>
      ))}
    </aside>
  );
}
