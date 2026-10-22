import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { whatsappUrl } from '../utils/links';
// Botão fixo no canto: aparece depois do topo da página, quando os botões do hero já saíram do ecrã.
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <a className={`whatsapp-float${visible ? ' is-visible' : ''}`} href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" tabIndex={visible ? 0 : -1}><Icon name="whatsapp" /></a>;
}
