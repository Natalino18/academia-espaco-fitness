import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Masters licensed and preserved unchanged in assets/masters; see docs/assets-refinamento.md.
// Explicit crops keep the activity/equipment in frame. Never enlarge the source.
const crops = {
  musculacao: { left: 2080, top: 300, width: 2540, height: 3500 },
  step: { left: 0, top: 600, width: 3840, height: 5160 },
  jump: { left: 1500, top: 280, width: 1920, height: 2520 },
  ritbox: { left: 3370, top: 0, width: 3100, height: 4480 },
  funcional: null,
  danca: { left: 800, top: 0, width: 2700, height: 3904 },
};
await mkdir('public/images/hero', { recursive: true });
await mkdir('public/images/modalidades', { recursive: true });
for (const width of [960, 1600, 2400]) {
  await sharp('assets/masters/hero-athlete.jpg').resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/images/hero/hero-athlete${width === 2400 ? '' : `-${width}`}.webp`);
}
for (const width of [540, 1080]) {
  await sharp('assets/masters/hero-athlete.jpg').extract({ left: 1350, top: 0, width: 2350, height: 2595 }).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/images/hero/hero-athlete-mobile-${width}.webp`);
}
for (const [name, crop] of Object.entries(crops)) {
  for (const width of [480, 960]) {
    let pipeline = sharp(`assets/masters/${name}.jpg`);
    if (crop) pipeline = pipeline.extract(crop);
    const result = await pipeline.resize(width, width * 1.5, { fit: 'cover', position: 'centre', withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/images/modalidades/${name}${width === 960 ? '' : '-480'}.webp`);
    console.log(name, result.width, result.height, `${Math.round(result.size / 1024)} KB`);
  }
}
