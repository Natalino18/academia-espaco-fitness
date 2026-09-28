import { useEffect, useRef, useState } from 'react';
import { modalities } from '../data/modalities';
import { Icon } from '../components/Icon';
import { whatsappUrl } from '../utils/links';
export function Modalities() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setPosition({ start: el.scrollLeft < 5, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 5 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  function move(direction: number) {
    const el = track.current;
    if (el) el.scrollBy({ left: direction * (el.children[0].getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap)), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section id="modalidades" className="modalities section" tabIndex={-1} aria-labelledby="modalities-title">
    <div className="wrap modalities-layout">
      <div className="modalities-intro" data-reveal><p className="eyebrow">02 / Modalidades</p><h2 id="modalities-title">DIFERENTES<br />RITMOS.<br /><em>O MESMO<br />OBJETIVO.</em></h2><p>Encontre o movimento que combina com você. Escolha seu ritmo e faça parte.</p><a className="text-link" href={whatsappUrl('as modalidades')} target="_blank" rel="noopener noreferrer">Conheça as modalidades <Icon /></a>
        <div className="carousel-controls"><button aria-label="Modalidades anteriores" onClick={() => move(-1)} disabled={position.start}><span>←</span></button><button aria-label="Próximas modalidades" onClick={() => move(1)} disabled={position.end}><span>→</span></button><span>06 MODALIDADES</span></div>
      </div>
      <div className="modalities-gallery"><div ref={track} className="modality-track" role="region" aria-label="Seis modalidades da academia" tabIndex={0} onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
        if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); track.current?.scrollTo({ left: event.key === 'Home' ? 0 : track.current.scrollWidth, behavior: 'instant' }); }
      }} onScroll={() => { const el = track.current; if (el) setPosition({ start: el.scrollLeft < 5, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 5 }); }}>
        {modalities.map((modality, i) => <a className="modality-card" href={whatsappUrl(`a modalidade ${modality.name}`)} target="_blank" rel="noopener noreferrer" key={modality.name} aria-label={`Consultar ${modality.name} pelo WhatsApp`}>
          <img src={`/images/modalidades/${modality.image}.webp`} srcSet={`/images/modalidades/${modality.image}-480.webp 480w, /images/modalidades/${modality.image}.webp 960w`} sizes="(max-width: 700px) 75vw, (max-width: 1100px) 35vw, 25vw" width={960} height={1440} alt={`${modality.alt} — fotografia ilustrativa`} loading="lazy" decoding="async" /><span className="modality-number">0{i + 1}</span><span className="modality-content"><span className="modality-name">{modality.name}<Icon /></span><span className="modality-description">{modality.description}</span></span>
        </a>)}
      </div><p className="image-note">Fotografias ilustrativas das modalidades. Consulte os detalhes das aulas pelo WhatsApp.</p></div>
    </div>
  </section>;
}
