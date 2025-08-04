import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<div className="bg-[#121212] min-h-screen text-white">
        <StrictMode>
             <App />
         </StrictMode>
    </div>

)
