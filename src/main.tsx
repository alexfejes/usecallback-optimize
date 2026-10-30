import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode is off for this demo: in development it renders every component twice,
// which would double the render counts we show in the console.
createRoot(document.getElementById('root')!).render(<App />)
