


import axios from 'axios'

// creacion de conexion con la api
const instance = axios.create({
    baseURL: 'http://localhost:3000/user',
    withCredentials: true
})

export default instance