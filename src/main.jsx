import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PasswordGenerator from './components/PasswordGenerator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordGenerator/>
  </StrictMode>,
)
