import axios from "axios"

export const signup = async (email, password) => {
    const responseFromServer = await axios.post('http://localhost:3001/auth/signup', { email, password })
    console.log(responseFromServer)
    return responseFromServer
}

export const signin = async (email, password) => {
    const responseFromServer = await axios.post('http://localhost:3001/auth/signin', { email, password })
    console.log(responseFromServer)
    return responseFromServer
}

export const getLogin = async (token) => {
    console.log('token from axios file', token)
    const responseFromServer = await axios.get('http://localhost:3001/auth/current-user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log('get login', responseFromServer.data.email)
    return responseFromServer.data.email
}