import { plans, otherPlans, installment } from '../data/plans';
import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';
export function Plans() {
  return <section id="planos" className="plans section" tabIndex={-1} aria-labelledby="plans-title">
    <picture className="plans-background" aria-hidden="true">
      <source media="(max-width: 700px)" srcSet="/images/planos/academia-3836.webp" />
      <img src="/images/planos/academia-1920.webp" srcSet="/images/planos/academia-1920.webp 1920w, /images/planos/academia-2560.webp 2560w, /images/planos/academia-3836.webp 3836w" sizes="100vw" width="3836" height="2874" alt="" loading="lazy" decoding="async" />
    </picture>
    <div className="wrap"><div className="plans-heading" data-reveal><div><p className="eyebrow">05 / Seu próximo passo</p><h2 id="plans-title"><em>PLANOS</em> QUE SE ADAPTAM<br />À SUA ROTINA.</h2></div><p>Escolha o tempo do seu compromisso.<br />O primeiro passo é seu.</p></div>
      <div className="plans-grid">{plans.map((plan, i) => <article className="plan-card" key={plan.name} data-reveal><div className="plan-top"><h3>PLANO {plan.name.toUpperCase()}</h3><span>0{i + 1}</span></div><p className="plan-price"><span>R$</span> {plan.price}<small>,00</small></p><p className="plan-period">/ {plan.months} meses</p><div className="plan-equivalence"><span>Equivalente a</span><strong>R$ {plan.equivalent},00<small>/mês</small></strong></div><Button href={whatsappUrl(`o plano ${plan.name.toLowerCase()}`)} variant="dark">Consultar plano</Button></article>)}</div>
      <p className="installment" data-reveal><span aria-hidden="true">↗</span> {installment}</p>
      <div className="other-plans" data-reveal><div><h3>OUTRAS OPÇÕES SOB CONSULTA</h3><p>{otherPlans.join(' · ')}</p></div><a className="text-link" href={whatsappUrl('diária, semanal, quinzenal, pacote ou aula avulsa')} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
