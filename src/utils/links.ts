import { store } from '../data/store';
export function whatsappUrl(subject = 'os planos') {
  return whatsappText(`Olá! Vim pelo site da ${store.name} e gostaria de saber mais sobre ${subject}.`);
}
export function whatsappText(message: string) {
  return `${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
