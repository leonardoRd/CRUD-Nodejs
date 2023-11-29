import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { singIn, isAuthenticate, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    singIn(data)
  })

  useEffect(() => {
    if (isAuthenticate) navigate('/tasks')
  }, [isAuthenticate])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {loginErrors.map((error, i) => (
          <div className="bg-red-500 text-white mb-2 rounded-md" key={i}>
            {error}
          </div>
        ))}
        <h3 className="text-center font-bold mb-2 text-2xl">Login</h3>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          />
          {errors.email && (
            <p className=" w-full text-red-500"> Email is required</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4"
          />
          {errors.password && (
            <p className="text-red-500"> Password is required</p>
          )}
          <button
            type="submit"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-4 hover:bg-zinc-500"
          >
            Login
          </button>
        </form>
        <p className="flex  gap-x-2 justify-between">
          No tienes una cuenta?{' '}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
