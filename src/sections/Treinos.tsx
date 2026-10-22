import { useState } from 'react';
import { rotinas, recomendacaoOms, fontesTreino } from '../data/treinos';
import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';

export function Treinos() {
  const [ativa, setAtiva] = useState(rotinas[0].id);
  const rotina = rotinas.find(r => r.id === ativa) ?? rotinas[0];
  return <section id="treinos" className="treinos section" tabIndex={-1} aria-labelledby="treinos-title">
    <div className="wrap">
      <div className="treinos-heading" data-reveal>
        <div><p className="eyebrow">07 / Rotinas de treino</p><h2 id="treinos-title">COMECE COM <br /><em>UM PLANO.</em></h2></div>
        <ul className="oms-box" aria-label="Recomendação da Organização Mundial da Saúde">
          <li><strong>OMS recomenda</strong></li>
          <li>{recomendacaoOms.aerobico}</li>
          <li>{recomendacaoOms.forca}</li>
        </ul>
      </div>

      <div className="treinos-tabs" role="tablist" aria-label="Nível de treino" data-reveal>
        {rotinas.map(r => <button key={r.id} type="button" role="tab" id={`tab-${r.id}`} aria-selected={r.id === ativa} aria-controls={`painel-${r.id}`} className={r.id === ativa ? 'is-active' : ''} onClick={() => setAtiva(r.id)}>{r.nivel}</button>)}
      </div>

      <div className="treinos-painel" role="tabpanel" id={`painel-${rotina.id}`} aria-labelledby={`tab-${rotina.id}`} data-reveal>
        <div className="treinos-resumo">
          <p className="treinos-frequencia">{rotina.frequencia}</p>
          <p>{rotina.resumo}</p>
          <dl><div><dt>Descanso</dt><dd>{rotina.descanso}</dd></div><div><dt>Progressão</dt><dd>{rotina.progressao}</dd></div></dl>
        </div>
        <div className="treinos-dias">{rotina.dias.map(dia => <article key={dia.titulo}>
          <h3>{dia.titulo}</h3>
          <ol>{dia.exercicios.map(ex => <li key={ex.nome}><span>{ex.nome}</span><strong>{ex.series}</strong></li>)}</ol>
        </article>)}</div>
      </div>

      <div className="treinos-aviso" data-reveal>
        <p><strong>Antes de começar:</strong> faça um aquecimento de 5 a 10 minutos e peça a um professor da academia para ajustar exercícios, cargas e técnica. Estas rotinas são exemplos educativos e não substituem avaliação física. Se tem alguma condição de saúde, consulte um médico.</p>
        <Button href={whatsappUrl('uma avaliação e montagem de treino')}>Pedir avaliação</Button>
      </div>
      <Fontes titulo="Fontes dos treinos" fontes={fontesTreino} />
    </div>
  </section>;
}

export function Fontes({ titulo, fontes }: { titulo: string; fontes: { texto: string; url: string }[] }) {
  return <details className="fontes" data-reveal><summary>{titulo} ({fontes.length})</summary><ol>{fontes.map(f => <li key={f.url}><a href={f.url} target="_blank" rel="noopener noreferrer">{f.texto}</a></li>)}</ol></details>;
}
