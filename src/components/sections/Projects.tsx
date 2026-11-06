import { projects } from '@/content';
import { useLanguage } from '@/i18n';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

export function Projects() {
  const { t } = useLanguage();

  return (
    <section className="section" id="projetos">
      <div className="container">
        <SectionHeading
          index="//02"
          code="sec_projetos"
          title={t.projectsTitle}
          outline={t.projectsTitleOutline}
          subtitle={t.projectsSubtitle}
          layer="h2.projetos"
        />
        <div className="projects">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} misplaced={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
