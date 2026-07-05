import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CommandPaletteProvider } from '@/components/layout/CommandPalette';
import { Loader } from '@/components/ui/Loader';

// Eager: the landing page is the most common entry point.
import HomePage from '@/pages/HomePage';

// Lazy: secondary routes are code-split for a lean initial bundle.
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const ProductsPage = lazy(() => import('@/pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ResearchPage = lazy(() => import('@/pages/ResearchPage'));
const CaseStudiesPage = lazy(() => import('@/pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('@/pages/CaseStudyDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const AdminPage = lazy(() => import('@/pages/admin/AdminPage'));

export default function App() {
  return (
    <CommandPaletteProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="projects"
            element={
              <Suspense fallback={<Loader />}>
                <ProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="projects/:slug"
            element={
              <Suspense fallback={<Loader />}>
                <ProjectDetailPage />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<Loader />}>
                <ProductsPage />
              </Suspense>
            }
          />
          <Route
            path="products/:slug"
            element={
              <Suspense fallback={<Loader />}>
                <ProductDetailPage />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<Loader />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="research"
            element={
              <Suspense fallback={<Loader />}>
                <ResearchPage />
              </Suspense>
            }
          />
          <Route
            path="case-studies"
            element={
              <Suspense fallback={<Loader />}>
                <CaseStudiesPage />
              </Suspense>
            }
          />
          <Route
            path="case-studies/:slug"
            element={
              <Suspense fallback={<Loader />}>
                <CaseStudyDetailPage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Loader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<Loader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="admin"
            element={
              <Suspense fallback={<Loader />}>
                <AdminPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loader />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </CommandPaletteProvider>
  );
}
