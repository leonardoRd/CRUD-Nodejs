import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import TaskFormPage from './pages/TaskFormPage'
import TaskPage from './pages/TaskPage'
import ProtectedRoute from './ProtectedRoute'
import LogoutPage from './pages/logoutPage'
import { TaskProvider } from './context/taskContext'
import { InvoiceProvider } from './context/invoiceContext'
import { TipoComprobanteProvider } from './context/tipoComprobContext'
import { EstadosProvider } from './context/estadosContext'
import NavbarOne from './components/NavbarOne'
import InvoicesPage from './pages/InvoicesPage'
import InvoicesFormPage from './pages/InvoiceFormPage'
import TipoComprobPage from './pages/TipoComprobPage'
import TipoComprobFormPage from './pages/TipoComprobFormPage'
import EstadosPage from './pages/EstadosPage'
import EstadosFormPage from './pages/EstadosFormPage'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <InvoiceProvider>
          <TipoComprobanteProvider>
            <EstadosProvider>
              <BrowserRouter>
                <main className="container mx-auto px-10">
                  <NavbarOne />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/logout" element={<LogoutPage />} />

                    <Route element={<ProtectedRoute />}>
                      {/* Tareas */}
                      <Route path="/tasks" element={<TaskPage />} />
                      <Route path="/add-Task" element={<TaskFormPage />} />
                      <Route path="/tasks/:id" element={<TaskFormPage />} />
                      <Route path="/profile" element={<ProfilePage />} />

                      {/* Facturas */}
                      <Route path="/invoices" element={<InvoicesPage />} />
                      <Route
                        path="/add-invoice"
                        element={<InvoicesFormPage />}
                      />
                      <Route
                        path="/invoice/:id"
                        element={<InvoicesFormPage />}
                      />

                      {/* Tipos de Comprobantes */}
                      <Route
                        path="/tiposComprob"
                        element={<TipoComprobPage />}
                      />
                      <Route
                        path="/add-TipoComprob"
                        element={<TipoComprobFormPage />}
                      />
                      <Route
                        path="/tipoComprob/:id"
                        element={<TipoComprobFormPage />}
                      />

                      {/* Estados */}
                      <Route path="/estados" element={<EstadosPage />} />
                      <Route path="/add-estado" element={<EstadosFormPage />} />
                      <Route path="/estado/:id" element={<EstadosFormPage />} />
                    </Route>
                  </Routes>
                </main>
              </BrowserRouter>
            </EstadosProvider>
          </TipoComprobanteProvider>
        </InvoiceProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
