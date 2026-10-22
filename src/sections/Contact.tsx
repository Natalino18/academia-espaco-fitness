import { store, mapsUrl, mapsEmbedUrl } from '../data/store';
import { schedule } from '../data/schedule';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { whatsappUrl } from '../utils/links';
import { useState } from 'react';

// O mapa do Google só carrega depois do clique: até lá o site não faz pedidos a terceiros nem grava cookies.
function LocationMap() {
  const [open, setOpen] = useState(false);
  return <div className="location-map" data-reveal>
    {open
      ? <iframe src={mapsEmbedUrl} title="Mapa com a localização da Academia Espaço Fitness" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      : <button type="button" className="location-map-placeholder" onClick={() => setOpen(true)}><span className="location-pin"><Icon name="pin" /></span><strong>BTN 2.</strong><span>Mostrar mapa</span><small>O mapa é carregado do Google Maps.</small></button>}
    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir no Google Maps <Icon /></a>
  </div>;
}
export function Contact() {
  return <section id="contato" className="contact section" tabIndex={-1} aria-labelledby="contact-title"><div className="wrap">
    <div className="contact-top"><div data-reveal><p className="eyebrow">10 / Estamos no BTN 2</p><h2 id="contact-title">VENHA TREINAR <br />NA <em>ESPAÇO FITNESS.</em></h2><address>{store.street} <br />{store.neighborhood} · {store.city}</address><Button href={mapsUrl}>Como chegar</Button></div>
      <LocationMap />
    </div>
    <div className="contact-details" data-reveal><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span><strong>WhatsApp</strong><small>{store.phone}</small></span><Icon /></a><a href={store.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /><span><strong>Instagram</strong><small>{store.instagramHandle}</small></span><Icon /></a><div><Icon name="clock" /><span><strong>Funcionamento</strong><small>{schedule.map(day => `${day.short} ${day.open}–${day.close}`).join(' · ')}</small></span></div></div>
  </div></section>;
}
