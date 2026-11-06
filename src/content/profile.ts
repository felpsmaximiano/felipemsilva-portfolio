import type { Localized, RichText } from './types';

export const profile = {
  firstName: 'Felipe',
  fullName: 'Flavio Felipe Maximiano da Silva',
  location: 'Manaus, AM',
  email: 'flaviofelipemaximiano@gmail.com',
  photo: './images/felipe.webp',
  links: {
    linkedin: 'https://www.linkedin.com/in/felps-maximiano/',
    github: 'https://github.com/felpsmaximiano',
  },
  roles: {
    pt: ['Desenvolvedor Full Stack', 'Analista de Sistemas', 'React · TypeScript · Node.js'],
    en: ['Full Stack Developer', 'Systems Analyst', 'React · TypeScript · Node.js'],
  } satisfies Localized<readonly string[]>,
  lead: {
    pt: [
      'Desenvolvo ',
      { b: 'plataformas SaaS, sistemas web, painéis administrativos e sites' },
      ', da API ao deploy em produção. Antes do código vieram quatro anos em ',
      { b: 'suporte de TI, ERP e análise de operações' },
      ', e essa bagagem me faz pensar no processo de quem vai usar o sistema todos os dias.',
    ],
    en: [
      'I build ',
      { b: 'SaaS platforms, web systems, admin dashboards and websites' },
      ', from the API to production deploy. Before code came four years in ',
      { b: 'IT support, ERP and operations analysis' },
      ', and that background makes me think about the people who will use the system every day.',
    ],
  } satisfies Localized<RichText>,
  /** Ano em que comecei a trabalhar com tecnologia (suporte técnico, 07/2022). */
  careerStartYear: 2022,
} as const;

export const coreSkills = [
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    body: {
      pt: 'React, Next.js, TypeScript, JavaScript, HTML e CSS.',
      en: 'React, Next.js, TypeScript, JavaScript, HTML and CSS.',
    },
    level: 90,
  },
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    body: {
      pt: 'Node.js e APIs RESTful, com passagens por PHP, C# e Java.',
      en: 'Node.js and RESTful APIs, with experience in PHP, C# and Java.',
    },
    level: 78,
  },
  {
    title: { pt: 'Dados & BI', en: 'Data & BI' },
    body: {
      pt: 'SQL, modelagem de dados, Power BI e Excel avançado.',
      en: 'SQL, data modeling, Power BI and advanced Excel.',
    },
    level: 82,
  },
] as const satisfies ReadonlyArray<{ title: Localized<string>; body: Localized<string>; level: number }>;
