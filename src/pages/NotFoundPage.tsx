import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';
import { Icon } from '@/components/Icon';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you’re looking for doesn’t exist." path="/404" />
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.15] mask-fade-b" />
        <div className="container relative text-center">
          <p className="font-display text-7xl font-bold gradient-text sm:text-9xl">404</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">This page took a different path</h1>
          <p className="mx-auto mt-3 max-w-md text-muted text-pretty">
            The page you’re after doesn’t exist or has moved. Let’s get you back to something useful.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-primary">
              <Icon name="arrow-right" size={16} /> Back home
            </Link>
            <Link to="/projects" className="btn-secondary">
              Browse the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
