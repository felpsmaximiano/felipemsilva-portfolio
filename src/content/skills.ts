import type { SkillGroup, SpokenLanguage } from './types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'front',
    title: { pt: 'Front-end', en: 'Front-end' },
    kicker: { pt: 'interface', en: 'interface' },
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'jQuery', 'Figma'],
  },
  {
    id: 'back',
    title: { pt: 'Back-end', en: 'Back-end' },
    kicker: { pt: 'regras e APIs', en: 'rules and APIs' },
    items: ['Node.js', 'APIs RESTful', 'PHP', 'C#', 'Java', 'AWS API Gateway'],
  },
  {
    id: 'data',
    title: { pt: 'Dados & BI', en: 'Data & BI' },
    kicker: { pt: 'banco e relatórios', en: 'database and reports' },
    items: [
      'SQL',
      'PostgreSQL',
      'SQL Server',
      'Oracle',
      { pt: 'Modelagem de dados', en: 'Data modeling' },
      'Power BI',
      { pt: 'Excel avançado', en: 'Advanced Excel' },
      'Access',
    ],
  },
  {
    id: 'ops',
    title: { pt: 'Infra & operação', en: 'Infra & ops' },
    kicker: { pt: 'entrega e suporte', en: 'delivery and support' },
    items: [
      'Git & GitHub',
      'CI/CD',
      { pt: 'Servidores web', en: 'Web servers' },
      { pt: 'Servidores proxy', en: 'Proxy servers' },
      { pt: 'Redes', en: 'Networks' },
      'Windows',
      'FreeBSD',
      'ERP',
      'SAP',
    ],
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'nativo', en: 'native' }, score: 5 },
  { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'intermediário', en: 'intermediate' }, score: 3 },
  { name: { pt: 'Espanhol', en: 'Spanish' }, level: { pt: 'básico', en: 'basic' }, score: 2 },
];
