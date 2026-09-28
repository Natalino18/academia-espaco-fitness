type Name = 'arrow' | 'down' | 'whatsapp' | 'instagram' | 'pin' | 'clock' | 'plus';
export function Icon({ name = 'arrow', className = '' }: { name?: Name; className?: string }) {
  const paths: Record<Name, React.ReactNode> = {
    arrow: <><path d="M5 19 19 5M5 5h14v14" /></>,
    down: <><path d="M12 4v16m-6-6 6 6 6-6" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z" /><path d="M8 7.5c-.8 1-.3 3.3 1.7 5.3s4.3 2.5 5.3 1.7l1-1.1-2.5-1.5-.9.8a8 8 0 0 1-2.3-2.3l.8-.9-1.5-2.5Z" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return <svg className={`icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
