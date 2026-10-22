import { Button } from '../components/Button';
import { Photo } from '../components/Photo';
import { whatsappUrl } from '../utils/links';
export function FinalCta() {
  return <section className="final-cta" aria-labelledby="final-title"><div className="final-photo" data-parallax="-30"><Photo id={1} decorative sizes="100vw" /></div><div className="final-shade" />
    <div className="wrap final-layout"><div data-reveal><p className="eyebrow">A EVOLUÇÃO É UMA ESCOLHA DIÁRIA.</p><h2 id="final-title">DISCIPLINA <br />HOJE. <br /><em>RESULTADOS <br />SEMPRE.</em></h2></div><div className="final-copy" data-reveal><span className="big-arrow" aria-hidden="true">↗</span><p>Faça parte da Espaço Fitness e comece agora a sua evolução.</p><p>Nosso time está pronto para receber você no BTN 2.</p><div className="button-row"><Button href={whatsappUrl()}>Falar no WhatsApp</Button><Button variant="outline" href="#planos">Ver planos</Button></div></div></div>
  </section>;
}
