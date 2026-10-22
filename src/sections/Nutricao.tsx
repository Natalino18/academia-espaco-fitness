import { useState } from 'react';
import { orientacoes, fontesNutricao, proteinaGkg } from '../data/nutricao';
import { Fontes } from './Treinos';

export function Nutricao() {
  const [peso, setPeso] = useState('70');
  const kg = parseFloat(peso.replace(',', '.'));
  const valido = kg >= 30 && kg <= 250;
  return <section id="alimentacao" className="nutricao section" tabIndex={-1} aria-labelledby="nutricao-title">
    <div className="wrap">
      <div className="nutricao-heading" data-reveal>
        <p className="eyebrow">08 / Alimentação e treino</p>
        <h2 id="nutricao-title">O QUE A CIÊNCIA <br /><em>RECOMENDA.</em></h2>
        <p>Orientações gerais baseadas em diretrizes oficiais e posicionamentos científicos. Para um plano alimentar individual, procure um nutricionista.</p>
      </div>

      <div className="nutricao-grid">{orientacoes.map((o, i) => <article key={o.titulo} data-reveal>
        <span className="nutricao-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <h3>{o.titulo}</h3><p>{o.texto}</p><small>{o.fonte}</small>
      </article>)}</div>

      <div className="proteina-calc" data-reveal>
        <div><h3>Quanta proteína por dia?</h3><p>Estimativa para quem treina força, segundo a ISSN ({String(proteinaGkg.min).replace('.', ',')} a {String(proteinaGkg.max).replace('.', ',')} g/kg/dia).</p></div>
        <label>Seu peso (kg)<input type="number" inputMode="decimal" min={30} max={250} step={0.5} value={peso} onChange={e => setPeso(e.target.value)} /></label>
        <output aria-live="polite">{valido ? <><strong>{Math.round(kg * proteinaGkg.min)} a {Math.round(kg * proteinaGkg.max)} g</strong><span>por dia, em 3 a 5 refeições</span></> : <span>Digite um peso entre 30 e 250 kg.</span>}</output>
      </div>

      <p className="nutricao-aviso" data-reveal>Este conteúdo é educativo e não é uma dieta. A prescrição de dietas é atividade do nutricionista (Lei 8.234/1991). Gestantes, pessoas com doença renal, diabetes ou outras condições devem ter acompanhamento profissional.</p>
      <Fontes titulo="Fontes da alimentação" fontes={fontesNutricao} />
    </div>
  </section>;
}
