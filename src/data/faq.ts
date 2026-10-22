import { store } from './store';
import { schedule } from './schedule';
import { modalities } from './modalities';
import { temporaryPlans, temporaryMonthlyPlan } from './plans';

// Só respostas confirmadas. Perguntas sem resposta certa (aula experimental, estacionamento,
// balneário…) devem ser acrescentadas aqui quando o proprietário confirmar.
export const faq = [
  {
    question: 'Quais são os horários de funcionamento?',
    answer: schedule.map(day => `${day.day}: ${day.open} às ${day.close}`).join(' · ') + '.',
  },
  {
    question: 'Quais modalidades vocês oferecem?',
    answer: `${modalities.map(m => m.name).join(', ')}. Consulte os dias e horários de cada aula pelo WhatsApp.`,
  },
  {
    question: 'Quanto custa treinar na Espaço Fitness?',
    answer: `Plano mensal por R$ ${temporaryMonthlyPlan.price},00. ${temporaryPlans.map(p => `${p.name}: R$ ${p.price},00 (${p.installments})`).join(' · ')}.`,
  },
  {
    question: 'Vocês aceitam TotalPass e Wellhub (Gympass)?',
    answer: 'Sim. Consulte a elegibilidade do seu plano no aplicativo do TotalPass ou do Wellhub.',
  },
  {
    question: 'Como faço minha matrícula?',
    answer: `Fale com a gente pelo WhatsApp ${store.phone} ou venha até a academia: ${store.street}, ${store.neighborhood} · ${store.city}.`,
  },
];
