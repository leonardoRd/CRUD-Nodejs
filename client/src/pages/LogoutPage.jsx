import { useAuth } from '../context/authContext'
import { Navigate, useNavigate } from 'react-router-dom'

function LogoutPage() {
  const { logout } = useAuth()
  const navigat = useNavigate()
  logout()
  navigat('/')
  return <div></div>
}

export default LogoutPage
