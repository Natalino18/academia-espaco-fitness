import { Button } from '../components/Button';
import { Photo } from '../components/Photo';
import { schedule } from '../data/schedule';
export function About() {
  return <section id="espaco" className="about section" tabIndex={-1} aria-labelledby="about-title">
    <div className="wrap about-grid">
      <div className="about-photo" data-reveal><Photo id={5} /><span className="photo-label">SEU PRÓXIMO PASSO É AQUI. <span>↗</span></span></div>
      <div className="about-copy" data-reveal><p className="eyebrow">01 / Nossa academia</p><h2 id="about-title">MUSCULAÇÃO <br />E AULAS <br /><span>EM UM SÓ <br />LUGAR.</span></h2>
        <p>Sala de musculação, área de cardio e aulas de Step, Jump, RitBox, Funcional e Dança, no BTN 2, em Paulo Afonso.</p>
        <p>Aberta {schedule.map(day => `${day.day.toLowerCase()} das ${day.open} às ${day.close}`).join(', ')}.</p>
        <Button href="#modalidades" onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const section = document.getElementById('modalidades');
          if (!section) return;
          event.preventDefault();
          section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        }}>Ver modalidades</Button>
      </div>
    </div>
  </section>;
}
