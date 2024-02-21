import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from './context/DataContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <QueryClientProvider client={client}>
        <App />
        </QueryClientProvider>
    </DataProvider>
  </BrowserRouter>
  </React.StrictMode>,
)
