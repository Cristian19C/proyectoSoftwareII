import axios from './axios'

export const registerUserRequest = user => axios.post(`/registerUser`, user)

export const loginUserRequest = user => axios.post(`/login`, user)

export const verifyUserTokenRequest = () =>axios.get('/verify')