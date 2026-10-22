import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Modalities } from './sections/Modalities';
import { Gallery } from './sections/Gallery';
import { Schedule } from './sections/Schedule';
import { Benefits } from './sections/Benefits';
import { Plans } from './sections/Plans';
import { FinalCta } from './sections/FinalCta';
import { Contact } from './sections/Contact';
import { Faq } from './sections/Faq';
import { Treinos } from './sections/Treinos';
import { Nutricao } from './sections/Nutricao';
import { ClassSchedule, Testimonials, Team } from './sections/SocialProof';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { useMotion } from './hooks/useMotion';
export default function App() {
  useMotion();
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><div id="header-sentinel" /><Header /><main id="conteudo" tabIndex={-1}><Hero /><About /><Modalities /><ClassSchedule /><Gallery /><Testimonials /><Team /><Plans /><Benefits /><Schedule /><Treinos /><Nutricao /><FinalCta /><Faq /><Contact /></main><Footer /><WhatsAppFloat /></>;
}
