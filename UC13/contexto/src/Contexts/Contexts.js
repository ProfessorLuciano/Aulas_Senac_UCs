import { createContext, useState, useEffect } from 'react'
import apiLocal from '../Api/apiLocal'
import { toast } from 'react-toastify'

export const Contexts = createContext()

export default function AuthProvider({ children }) {

    const [token, setToken] = useState(false)

    const autenticado = !!token

    async function verificaToken() {
        const iToken = localStorage.getItem('@tklogin24')
        if (!iToken) {
            setToken(false)
            return
        }
        const { token } = JSON.parse(iToken)
       
            const resposta = await apiLocal('/ListarUsuarioToken', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            //console.log(resposta.data.id)
            if (resposta.data.id) {
                setToken(true)
            } else {
                setToken(false)
            }
       
    }
    
    async function handleLogar(email, password) {
        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email,
                password
            })
            //console.log(resposta.data)
            const data = resposta.data
            localStorage.setItem('@tklogin24', JSON.stringify(data))
            setToken(true)
        } catch (err) {
            //console.log(err.response.data.error)
            toast.error(err.response.data.error, {
                toastId: 'toastId'
            })
        }
    }

    return (
        <Contexts.Provider value={{ handleLogar, autenticado, verificaToken }} >
            {children}
        </Contexts.Provider>
    )
}