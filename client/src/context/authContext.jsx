import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth";
import Cookies from "js-cookie";
import { verifyToken } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("Use Auth Provider")
    } 
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null); 
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [errors, serErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const singUp = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(user);
            setIsAuthenticate(true);    
            setLoading(false)
        } catch (error) {            
            
            serErrors(error.response.data);
        }        
    }

    const singIn = async (user) => {        
        try {
            const res = await loginRequest(user);                        
            setUser(res.data);               
            setIsAuthenticate(true); 
            setLoading(false)                                      
        } catch (error) {                        
            serErrors(error.response.data);
        }        
    };

    const logout = () => {
        if(isAuthenticate){
            setIsAuthenticate(false);
            setUser(null);
            setLoading(false)
            Cookies.remove("token");            
        }
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                serErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {        
        async function checkLogin() {
            const cookies = Cookies.get();
                       
            if(cookies.token) {            
                try {
                    const user = await verifyToken(cookies.token);  
                       
                    if(!user.data) {
                        setLoading(false);
                        setUser(null)
                        return setIsAuthenticate(false);
                    }else{
                        setIsAuthenticate(true)                        
                        setUser(user.data);
                        setLoading(false);
                    }                
                } catch (error) {
                    serErrors(error)
                    setIsAuthenticate(false)
                    setUser(null)
                    setLoading(false);
                    return
                }
            }
        }
        checkLogin();
    }, []);

    return (        
        <AuthContext.Provider value={{
            singUp,
            singIn,
            logout,
            user,            
            isAuthenticate,
            errors,
            loading,
        }} >
            {children}
        </AuthContext.Provider>

    )
}