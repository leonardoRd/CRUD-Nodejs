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
import { ProductoProvider, ProductosContext } from './context/productosContext'
import { InventarioProvider } from './context/inventarioContext'
import { ListaPrecioProvider } from './context/listaPrecioContext'
import NavbarOne from './components/NavbarOne'
import InvoicesPage from './pages/InvoicesPage'
import InvoicesFormPage from './pages/InvoiceFormPage'
import TipoComprobPage from './pages/TipoComprobPage'
import TipoComprobFormPage from './pages/TipoComprobFormPage'
import EstadosPage from './pages/EstadosPage'
import EstadosFormPage from './pages/EstadosFormPage'
import ProductosPage from './pages/ProductosPage'
import ProductosFormPage from './pages/ProductosFormPage'
import DatoCodigoPage from './pages/datoCodigo/DatoCodigoPage'
import DatoCodigoFormPage from './pages/datoCodigo/DatoCodigoFormPage'
import InventarioPage from './pages/inventario/InventarioPage'
import InventarioFormPage from './pages/inventario/InventarioFormPage'
import ListaPrecioPage from './pages/listaPrecio/ListaPrecioPage'
import ListaPrecioFormPage from './pages/listaPrecio/ListaPrecioFormPage'
import PersonaPage from './pages/personas/PersonaPage'
import PersonaFormPage from './pages/personas/PersonaFormPage'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <InvoiceProvider>
          <TipoComprobanteProvider>
            <EstadosProvider>
              <ProductoProvider>
                <InventarioProvider>
                  <ListaPrecioProvider>
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
                            <Route
                              path="/add-Task"
                              element={<TaskFormPage />}
                            />
                            <Route
                              path="/tasks/:id"
                              element={<TaskFormPage />}
                            />
                            <Route path="/profile" element={<ProfilePage />} />

                            {/* Facturas */}
                            <Route
                              path="/invoices"
                              element={<InvoicesPage />}
                            />
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
                            <Route
                              path="/add-estado"
                              element={<EstadosFormPage />}
                            />
                            <Route
                              path="/estado/:id"
                              element={<EstadosFormPage />}
                            />

                            {/* Productos */}
                            <Route
                              path="/productos"
                              element={<ProductosPage />}
                            />
                            <Route
                              path="/add-productos"
                              element={<ProductosFormPage />}
                            />
                            <Route
                              path="/productos/:id"
                              element={<ProductosFormPage />}
                            />

                            {/* Inventario */}
                            <Route
                              path="/inventario"
                              element={<InventarioPage />}
                            />
                            <Route
                              path="/inventario/:id"
                              element={<InventarioFormPage />}
                            />

                            {/* Dato Codigos */}
                            <Route
                              path="/datoCodigo"
                              element={<DatoCodigoPage />}
                            />
                            <Route
                              path="/add-datoCodigo"
                              element={<DatoCodigoFormPage />}
                            />
                            <Route
                              path="/datoCodigo/:id"
                              element={<DatoCodigoFormPage />}
                            />

                            {/* Lista de Precios */}
                            <Route
                              path="/listaPrecio"
                              element={<ListaPrecioPage />}
                            />
                            <Route
                              path="/add-listaPrecio"
                              element={<ListaPrecioFormPage />}
                            />
                            <Route
                              path="/listaPrecio/:id"
                              element={<ListaPrecioFormPage />}
                            />

                            {/* CARGA DE PERSONAS */}
                            <Route path="/personas" element={<PersonaPage />} />
                            <Route
                              path="/add-persona"
                              element={<PersonaFormPage />}
                            />
                            <Route
                              path="/personas/:id"
                              element={<PersonaFormPage />}
                            />
                          </Route>
                        </Routes>
                        <Footer />
                      </main>
                    </BrowserRouter>
                  </ListaPrecioProvider>
                </InventarioProvider>
              </ProductoProvider>
            </EstadosProvider>
          </TipoComprobanteProvider>
        </InvoiceProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
