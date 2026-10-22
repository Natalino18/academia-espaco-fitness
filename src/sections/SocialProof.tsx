import { testimonials, team, classSchedule } from '../data/social-proof';

export function ClassSchedule() {
  if (!classSchedule.length) return null;
  return <section id="grade" className="class-schedule section" aria-labelledby="grade-title"><div className="wrap">
    <p className="eyebrow" data-reveal>Grade de aulas</p><h2 id="grade-title" data-reveal>ESCOLHA O SEU <em>HORÁRIO.</em></h2>
    <ul className="class-grid" data-reveal>{classSchedule.map(c => <li key={c.modality}><strong>{c.modality}</strong><span>{c.days}</span><span className="class-times">{c.times.join(' · ')}</span></li>)}</ul>
  </div></section>;
}

export function Testimonials() {
  if (!testimonials.length) return null;
  return <section id="depoimentos" className="testimonials section" aria-labelledby="depoimentos-title"><div className="wrap">
    <p className="eyebrow" data-reveal>Quem treina aqui</p><h2 id="depoimentos-title" data-reveal>O QUE DIZEM <em>NOSSOS ALUNOS.</em></h2>
    <div className="testimonial-grid">{testimonials.map(t => <blockquote key={t.name} data-reveal><p>“{t.text}”</p><footer><strong>{t.name}</strong>{t.since && <span>{t.since}</span>}</footer></blockquote>)}</div>
  </div></section>;
}

export function Team() {
  if (!team.length) return null;
  return <section id="equipe" className="team section" aria-labelledby="equipe-title"><div className="wrap">
    <p className="eyebrow" data-reveal>Nossa equipe</p><h2 id="equipe-title" data-reveal>QUEM CUIDA <em>DO SEU TREINO.</em></h2>
    <ul className="team-grid">{team.map(m => <li key={m.name} data-reveal>{m.photo && <img src={m.photo} alt={`Foto de ${m.name}`} width={600} height={750} loading="lazy" decoding="async" />}<strong>{m.name}</strong><span>{m.role}</span>{m.cref && <small>{m.cref}</small>}</li>)}</ul>
  </div></section>;
}
