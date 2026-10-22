import { tour, tourCredit } from '../data/tour';
export function Tour() {
  return <section id="tour" className="tour section" aria-labelledby="tour-title">
    <div className="wrap tour-heading" data-reveal>
      <div><p className="eyebrow">Tour pela academia</p><h2 id="tour-title">POR DENTRO DA <br /><em>ESPAÇO FITNESS.</em></h2></div>
      <p>Deslize para conhecer cada ambiente.</p>
    </div>
    <div className="tour-track" role="region" aria-label="Fotos da academia" tabIndex={0}>
      {tour.map(item => <figure key={item.file}>
        <img src={`/images/tour/${item.file}.webp`} srcSet={`/images/tour/${item.file}-480.webp 480w, /images/tour/${item.file}.webp 720w`} sizes="(max-width: 700px) 72vw, 300px" width={720} height={1280} alt={item.alt} loading="lazy" decoding="async" />
        <figcaption>{item.caption}</figcaption>
      </figure>)}
    </div>
    <p className="wrap tour-credit"><a href={tourCredit.url} target="_blank" rel="noopener noreferrer">{tourCredit.label}</a></p>
  </section>;
}
