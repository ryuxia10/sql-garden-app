import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider'
import { DatabaseProvider } from './context/DatabaseContext' // Impor provider database

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Bungkus App dengan DatabaseProvider */}
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </ThemeProvider>
  </React.StrictMode>,
)