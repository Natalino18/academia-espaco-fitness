// Temporário: catálogo oficial da Bahia. Substituir apenas esta constante
// quando a URL individual da Espaço Fitness de Paulo Afonso for confirmada.
export const TOTALPASS_URL = 'https://totalpass.com/br/academias/ba/';
export const WELLHUB_URL = 'https://wellhub.com/pt-br/search/partners/espaco-fitness-tancredo-neves-ii-paulo-afonso/';

export const benefits = [
  {
    name: 'TotalPass',
    logo: '/images/benefits/totalpass.svg',
    width: 785,
    height: 87,
    description: 'Treina pelo TotalPass? Consulte a elegibilidade do seu plano e confira o acesso à Espaço Fitness.',
    url: TOTALPASS_URL,
    label: 'Ver no TotalPass — catálogo oficial da Bahia (nova aba)',
    cta: 'Ver no TotalPass',
  },
  {
    name: 'Wellhub',
    previousName: 'antigo Gympass',
    logo: '/images/benefits/wellhub.svg',
    width: 1095,
    height: 214,
    description: 'Usa Wellhub? Consulte sua elegibilidade e veja as informações da Espaço Fitness diretamente na plataforma.',
    url: WELLHUB_URL,
    label: 'Ver no Wellhub — Espaço Fitness de Paulo Afonso (nova aba)',
    cta: 'Ver no Wellhub',
  },
];
