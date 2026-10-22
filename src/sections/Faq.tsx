import { faq } from '../data/faq';
import { Button } from '../components/Button';
import { whatsappUrl } from '../utils/links';
export function Faq() {
  return <section id="duvidas" className="faq section" tabIndex={-1} aria-labelledby="faq-title">
    <div className="wrap faq-layout">
      <div data-reveal><p className="eyebrow">09 / Dúvidas frequentes</p><h2 id="faq-title">FICOU COM <br /><em>ALGUMA DÚVIDA?</em></h2><p>Se a sua pergunta não estiver aqui, fale com a gente.</p><Button href={whatsappUrl('uma dúvida')}>Perguntar no WhatsApp</Button></div>
      <div className="faq-list" data-reveal>{faq.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
    </div>
  </section>;
}
