import { StrictMode } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { Toaster } from 'sonner';

import { AuthProvider } from '@/context/AuthProvider';

import App from './App.jsx';
import './index.css';
import './scss/custom.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="bottom-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
