import { Icon } from '../components/Icon';
import '../styles/plans-temporary.css';
import { plans, otherPlans, installment, temporaryPricingEnabled, temporaryPlans, temporaryMonthlyPlan, temporaryPlanBenefits, savingsVsMonthly, savingsPercent } from '../data/plans';
import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';
function OriginalPlans() {
  return <section id="planos" className="plans section" tabIndex={-1} aria-labelledby="plans-title">
    <picture className="plans-background" aria-hidden="true">
      <source media="(max-width: 700px)" srcSet="/images/planos/academia-3836.webp" />
      <img src="/images/planos/academia-1920.webp" srcSet="/images/planos/academia-1920.webp 1920w, /images/planos/academia-2560.webp 2560w, /images/planos/academia-3836.webp 3836w" sizes="100vw" width="3836" height="2874" alt="" loading="lazy" decoding="async" />
    </picture>
    <div className="wrap"><div className="plans-heading" data-reveal><div><p className="eyebrow">05 / Seu próximo passo</p><h2 id="plans-title"><em>PLANOS</em> QUE SE ADAPTAM <br />À SUA ROTINA.</h2></div><p>Escolha o tempo do seu compromisso. <br />O primeiro passo é seu.</p></div>
      <div className="plans-grid">{plans.map((plan, i) => <article className="plan-card" key={plan.name} data-reveal><div className="plan-top"><h3>PLANO {plan.name.toUpperCase()}</h3><span>0{i + 1}</span></div><p className="plan-price"><span>R$</span> {plan.price}<small>,00</small></p><p className="plan-period">/ {plan.months} meses</p><div className="plan-equivalence"><span>Equivalente a</span><strong>R$ {plan.equivalent},00<small>/mês</small></strong></div><Button href={whatsappUrl(`o plano ${plan.name.toLowerCase()}`)} variant="dark">Consultar plano</Button></article>)}</div>
      <p className="plans-benefits-note" data-reveal>Também aceitamos TotalPass e Wellhub (Gympass). Consulte a elegibilidade do seu plano. <a className="text-link" href="#beneficios">Saiba mais <span aria-hidden="true">↗</span></a></p>
      <p className="installment" data-reveal><span aria-hidden="true">↗</span> {installment}</p>
      <div className="other-plans" data-reveal><div><h3>OUTRAS OPÇÕES SOB CONSULTA</h3><p>{otherPlans.join(' · ')}</p></div><a className="text-link" href={whatsappUrl('diária, semanal, quinzenal, pacote ou aula avulsa')} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}

// Layout temporário isolado; desativar temporaryPricingEnabled restaura a seção original.
export function Plans() {
  if (!temporaryPricingEnabled) return <OriginalPlans />;
  return <section id="planos" className="plans plans--temporary section" tabIndex={-1} aria-labelledby="plans-title">
    <div className="wrap">
      <div className="plans-heading" data-reveal>
        <div><p className="eyebrow">04 / Planos</p><h2 id="plans-title">ESCOLHA O PLANO <br /><em>IDEAL PARA VOCÊ.</em></h2></div>
        <p>Seu próximo passo começa aqui. <br />Invista no seu treino.</p>
      </div>
      <div className="plans-grid">{temporaryPlans.map(plan => <article className={`plan-card${plan.highlight ? ' plan-card--highlight' : ''}`} key={plan.name} data-reveal>
        <div className="temporary-plan-top"><span className="temporary-plan-badge">{plan.highlight ?? 'PLANO'}</span><span className="plan-savings">−{savingsPercent(plan)}%</span></div>
        <h3>{plan.name}</h3>
        <p className="plan-price"><span>R$</span> {plan.price}<small>,00</small></p>
        <p className="temporary-installments">{plan.installments}</p>
        <p className="plan-savings-note">R$ {savingsVsMonthly(plan)} a menos que {plan.months} meses no plano mensal.</p>
        <Button href={whatsappUrl(`o plano ${plan.name.toLowerCase()}`)}>Consultar plano</Button>
      </article>)}</div>
      <article className="temporary-monthly" data-reveal aria-labelledby="monthly-title">
        <div><p className="temporary-monthly-label">SEU TREINO, MÊS A MÊS</p><h3 id="monthly-title">PLANO {temporaryMonthlyPlan.name.toUpperCase()}</h3></div>
        <p className="plan-price"><span>R$</span> {temporaryMonthlyPlan.price}<small>,00</small></p>
        <Button href={whatsappUrl('o plano mensal')} variant="dark">Consultar plano mensal</Button>
      </article>
      <ul className="temporary-plan-benefits" aria-label="Benefícios dos planos" data-reveal>
        {temporaryPlanBenefits.map((benefit, i) => <li key={benefit}><Icon name={i === 3 ? 'arrow' : 'plus'} /><span>{benefit}</span></li>)}
      </ul>
      <p className="plans-benefits-note" data-reveal>Também aceitamos TotalPass e Wellhub (Gympass). Consulte a elegibilidade do seu plano. <a className="text-link" href="#beneficios">Saiba mais <span aria-hidden="true">↗</span></a></p>
      <p className="temporary-plan-closing" data-reveal>INVISTA EM VOCÊ. <br /><em>TRANSFORME SEUS RESULTADOS!</em></p>
    </div>
  </section>;
}
