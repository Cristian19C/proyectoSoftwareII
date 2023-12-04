import { createContext, useState, useContext, useEffect } from "react";

import {registerUserRequest, loginUserRequest, verifyUserTokenRequest} from '../api/user'

import Cookies from 'js-cookie'

export const UserContext = createContext()

//creacion de la funcion para poder entrar al contexto o las funciones de autenticacion
export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUser debe utilizarse dentro de un Userprovider')
    }

    return context
}

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)


    //funcion para el registro de usuarios
    const signup = async (user) => {
        try {
            const res = await registerUserRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    //funciona para loguearse como cliente
    const signin = async (user) => {
        try{
            const res = await loginUserRequest(user)
            setIsAuthenticated(true)
            setUser(res.data)

        } catch (error) {
            if(Array.isArray(error.response.data)){
                setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }


    }

    //funcion para desloguearse
    const logout = () => {
        Cookies.remove('token')
        setIsAuthenticated(false)
        setUser(null)
    }

    //funcion paar quitar los mensajes de error, despues de cierto tiempo

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [errors])

    //funcion para realizar las verificaciones de seguridad respecto al manejo de tokens
    useEffect(() => {
        async function checklogin () {
            const cookies = Cookies.get()

            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyUserTokenRequest(cookies.token)
                if(!res.data){
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
                
            } catch (error) {
                
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }   
        
        checklogin()
    }, [])

    return (
        <UserContext.Provider
        value={{
            signup,
            signin,
            logout,
            user,
            loading,
            isAuthenticated,
            errors
            
        }}
        >
            {children}
        </UserContext.Provider>
    )
}
