import { Photo } from '../components/Photo';
import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';
export function Gallery() {
  return <section id="galeria" className="gallery section" tabIndex={-1} aria-labelledby="gallery-title">
    <div className="wrap gallery-grid">
      <div className="gallery-intro" data-reveal><p className="eyebrow">03 / Nosso espaço</p><h2 id="gallery-title"><em>ESTRUTURA</em><br />COMPLETA<br />PARA A SUA<br />EVOLUÇÃO.</h2><p>Um olhar por dentro.<br />Conheça o espaço onde a sua rotina ganha movimento.</p><Button href={whatsappUrl('a academia')}>Conheça a academia</Button></div>
      <figure className="gallery-main" data-reveal data-parallax="-24"><Photo id={1} /><figcaption><span>01 /</span> Espaço para evoluir</figcaption></figure>
      <figure className="gallery-top" data-reveal data-parallax="18"><Photo id={6} /><figcaption><span>02 /</span> Musculação</figcaption></figure>
      <figure className="gallery-cardio" data-reveal data-parallax="-16"><Photo id={2} /><figcaption><span>03 /</span> Seu ritmo. Seu cardio.</figcaption></figure>
      <figure className="gallery-detail" data-reveal><Photo id={4} /><figcaption><span>04 /</span> Cada detalhe conta</figcaption></figure>
      <div className="gallery-manifesto" data-reveal><IconMark /><p>MAIS QUE<br />TREINO.<br />UM ESPAÇO<br />PARA VOCÊ.</p></div>
    </div>
  </section>;
}
function IconMark() { return <span aria-hidden="true">↗</span>; }
