import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollProgress } from './ScrollProgress';
import { BackToTop } from './BackToTop';
import { ScrollToTop } from './ScrollToTop';
import { usePrefersReducedMotion } from '@/lib/hooks';

export function Layout() {
  const { pathname } = useLocation();
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="pt-16">
        {/* Re-keyed per route so navigation gets a soft entrance transition */}
        <motion.div
          key={pathname}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
