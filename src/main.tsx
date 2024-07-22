import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AuthProvider } from './context/auth-context.tsx';
import { ModalProvider } from './context/modal-context.tsx';
import ModalRenderer from './components/modals/modal-renderer.tsx';

import { router } from './utils/router.tsx';
import './index.scss'
import { NotificationProvider } from './context/notification-context.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <ModalProvider>
            <RouterProvider router={router} />
            <ModalRenderer />
          </ModalProvider>
        </NotificationProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
