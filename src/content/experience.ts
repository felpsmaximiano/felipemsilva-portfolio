import type { Localized, TimelineItem } from './types';

/** Linha do tempo, do mais recente para o mais antigo. */
export const timeline: TimelineItem[] = [
  {
    current: true,
    period: { pt: '05/2026 · atual', en: '05/2026 · present' },
    role: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    place: 'Projetos próprios e freelance',
    description: {
      pt: 'Sites, landing pages, sistemas web e painéis administrativos para empresas, além dos meus próprios produtos.',
      en: 'Websites, landing pages, web systems and admin dashboards for businesses, plus my own products.',
    },
  },
  {
    period: { pt: '08/2024 · 05/2026', en: '08/2024 · 05/2026' },
    role: { pt: 'Analista de Manutenção Jr', en: 'Junior Maintenance Analyst' },
    place: 'Armac Locação de Máquinas · Manaus',
    description: {
      pt: 'Gestão de ordens de serviço e disponibilidade de frota; relatórios e dashboards em Power BI e Excel para a gestão.',
      en: 'Work order and fleet availability management; Power BI and Excel reports and dashboards for management.',
    },
  },
  {
    period: { pt: '01/2023 · 12/2025', en: '01/2023 · 12/2025' },
    role: { pt: 'Tecnólogo em ADS', en: 'Associate degree, Systems Analysis and Development' },
    place: 'Universidade Estácio de Sá',
    description: {
      pt: 'Análise e Desenvolvimento de Sistemas.',
      en: 'Systems Analysis and Development.',
    },
    image: {
      src: './images/formatura.webp',
      alt: { pt: 'Felipe na formatura', en: 'Felipe at graduation' },
    },
  },
  {
    period: { pt: '07/2022 · 08/2024', en: '07/2022 · 08/2024' },
    role: { pt: 'Suporte Técnico', en: 'IT Support' },
    place: 'J. F. Mercearia · Manaus',
    description: {
      pt: 'Servidor local e ERP interno, rotinas de backup e integridade do banco, manutenção de infraestrutura e redes.',
      en: 'Local server and internal ERP, backup routines and database integrity, infrastructure and network maintenance.',
    },
  },
];

export const principles: { key: Localized<string>; text: Localized<string> }[] = [
  {
    key: { pt: 'processo', en: 'process' },
    text: {
      pt: 'Entender a rotina de quem vai usar antes de abrir o editor.',
      en: 'Understand the routine of the people who will use it before opening the editor.',
    },
  },
  {
    key: { pt: 'entrega', en: 'delivery' },
    text: {
      pt: 'Projeto bom é projeto publicado, com link para abrir e testar.',
      en: 'A good project is a published project, with a link to open and test.',
    },
  },
  {
    key: { pt: 'clareza', en: 'clarity' },
    text: {
      pt: 'Telas que se explicam sozinhas, sem precisar de manual.',
      en: 'Screens that explain themselves, no manual needed.',
    },
  },
];
