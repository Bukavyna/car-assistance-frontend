import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter basename="/car-assistance-frontend"> // Додано basename
        <App />
      </BrowserRouter>
    </StrictMode>
  )
}
