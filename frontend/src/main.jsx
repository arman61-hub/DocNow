import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from './admin/context/AdminContext.jsx'
import DoctorContextProvider from './admin/context/DoctorContext.jsx'
import AdminAppContextProvider from './admin/context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AdminAppContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </AdminAppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
