import { store, mapsUrl } from '../data/store';
import { schedule } from '../data/schedule';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { whatsappUrl } from '../utils/links';
export function Contact() {
  return <section id="contato" className="contact section" tabIndex={-1} aria-labelledby="contact-title"><div className="wrap">
    <div className="contact-top"><div data-reveal><p className="eyebrow">06 / Estamos no BTN 2</p><h2 id="contact-title">VENHA TREINAR<br />NA <em>ESPAÇO FITNESS.</em></h2><address>{store.street}<br />{store.neighborhood} · {store.city}</address><Button href={mapsUrl}>Como chegar</Button></div>
      <a className="location-card" href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver endereço da Academia Espaço Fitness no Google Maps" data-reveal><div className="location-lines" aria-hidden="true" /><span className="location-card-top">NOSSO PONTO DE ENCONTRO <Icon /></span><div className="location-pin"><Icon name="pin" /></div><div className="location-card-bottom"><strong>BTN 2.</strong><span>PAULO AFONSO / BAHIA<br /><small>Abrir no Google Maps ↗</small></span></div></a>
    </div>
    <div className="contact-details" data-reveal><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span><strong>WhatsApp</strong><small>{store.phone}</small></span><Icon /></a><a href={store.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /><span><strong>Instagram</strong><small>{store.instagramHandle}</small></span><Icon /></a><div><Icon name="clock" /><span><strong>Funcionamento</strong><small>{schedule.map(day => `${day.short} ${day.open}–${day.close}`).join(' · ')}</small></span></div></div>
  </div></section>;
}
