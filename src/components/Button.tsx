import type { MouseEventHandler, ReactNode } from 'react';
import { Icon } from './Icon';
export function Button({ children, href, variant = 'yellow', className = '', onClick, 'aria-label': ariaLabel }: { 'aria-label'?: string; children: ReactNode; href: string; variant?: 'yellow' | 'outline' | 'dark'; className?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  const external = href.startsWith('https://');
  return <a className={`button button--${variant} ${className}`} href={href} onClick={onClick} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}<Icon /></a>;
}
