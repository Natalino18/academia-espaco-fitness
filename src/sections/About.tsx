import { Button } from '../components/Button';
import { Photo } from '../components/Photo';
export function About() {
  return <section id="espaco" className="about section" tabIndex={-1} aria-labelledby="about-title">
    <div className="wrap about-grid">
      <div className="about-photo" data-reveal><Photo id={5} /><span className="photo-label">SEU PRÓXIMO PASSO É AQUI. <span>↗</span></span></div>
      <div className="about-copy" data-reveal><p className="eyebrow">01 / Nossa academia</p><h2 id="about-title">TREINAR É<br />UM PASSO.<br /><span>CONTINUAR É<br />O CAMINHO.</span></h2>
        <p>Encontre o treino que combina com você.</p>
        <p>Da musculação às aulas de Step, Jump, RitBox, Funcional e Dança, diferentes formas de manter o corpo em movimento.</p>
        <Button href="#modalidades" onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const section = document.getElementById('modalidades');
          if (!section) return;
          event.preventDefault();
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}>Ver modalidades</Button>
      </div>
    </div>
  </section>;
}
