import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';
export function FinalCta() {
  return <section className="final-cta" aria-labelledby="final-title"><div className="final-photo" data-parallax="-30"><picture aria-hidden="true"><source media="(max-width: 700px)" srcSet="/images/cta/academia-premium-3840.webp" /><img src="/images/cta/academia-premium-1920.webp" srcSet="/images/cta/academia-premium-1920.webp 1920w, /images/cta/academia-premium-3840.webp 3840w, /images/cta/academia-premium-5120.webp 5120w, /images/cta/academia-premium-6400.webp 6400w" sizes="100vw" width="7342" height="4900" alt="" loading="lazy" decoding="async" /></picture></div><div className="final-shade" />
    <div className="wrap final-layout"><div data-reveal><p className="eyebrow">A EVOLUÇÃO É UMA ESCOLHA DIÁRIA.</p><h2 id="final-title">DISCIPLINA<br />HOJE.<br /><em>RESULTADOS<br />SEMPRE.</em></h2></div><div className="final-copy" data-reveal><span className="big-arrow" aria-hidden="true">↗</span><p>Faça parte da Espaço Fitness e comece agora a sua evolução.</p><p>Nosso time está pronto para receber você no BTN 2.</p><div className="button-row"><Button href={whatsappUrl()}>Falar no WhatsApp</Button><Button variant="outline" href="#planos">Ver planos</Button></div></div></div>
  </section>;
}
