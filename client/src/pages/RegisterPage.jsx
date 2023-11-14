import {useForm} from 'react-hook-form'
import { useAuth } from "../context/authContext";
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const {register, handleSubmit, formState: { errors } } = useForm();    
    const { singUp, user, isAuthenticate, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        if(isAuthenticate) navigate('/tasks')
    }, [isAuthenticate])
    
    const onSubmit = handleSubmit( async (values) => {        
        singUp(values)
    }); 

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                registerErrors.map((error, i) => (
                    <div className='bg-red-500 text-white mb-2 rounded-md' key={i}>
                        {error}
                    </div>
                ))                                
            }            
            <form onSubmit={onSubmit}>
                <input type="text" name='username' placeholder='Username' {...register("username", {required: true} )}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                />
                {
                    errors.username && <p className='text-red-500'> Username is required</p>
                }
                <input type="email" name='email' placeholder='Email' {...register("email", {required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                />
                {
                    errors.email && <p className='text-red-500'> Email is required</p>
                }
                <input type="password" name='password' placeholder='Password' {...register("password", {required: true })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4'
                />
                {
                    errors.password && <p className='text-red-500'> Password is required</p>
                }
                <button type="submit" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500'>
                    Register
                </button>
            </form>
            <p className='flex  gap-x-2 justify-between'>
                Ya tienes una cuenta? <Link to="/login" className='text-sky-500'>Sign in</Link>
            </p>
        </div>
    )
}

export default RegisterPage;