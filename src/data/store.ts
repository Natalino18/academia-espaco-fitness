export const store = {
  name: 'Academia Espaço Fitness',
  city: 'Paulo Afonso/BA',
  neighborhood: 'BTN 2',
  street: 'Rua Padre Lourenço, nº 1292',
  phone: '(75) 99187-4944',
  whatsapp: 'https://wa.me/5575991874944',
  instagram: 'https://www.instagram.com/academiaespacofitn/',
  instagramHandle: '@academiaespacofitn',
  linktree: 'https://linktr.ee/academiaespacofitn',
};
export const navigation = [
  { label: 'Espaço', href: '#espaco' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Contato', href: '#contato' },
];
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.name}, ${store.street}, ${store.neighborhood}, ${store.city}`)}`;
