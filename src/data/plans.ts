export const plans = [
  { name: 'Trimestral', price: 285, months: 3, equivalent: 95 },
  { name: 'Semestral', price: 540, months: 6, equivalent: 90 },
  { name: 'Anual', price: 960, months: 12, equivalent: 80 },
];
export const otherPlans = ['Diária', 'Semanal', 'Quinzenal', 'Pacote', 'Aula avulsa'];
export const installment = 'Parcelamento em até 12x sem juros.';

// Versão temporária aprovada pelo proprietário. false restaura os planos originais acima.
export const temporaryPricingEnabled = true;
export const temporaryPlans = [
  { name: 'Trimestral', price: '370', total: 370, months: 3, installments: '3x de R$ 123,33' },
  { name: 'Semestral', price: '720', total: 720, months: 6, installments: '6x de R$ 120,00' },
  { name: 'Anual', price: '1.320', total: 1320, months: 12, installments: '12x de R$ 110,00', highlight: 'MELHOR PREÇO' },
];
export const temporaryMonthlyPlan = { name: 'Mensal', price: '130', total: 130 };
// Quanto cada plano poupa face a pagar o mensal durante o mesmo número de meses.
export function savingsVsMonthly(plan: { total: number; months: number }) {
  return temporaryMonthlyPlan.total * plan.months - plan.total;
}
export function savingsPercent(plan: { total: number; months: number }) {
  return Math.round(savingsVsMonthly(plan) / (temporaryMonthlyPlan.total * plan.months) * 100);
}
export const temporaryPlanBenefits = [
  'Estrutura completa', 'Profissionais qualificados', 'Saúde e bem-estar', 'Resultados de verdade',
];
