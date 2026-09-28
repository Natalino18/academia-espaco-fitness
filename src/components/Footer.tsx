import { store, navigation, mapsUrl } from '../data/store';
import { schedule } from '../data/schedule';
import { whatsappUrl } from '../utils/links';
import { Brand } from './Brand';
export function Footer() {
  return <footer className="footer"><div className="wrap footer-main"><div className="footer-brand"><Brand /><p>Seu espaço. Sua evolução.</p></div><div><h2>Navegação</h2><nav aria-label="Navegação do rodapé">{navigation.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav></div><div><h2>Contato</h2><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a href={store.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{store.street}<br />{store.neighborhood} · {store.city}</a></div><div><h2>Funcionamento</h2>{schedule.map(day => <p key={day.short}>{day.short} <span>{day.open}–{day.close}</span></p>)}</div></div><div className="wrap footer-bottom"><p>© {new Date().getFullYear()} {store.name}. Todos os direitos reservados.</p><a href="#inicio">VOLTAR AO TOPO ↑</a><a className="developer-credit" href="https://github.com/Natalino18" target="_blank" rel="noopener noreferrer">Desenvolvido por Natalino Varela Correia <span aria-hidden="true">↗</span></a></div></footer>;
}
