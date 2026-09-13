import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./styles/bootstrap.css";
import "./styles/font-awesome.css";
import "./styles/tiny-slider.css";
import "./styles/wk-styles.css";
import "./styles/kamsol.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
