import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import './scss/custom.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {' '}
    {/* solo prod */}
    <BrowserRouter>
      {' '}
      {/* https://reactrouter.com/start/declarative/routing */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
