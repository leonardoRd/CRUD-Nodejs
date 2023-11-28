import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";

function NavbarOne() {
    const {isAuthenticate, user} = useAuth();         
    const [showOptions, setShowOptions] = useState(false);

    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
    };
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">            
            <Link to={isAuthenticate ? "/tasks" : "/"}>
                <h1 className="text-white text-2xl font-bold rounded-md ">                
                    Tasks Manager                
                </h1>
            </Link>
            <ul className="flex gap-x-2">
                {isAuthenticate ? (
                    <>
                        <li className="font-bold px-2 py-2">
                            Welcome {user.username}
                        </li>
                        <li className="rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">                            
                            <Link to='/add-task'>Add Tasks</Link>
                        </li>
                        <li className={`relative block rounded-md bg-zinc-600 px-3 py-2 hover:bg-zinc-500 ${showOptions ? 'active' : ''}`}>
                            <div onMouseEnter={handleToggleOptions} >
                                <Link to='/invoices'>Invoices</Link>
                            </div>
                            {showOptions && (
                                <ul className="absolute left-0 mt-2 space-y-2 ">                                
                                    <li className="block px-4 rounded-md bg-zinc-600 py-2 w-40 hover:bg-zinc-500">                            
                                        <Link to='/add-invoice'>Add Invoice</Link>
                                    </li>
                                    <li className="block px-4 rounded-md bg-zinc-600 py-2 w-40 hover:bg-zinc-500"                                     
                                     
                                     >                            
                                        <Link to='/tiposComprob'>TipoComprobante</Link>
                                    </li>
                                    <li className="block px-4 rounded-md bg-zinc-600 py-2 w-40 hover:bg-zinc-500"                                     
                                     onMouseLeave={handleToggleOptions}
                                     >                            
                                        <Link to='/add-tipoComprob'>Agregar TipoComprobante</Link>
                                    </li>                                                                        
                                </ul>
                            )}                            
                        </li>
                        
                        <li className="rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">
                            <Link to='/logout'>Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="font-bold rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">
                            <Link to='/login'>Login</Link>
                        </li>
                        <li className="font-bold rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">
                            <Link to='/register'>Register</Link>
                        </li>
                    </>
                )
                }
                
            </ul>
        </nav>
    );
}

export default NavbarOne;