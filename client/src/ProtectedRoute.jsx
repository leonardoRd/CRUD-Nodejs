import { useAuth } from "./context/authContext";
import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute() {
    const {loading, isAuthenticate} = useAuth();
        
    if(loading) return <h1>Loading....</h1>

    if(!loading && !isAuthenticate) return <Navigate to="/login" replace />

    return <Outlet />;
}

export default ProtectedRoute;