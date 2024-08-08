import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  RouterProvider} from "react-router-dom";
import router from './Routes/Route';
import AuthProvider from './Provider/AuthProvider';

import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <div className='max-w-6xl mx-auto'>
    <RouterProvider router={router} />
    </div>
    </HelmetProvider>
  </QueryClientProvider>
  </AuthProvider>
  </React.StrictMode>,
)
