// Orientações gerais com base em diretrizes e posicionamentos científicos.
// Não é prescrição de dieta: no Brasil, isso é atividade privativa do nutricionista (Lei 8.234/1991).
export const orientacoes = [
  {
    titulo: 'Base do prato',
    texto: 'Faça de alimentos in natura ou minimamente processados a base da alimentação — arroz, feijão, legumes, verduras, frutas, ovos, carnes, leite — e evite ultraprocessados.',
    fonte: 'Guia Alimentar para a População Brasileira (Ministério da Saúde, 2014)',
  },
  {
    titulo: 'Proteína',
    texto: 'Para quem treina, 1,4 a 2,0 g de proteína por kg de peso por dia, divididas em refeições com cerca de 20 a 40 g a cada 3–4 horas. Acima de ~1,6 g/kg o ganho de massa muscular tende a estabilizar.',
    fonte: 'ISSN (Jäger et al., 2017) · Morton et al., 2018',
  },
  {
    titulo: 'Hidratação',
    texto: 'Beba água ao longo do dia e chegue hidratado ao treino. Evite perder mais de 2% do peso corporal em suor durante o exercício — pesar-se antes e depois ajuda a acertar a quantidade.',
    fonte: 'ACSM (Sawka et al., 2007)',
  },
  {
    titulo: 'Antes e depois do treino',
    texto: 'Uma refeição com carboidratos e proteína nas horas antes e depois do treino ajuda no desempenho e na recuperação. O total do dia conta mais do que o horário exato.',
    fonte: 'ISSN (Kerksick et al., 2017)',
  },
  {
    titulo: 'Emagrecer ou ganhar massa',
    texto: 'Perder gordura exige gastar mais energia do que se consome; ganhar massa pede um pequeno excedente. Em ambos os casos, treino de força e proteína suficiente ajudam a preservar ou ganhar músculo.',
    fonte: 'ISSN (Aragon et al., 2017)',
  },
  {
    titulo: 'Suplementos',
    texto: 'A creatina (3 a 5 g por dia) é o suplemento com mais evidência de segurança e de aumento de força. Antes de usar qualquer suplemento, converse com um nutricionista.',
    fonte: 'ISSN (Kreider et al., 2017)',
  },
];

export const fontesNutricao = [
  { texto: 'Ministério da Saúde. Guia Alimentar para a População Brasileira, 2ª ed., 2014.', url: 'https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf' },
  { texto: 'Jäger R et al. ISSN Position Stand: protein and exercise. J Int Soc Sports Nutr, 2017.', url: 'https://doi.org/10.1186/s12970-017-0177-8' },
  { texto: 'Morton RW et al. Protein supplementation and resistance training: a meta-analysis. Br J Sports Med, 2018.', url: 'https://doi.org/10.1136/bjsports-2017-097608' },
  { texto: 'Sawka MN et al. ACSM Position Stand: exercise and fluid replacement. Med Sci Sports Exerc, 2007.', url: 'https://doi.org/10.1249/mss.0b013e31802ca597' },
  { texto: 'Kerksick CM et al. ISSN Position Stand: nutrient timing. J Int Soc Sports Nutr, 2017.', url: 'https://doi.org/10.1186/s12970-017-0189-4' },
  { texto: 'Aragon AA et al. ISSN Position Stand: diets and body composition. J Int Soc Sports Nutr, 2017.', url: 'https://doi.org/10.1186/s12970-017-0174-y' },
  { texto: 'Kreider RB et al. ISSN Position Stand: creatine supplementation. J Int Soc Sports Nutr, 2017.', url: 'https://doi.org/10.1186/s12970-017-0173-z' },
];

// Faixa diária de proteína (g/kg/dia) usada na calculadora — ISSN 2017.
export const proteinaGkg = { min: 1.4, max: 2.0 };
