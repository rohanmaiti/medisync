import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';

const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {},
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <CssVarsProvider
      theme={theme}
      defaultMode="dark" // 👈 Set dark mode by default
      modeStorageKey="my-app-color-scheme" // optional
    >
      <CssBaseline />
      <App />
    </CssVarsProvider>
    </BrowserRouter>
  </StrictMode>,
)
