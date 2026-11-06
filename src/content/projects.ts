import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'linkfolio',
    name: 'LinkFolio',
    wide: true,
    url: 'https://olinkfolio.com.br',
    domain: 'olinkfolio.com.br',
    tag: { pt: 'SaaS · currículo e portfólio', en: 'SaaS · resume and portfolio' },
    summary: {
      pt: 'Plataforma onde a pessoa preenche experiência, formação, habilidades e projetos, escolhe um modelo e publica currículo em PDF e portfólio online num único link.',
      en: 'A platform where people fill in experience, education, skills and projects, pick a template and publish a PDF resume and an online portfolio under a single link.',
    },
    highlights: {
      pt: [
        'Editor de experiências, formação, habilidades e projetos',
        'Seis modelos visuais com foco em legibilidade',
        'Planos por assinatura com endereço personalizado, controle de privacidade e SEO',
      ],
      en: [
        'Editor for experience, education, skills and projects',
        'Six visual templates focused on readability',
        'Subscription plans with custom URL, privacy control and SEO',
      ],
    },
  },
  {
    id: 'de-olho-na-cota',
    name: 'De Olho na Cota',
    url: 'https://deolhonacota.vercel.app',
    domain: 'deolhonacota.vercel.app',
    tag: { pt: 'Dados públicos', en: 'Public data' },
    summary: {
      pt: 'Gastos da cota parlamentar e presença de deputados e senadores, organizados para qualquer pessoa entender.',
      en: 'Brazilian congress members’ expense allowance and attendance, organized so anyone can understand it.',
    },
    highlights: {
      pt: ['Dados públicos por político e por estado', 'Mapa do Brasil clicável'],
      en: ['Public data by politician and by state', 'Clickable map of Brazil'],
    },
  },
  {
    id: 'freelancer-studio',
    name: 'Freelancer Studio',
    url: 'https://freelancerstudio.com.br',
    domain: 'freelancerstudio.com.br',
    tag: { pt: 'Site + painel', en: 'Website + admin' },
    summary: {
      pt: 'Site de desenvolvimento web com catálogo de sistemas prontos e vitrine de projetos personalizados.',
      en: 'Web development studio site with a catalog of ready-made systems and a showcase of custom projects.',
    },
    highlights: {
      pt: [
        'Projetos cadastrados por painel administrativo, com imagens',
        'Catálogo de sistemas por licença ou assinatura',
      ],
      en: ['Projects managed through an admin panel, with images', 'System catalog with license or subscription'],
    },
  },
  {
    id: 'nimbo',
    name: 'Nimbo',
    url: 'https://nimbo.agency',
    domain: 'nimbo.agency',
    tag: { pt: 'Site em 3 idiomas', en: 'Website in 3 languages' },
    summary: {
      pt: 'Site de uma agência de marketing digital em português, inglês e espanhol.',
      en: 'Website for a digital marketing agency in Portuguese, English and Spanish.',
    },
    highlights: {
      pt: [
        'Seletor de idioma em toda a página',
        'Mini formulário que abre o WhatsApp com a mensagem pronta',
        'Deploy automático a partir do GitHub',
      ],
      en: [
        'Language switcher across the whole page',
        'Mini form that opens WhatsApp with the message ready',
        'Automatic deploy from GitHub',
      ],
    },
  },
  {
    id: 'ghost-cat',
    name: 'Agência Ghost Cat',
    url: 'https://agenciaghostcat.com.br',
    domain: 'agenciaghostcat.com.br',
    tag: { pt: 'Site institucional', en: 'Company website' },
    summary: {
      pt: 'Site de agência com estética de papel e recortes, feito para ser lembrado.',
      en: 'Agency website with a paper-and-cutout look, made to be remembered.',
    },
    highlights: {
      pt: ['Checklist interativo de perfil', 'Formulário que monta a mensagem do cliente'],
      en: ['Interactive profile checklist', 'Form that builds the client’s message'],
    },
  },
  {
    id: 'ferramentas-internas',
    name: 'Proposta, contrato e calendário',
    wide: true,
    tag: { pt: 'Ferramentas internas', en: 'Internal tools' },
    summary: {
      pt: 'Ferramentas web usadas no dia a dia das agências: geram proposta, termo de aceite e contrato a partir dos dados do cliente e organizam o calendário mensal de conteúdo com aprovação.',
      en: 'Web tools used daily by the agencies: they generate proposal, acceptance terms and contract from client data and organize the monthly content calendar with approval.',
    },
    highlights: {
      pt: ['Dados editáveis, salvos em arquivo e reabertos depois', 'Saída pronta para PDF'],
      en: ['Editable data, saved to a file and reopened later', 'PDF-ready output'],
    },
  },
];
