import { useEffect, useRef, useState } from 'react';
import { navigation } from '../data/store';
import { whatsappUrl } from '../utils/links';
import { Brand } from './Brand';
import { Button } from './Button';
import { Icon } from './Icon';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sentinel = document.querySelector('#header-sentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const modal = dialog.current;
    const button = trigger.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal?.showModal();
    const media = matchMedia('(min-width: 901px)');
    const onResize = () => { if (media.matches) setOpen(false); };
    media.addEventListener('change', onResize);
    return () => {
      modal?.close();
      document.body.style.overflow = previous;
      button?.focus({ preventScroll: true });
      media.removeEventListener('change', onResize);
    };
  }, [open]);
  function navigate(href: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      const section = document.querySelector<HTMLElement>(href);
      section?.focus({ preventScroll: true });
      section?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      history.replaceState(null, '', href);
    });
  }
  return <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
    <div className="header-inner"><Brand />
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
      <Button href={whatsappUrl()} className="header-cta">WhatsApp</Button>
      <button ref={trigger} className="menu-trigger" aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><span /><span /></button>
    </div>
    <dialog id="mobile-menu" ref={dialog} className="mobile-menu" onCancel={(event) => { event.preventDefault(); setOpen(false); }} aria-label="Menu de navegação" onKeyDown={(event) => {
      if (event.key !== 'Tab') return;
      const focusable = dialog.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
      <div className="menu-top"><span className="eyebrow">ESPAÇO FITNESS</span><button className="menu-close" aria-label="Fechar menu" onClick={() => setOpen(false)}>×</button></div>
      <nav aria-label="Navegação mobile">{navigation.map((link, i) => <a href={link.href} key={link.href} onClick={(event) => { event.preventDefault(); navigate(link.href); }}><span>0{i + 1}</span>{link.label}<Icon /></a>)}</nav>
      <Button href={whatsappUrl()}>Falar no WhatsApp</Button>
      <p>BTN 2 · Paulo Afonso/BA</p>
    </dialog>
  </header>;
}
