import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function NavbarOne() {
    const {isAuthenticate, user} = useAuth();         

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">            
            <Link to={isAuthenticate ? "/tasks" : "/"}>
                <h1 className="text-white text-2xl font-bold">                
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
                        <li className="rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">                            
                            <Link to='/invoices'>Invoices</Link>
                        </li>
                        <li className="rounded-md bg-zinc-600 px-2 py-2 hover:bg-zinc-500">                            
                            <Link to='/add-invoice'>Add Invoice</Link>
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