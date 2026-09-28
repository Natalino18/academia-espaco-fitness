import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const target = 'public/images/academia';
await mkdir(target, { recursive: true });
const manifest = [];
for (let id = 1; id <= 6; id++) {
  const source = `imagens /imagen ${id}.jpeg`;
  const image = sharp(source).rotate();
  const { width, height } = await image.metadata();
  const name = `academia-${String(id).padStart(2, '0')}`;
  await image.clone().webp({ quality: 83, effort: 6 }).toFile(`${target}/${name}.webp`);
  await image.clone().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`${target}/${name}-640.webp`);
  manifest.push({ id, width, height, source, file: `${name}.webp` });
}
// Crop apenas, sem upscale: compartilhamento social com fotografia real.
await sharp('imagens /imagen 3.jpeg').rotate().resize(900, 600, { fit: 'cover', withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(`${target}/social.jpg`);
await writeFile('src/data/images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Seis originais preservados; derivados WebP e imagem social gerados.');
console.table(manifest.map(({ id, width, height }) => ({ id, width, height })));
