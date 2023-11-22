import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthProvider } from "./context/authContext";
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import TaskFormPage from './pages/TaskFormPage'
import TaskPage from './pages/TaskPage'
import ProtectedRoute from './ProtectedRoute';
import LogoutPage from './pages/logoutPage';
import { TaskProvider } from './context/taskContext';
import {InvoiceProvider} from './context/invoiceContext'
import NavbarOne from './components/NavbarOne';
import InvoicesPage from './pages/InvoicesPage';
import InvoicesFormPage from './pages/InvoiceFormPage'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <InvoiceProvider>
        <BrowserRouter>         
          <main className='container mx-auto px-10'>
          <NavbarOne />
          <Routes>
            <Route path='/' element={<HomePage/>} />        
            <Route path='/login' element={ <LoginPage />} />
            <Route path='/register' element={ <RegisterPage />}/>
            <Route path='/logout' element={ < LogoutPage/>}/>
            
            <Route element={<ProtectedRoute />}>          
              <Route path='/tasks' element={< TaskPage />} />
              <Route path='/add-Task' element={< TaskFormPage />} />          
              <Route path='/tasks/:id' element={< TaskFormPage />} />
              <Route path='/profile' element={< ProfilePage />} />
              <Route path='/invoices' element={< InvoicesPage/>}/>
              <Route path='/add-invoice' element={< InvoicesFormPage/>}/>
            </Route>        

          </Routes>
          </main>
        </BrowserRouter>
        </InvoiceProvider>
      </TaskProvider>
      
    </AuthProvider>
  )
}

export default App;