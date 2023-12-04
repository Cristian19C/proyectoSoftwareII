import {useForm} from 'react-hook-form'
import { useUser } from '../context/UserContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signup, isAuthenticated, errors: registersErrors} = useUser();
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isAuthenticated) navigate('/prueba')
    }, [isAuthenticated])

    const onSubmit = handleSubmit( async(values) =>{
        signup(values);
    })



    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
           
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    registersErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                    <h1 className='text-3xl font-bold my-2'>Registrate</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("name", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre'/>
                    {
                        errors.name && (<p className='text-red-500'>El nombre es requerido</p>)
                    }

                    <input type="text" {...register("lastname", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Apellido'/>
                    {
                        errors.lastname && (<p className='text-red-500'>El apellido es requerido</p>)
                    }

                    <input type="number" {...register("phone", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Telefono'/>
                    {
                        errors.phone && (<p className='text-red-500'>El telefono es requerido</p>)
                    }

                    <input type="email" {...register("email", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Correo'/>
                    {
                        errors.email && (<p className='text-red-500'>El correo es requerido</p>)
                    }

                    <input type="password" {...register("password", {required: true})} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña'/>
                    {
                        errors.password && (<p className='text-red-500'>Password is required</p>)
                    }

                    <button className='bg-sky-500 text-white px-4 py-2 rounded-md my-2' type='submit'>
                        Registrarse
                    </button>
                </form>

                <p className='flex gap-x-2 justify-between'>
                    ¿Ya tienes una cuenta?
                    <Link to="/login" className='text-sky-500'>Login</Link>
                </p>



            </div>
        </div>
    )
}

export default RegisterPage