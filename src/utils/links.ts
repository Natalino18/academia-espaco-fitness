import { store } from '../data/store';
export function whatsappUrl(subject = 'os planos') {
  return `${store.whatsapp}?text=${encodeURIComponent(`Olá! Vim pelo site da ${store.name} e gostaria de saber mais sobre ${subject}.`)}`;
}
