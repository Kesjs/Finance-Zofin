import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import About from '../components/About';
import NosOffres from '../pages/NosOffres';

// Lazy load Faq component
const Faq = lazy(() => import('../components/faq'));

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <NosOffres />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>}>
        <Faq />
      </Suspense>
      <Contact />
    </div>
  );
}