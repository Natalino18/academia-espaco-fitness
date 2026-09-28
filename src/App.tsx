import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Modalities } from './sections/Modalities';
import { Gallery } from './sections/Gallery';
import { Schedule } from './sections/Schedule';
import { Plans } from './sections/Plans';
import { FinalCta } from './sections/FinalCta';
import { Contact } from './sections/Contact';
import { useMotion } from './hooks/useMotion';
export default function App() {
  useMotion();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div id="header-sentinel" /><Header /><main id="conteudo" tabIndex={-1}><Hero /><About /><Modalities /><Gallery /><Schedule /><Plans /><FinalCta /><Contact /></main><Footer /></>;
}
