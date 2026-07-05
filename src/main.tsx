import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './lib/theme';
import { loadContent } from './lib/content';
import './index.css';

// Apply admin-published content (if any) over the bundled defaults, then render.
// The fetch is same-origin and tiny, so this adds no perceptible delay.
loadContent().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter
        basename={import.meta.env.BASE_URL.replace(/\/$/, '')}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>,
  );
});
