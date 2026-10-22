// Conteúdo real da academia. Cada secção só aparece no site quando a lista tiver itens.
// Fotos: coloque em public/images/equipe/ e indique o caminho (ex.: '/images/equipe/joao.webp').

// Depoimentos de alunos (com autorização). Ex.: { name: 'Maria S.', text: '…', since: 'Aluna desde 2024' }
export const testimonials: { name: string; text: string; since?: string }[] = [];

// Professores. Ex.: { name: 'João Silva', role: 'Musculação', cref: 'CREF 000000-G/BA', photo: '/images/equipe/joao.webp' }
export const team: { name: string; role: string; cref?: string; photo?: string }[] = [];

// Grade de aulas. Ex.: { modality: 'Jump', days: 'Seg · Qua · Sex', times: ['07h', '19h'] }
export const classSchedule: { modality: string; days: string; times: string[] }[] = [];
