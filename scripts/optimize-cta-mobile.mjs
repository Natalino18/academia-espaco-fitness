import sharp from 'sharp';

// Match cover at object-position: 18% 50%, keeping the full source height.
// A 9:10 crop covers the existing mobile frame (up to 700 × 800 CSS px).
const source = 'assets/masters/cta-academia-premium.jpg';
const { width, height } = await sharp(source).metadata();
const cropWidth = Math.round(height * .9);
const left = Math.round((width - cropWidth) * .18);
for (const outputWidth of [720, 1440, 2160]) {
  const result = await sharp(source)
    .extract({ left, top: 0, width: cropWidth, height })
    .resize({ width: outputWidth, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(`public/images/cta/academia-premium-mobile-${outputWidth}.webp`);
  console.log(outputWidth, result.height, result.size);
}
