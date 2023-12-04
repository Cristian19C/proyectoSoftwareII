import {useForm} from 'react-hook-form'
import {useUser} from '../context/UserContext'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage(){

    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signin, errors: signinErrors, isAuthenticated} = useUser()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(data => {
        signin(data)
    })

    useEffect(() => {
        if(isAuthenticated) navigate('/prueba')
    }, [isAuthenticated])


    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 1ounded-md'>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold my-2'>Login</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register("email", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='email'/>
                    {
                        errors.email && (<p className='text-red-500'>Email is required</p>)
                    }

                    <input type="password" {...register("password", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='password'/>
                    {
                        errors.password && (<p className='text-red-500'>Password is required</p>)
                    }

                    <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2' type='submit'>
                        Login
                    </button>
                </form>

                <p className='flex gap-x-2 justify-between'>
                    No tienes una cuenta? <Link to="/register" className='text-sky-500'>Registrate</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage