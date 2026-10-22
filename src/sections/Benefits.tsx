import { Photo } from '../components/Photo';
import { Button } from '../components/Button';
import { benefits } from '../data/benefits';

export function Benefits() {
  return <section id="beneficios" className="benefits section" tabIndex={-1} aria-labelledby="benefits-title">
    <div className="benefits-backdrop" aria-hidden="true"><Photo id={4} decorative sizes="(max-width: 700px) 100vw, 65vw" /></div>
    <div className="wrap benefits-content">
      <div className="benefits-heading">
        <p className="eyebrow" data-reveal>05 / Benefícios e convênios</p>
        <h2 id="benefits-title" data-reveal>Seu benefício também <br /><em>treina com você</em></h2>
        <p className="benefits-description" data-reveal>A Espaço Fitness também recebe alunos através de benefícios corporativos parceiros. Consulte a elegibilidade do seu plano e venha treinar com a gente.</p>
      </div>
      <div className="benefits-grid">
        {benefits.map(benefit => <article className="benefit-reveal" key={benefit.name} data-reveal>
          <div className="benefit-card">
            <div className="benefit-logo"><img src={benefit.logo} width={benefit.width} height={benefit.height} alt={`Logo ${benefit.name}`} loading="lazy" decoding="async" /></div>
            <div className="benefit-name"><h3>{benefit.name}</h3>{benefit.previousName && <span>{benefit.previousName}</span>}</div>
            <p>{benefit.description}</p>
            <Button href={benefit.url} aria-label={benefit.label}>{benefit.cta}</Button>
          </div>
        </article>)}
      </div>
      <ul className="benefits-strip" aria-label="Vantagens dos benefícios corporativos" data-reveal>
        <li><BenefitIcon type="training" /><span>MAIS OPÇÕES <br />PARA VOCÊ TREINAR</span></li>
        <li><BenefitIcon type="people" /><span>BENEFÍCIOS <br />CORPORATIVOS</span></li>
        <li><BenefitIcon type="app" /><span>PRATICIDADE <br />PELO APLICATIVO</span></li>
        <li><BenefitIcon type="quality" /><span>QUALIDADE <br />ESPAÇO FITNESS</span></li>
      </ul>
      <p className="benefits-location" data-reveal>Benefícios corporativos na Academia Espaço Fitness, em Paulo Afonso.</p>
    </div>
  </section>;
}

// Small decorative icons, local to this section; labels remain real text.
function BenefitIcon({ type }: { type: 'training' | 'people' | 'app' | 'quality' }) {
  const paths = {
    training: <><path d="M7 12h10M3 9v6m4-9v12M17 6v12m4-9v6M3 12h4m10 0h4" /></>,
    people: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6m1 5a5 5 0 0 1 3 5" /></>,
    app: <><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M10 5h4m-5 7 2 2 4-4m-4 9h2" /></>,
    quality: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" /><path d="m8 12 3 3 5-6" /></>,
  };
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}
