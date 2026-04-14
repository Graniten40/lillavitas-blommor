import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Integritetspolicy from './pages/Integritetspolicy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/integritetspolicy" element={<Integritetspolicy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)