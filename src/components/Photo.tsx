import images from '../data/images.json';
const descriptions = [
  'Vista do salão de musculação, com bancos, equipamentos e paredes amarelas',
  'Esteiras da Academia Espaço Fitness',
  'Pista amarela central entre os equipamentos da academia',
  'Equipamentos de musculação ao lado da pista amarela',
  'Perspectiva da pista amarela e dos aparelhos de musculação',
  'Bancos e equipamentos no salão de musculação da Espaço Fitness',
];
export function Photo({ id, className = '', priority = false, decorative = false, sizes = '(max-width: 700px) 100vw, 50vw' }: { id: number; className?: string; priority?: boolean; decorative?: boolean; sizes?: string }) {
  const item = images[id - 1];
  const name = `/images/academia/academia-${String(id).padStart(2, '0')}`;
  return <img className={className} src={`${name}.webp`} srcSet={priority ? undefined : `${name}-640.webp 640w, ${name}.webp ${item.width}w`} sizes={priority ? undefined : sizes} width={item.width} height={item.height} alt={decorative ? '' : descriptions[id - 1]} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />;
}
