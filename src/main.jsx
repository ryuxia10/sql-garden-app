import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider' // Impor provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bungkus komponen App dengan ThemeProvider */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)