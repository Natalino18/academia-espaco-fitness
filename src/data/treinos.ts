// Rotinas de exemplo baseadas nas recomendações do ACSM (2009) e da OMS (2020).
// Conteúdo educativo: cargas e exercícios devem ser ajustados por um professor da academia.
export type Exercicio = { nome: string; series: string };
export type Dia = { titulo: string; exercicios: Exercicio[] };
export type Rotina = { id: string; nivel: string; frequencia: string; resumo: string; descanso: string; progressao: string; dias: Dia[] };

export const rotinas: Rotina[] = [
  {
    id: 'iniciante',
    nivel: 'Iniciante',
    frequencia: '2 a 3x por semana · corpo inteiro',
    resumo: 'Para quem está começando ou voltando a treinar. Treine em dias alternados (ex.: segunda, quarta e sexta).',
    descanso: '60 a 90 s entre séries',
    progressao: 'Quando conseguir fazer todas as repetições com boa técnica, aumente a carga em 2 a 10%.',
    dias: [{
      titulo: 'Treino único (repetir em cada sessão)',
      exercicios: [
        { nome: 'Leg press', series: '2–3 × 10–12' },
        { nome: 'Supino com halteres ou na máquina', series: '2–3 × 10–12' },
        { nome: 'Puxada frontal', series: '2–3 × 10–12' },
        { nome: 'Remada sentada', series: '2–3 × 10–12' },
        { nome: 'Desenvolvimento com halteres', series: '2 × 10–12' },
        { nome: 'Prancha', series: '2–3 × 20–30 s' },
      ],
    }],
  },
  {
    id: 'intermediario',
    nivel: 'Intermediário',
    frequencia: '4x por semana · superior / inferior',
    resumo: 'Para quem já treina há alguns meses com regularidade. Cada grupo muscular é treinado 2 vezes por semana.',
    descanso: '1 a 2 min (2 a 3 min nos exercícios mais pesados)',
    progressao: 'Varie as repetições entre 6 e 12 ao longo das semanas e aumente a carga aos poucos.',
    dias: [
      {
        titulo: 'A · Superiores (seg e qui)',
        exercicios: [
          { nome: 'Supino reto', series: '3 × 8–12' },
          { nome: 'Remada curvada ou na máquina', series: '3 × 8–12' },
          { nome: 'Desenvolvimento', series: '3 × 8–12' },
          { nome: 'Puxada frontal', series: '3 × 8–12' },
          { nome: 'Rosca direta', series: '2–3 × 10–12' },
          { nome: 'Tríceps na polia', series: '2–3 × 10–12' },
        ],
      },
      {
        titulo: 'B · Inferiores (ter e sex)',
        exercicios: [
          { nome: 'Agachamento livre ou no Smith', series: '3 × 8–10' },
          { nome: 'Leg press', series: '3 × 10–12' },
          { nome: 'Stiff com halteres', series: '3 × 8–12' },
          { nome: 'Cadeira extensora', series: '2–3 × 10–15' },
          { nome: 'Mesa flexora', series: '2–3 × 10–15' },
          { nome: 'Panturrilha em pé', series: '3 × 12–15' },
        ],
      },
    ],
  },
  {
    id: 'avancado',
    nivel: 'Avançado',
    frequencia: '4 a 6x por semana · empurrar / puxar / pernas',
    resumo: 'Para quem treina há mais de um ano. Faça a sequência A-B-C e repita; cerca de 10 séries semanais ou mais por grupo muscular.',
    descanso: '2 a 3 min nos multiarticulares · 1 a 2 min nos demais',
    progressao: 'Organize o treino em ciclos (ex.: 4 semanas mais pesadas, 1 semana mais leve) com acompanhamento do professor.',
    dias: [
      {
        titulo: 'A · Empurrar (peito, ombros, tríceps)',
        exercicios: [
          { nome: 'Supino reto', series: '4 × 6–8' },
          { nome: 'Supino inclinado com halteres', series: '3 × 8–12' },
          { nome: 'Desenvolvimento militar', series: '3 × 6–10' },
          { nome: 'Elevação lateral', series: '3 × 12–15' },
          { nome: 'Tríceps francês', series: '3 × 10–12' },
        ],
      },
      {
        titulo: 'B · Puxar (costas, bíceps)',
        exercicios: [
          { nome: 'Barra fixa ou puxada', series: '4 × 6–10' },
          { nome: 'Remada curvada', series: '4 × 6–10' },
          { nome: 'Remada unilateral', series: '3 × 10–12' },
          { nome: 'Face pull', series: '3 × 12–15' },
          { nome: 'Rosca alternada', series: '3 × 10–12' },
        ],
      },
      {
        titulo: 'C · Pernas',
        exercicios: [
          { nome: 'Agachamento livre', series: '4 × 6–8' },
          { nome: 'Levantamento terra romeno', series: '3 × 6–10' },
          { nome: 'Afundo / passada', series: '3 × 10–12 cada perna' },
          { nome: 'Mesa flexora', series: '3 × 10–12' },
          { nome: 'Panturrilha sentado', series: '4 × 12–15' },
        ],
      },
    ],
  },
];

export const recomendacaoOms = {
  aerobico: '150 a 300 min por semana de atividade moderada (ou 75 a 150 min de vigorosa)',
  forca: 'Fortalecimento muscular em 2 ou mais dias por semana',
};

export const fontesTreino = [
  { texto: 'ACSM. Progression models in resistance training for healthy adults. Med Sci Sports Exerc, 2009.', url: 'https://doi.org/10.1249/MSS.0b013e3181915670' },
  { texto: 'Bull FC et al. Diretrizes da OMS para atividade física e comportamento sedentário. Br J Sports Med, 2020.', url: 'https://doi.org/10.1136/bjsports-2020-102955' },
  { texto: 'Schoenfeld BJ et al. Dose-response relationship between weekly resistance training volume and muscle mass. J Sports Sci, 2017.', url: 'https://doi.org/10.1080/02640414.2016.1210197' },
  { texto: 'Schoenfeld BJ et al. Effects of resistance training frequency on muscular hypertrophy. Sports Med, 2016.', url: 'https://doi.org/10.1007/s40279-016-0543-8' },
];
