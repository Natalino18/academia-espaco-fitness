export function Brand() {
  return <a className="brand" href="#inicio" aria-label="Academia Espaço Fitness — início">
    <img className="brand-symbol" src="/images/brand/logo-oficial-192.png" srcSet="/images/brand/logo-oficial-64.png 64w, /images/brand/logo-oficial-128.png 128w, /images/brand/logo-oficial-192.png 192w" sizes="52px" width={192} height={192} alt="" decoding="async" />
    <span><small>ACADEMIA</small><strong>ESPAÇO FITNESS<span className="brand-dot">.</span></strong></span>
  </a>;
}
