import { Photo } from '../components/Photo';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { schedule } from '../data/schedule';
import { store } from '../data/store';
import { whatsappUrl } from '../utils/links';

export function Hero() {
  return <section id="inicio" className="hero-story" aria-labelledby="hero-title" tabIndex={-1}>
    <div className="hero-sticky">
      <div className="story-surface" aria-hidden="true"><span className="story-rule">ESPAÇO FITNESS / PAULO AFONSO</span><span className="story-coordinate">01 — MOVIMENTO</span></div>
      <div className="story-grid wrap">
      <div className="hero-frame">
        <div className="hero-visual">
        <picture className="hero-athlete">
          <source media="(max-width: 700px)" srcSet="/images/hero/hero-athlete-mobile-540.webp 540w, /images/hero/hero-athlete-mobile-1080.webp 1080w" sizes="100vw" />
          <img className="hero-photo" src="/images/hero/hero-athlete.webp" srcSet="/images/hero/hero-athlete-960.webp 960w, /images/hero/hero-athlete-1600.webp 1600w, /images/hero/hero-athlete.webp 2400w" sizes="100vw" width={2400} height={1594} alt="Atleta de costas em ambiente de academia — imagem publicitária ilustrativa" fetchPriority="high" loading="eager" decoding="async" />
        </picture>
        <div className="hero-shade" />
        </div>
        <Photo id={3} className="hero-academy" sizes="(max-width: 700px) 100vw, 50vw" />
      </div>
      <div className="story-copy" inert><span className="eyebrow">01 / NOSSA ACADEMIA</span><p>TREINAR É<br />UM PASSO.<br /><span>CONTINUAR É<br />O CAMINHO.</span></p><div className="story-details"><span className="story-caption">O próximo passo começa aqui.</span><p>Um espaço preparado para transformar treino em rotina, com estrutura, energia e motivação para você evoluir.</p><Button href="#galeria">Conheça nosso espaço</Button></div></div>
      </div>
      <div className="hero-content wrap">
        <p className="eyebrow"><span />{store.name} · {store.city}</p>
        <h1 id="hero-title">SEU ESPAÇO.<br /><em>SUA EVOLUÇÃO.</em></h1>
        <p className="hero-description">Encontre o seu ritmo. Da musculação às aulas, o próximo passo da sua rotina começa aqui, no BTN 2.</p>
        <div className="button-row"><Button href="#planos">Ver planos</Button><Button variant="outline" href={whatsappUrl()}>Falar no WhatsApp</Button></div>
      </div>
      <div className="hero-side-note">FORÇA. MOVIMENTO. EVOLUÇÃO.</div>
      <div className="hero-bottom wrap">
        <div><span>Para o seu treino</span><strong>Musculação e aulas</strong></div>
        <div><span>{schedule[0].day}</span><strong>{schedule[0].open} às {schedule[0].close}</strong></div>
        <div><span>Encontre a academia</span><strong>{store.neighborhood} · Paulo Afonso</strong></div>
        <a className="scroll-cue" href="#espaco" aria-label="Conheça a academia"><Icon name="down" /><span>Explore</span></a>
      </div>

      <span className="story-index" aria-hidden="true">ESPAÇO / 01</span>
    </div>
  </section>;
}
