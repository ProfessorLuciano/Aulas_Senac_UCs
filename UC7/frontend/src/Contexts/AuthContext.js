import { createContext, useState, useEffect } from 'react'
import apiLocal from '../API/apiLocal/api'
import { toast } from 'react-toastify'

export const AuthContexts = createContext()

export default function AuthProvider({ children }) {

    const [tokenT, setTokenT] = useState(false)
    const [token, setToken] = useState('')
    

    const autenticado = !!tokenT

    async function verificaToken() {
        const iToken = localStorage.getItem('@tklogin24')
        if (!iToken) {
            setTokenT(false)
            return
        }
        const { token } = JSON.parse(iToken)
        setToken(token)
       
            const resposta = await apiLocal('/ListarUsuarioToken', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            //console.log(resposta.data.id)
            if (resposta.data.id) {
                setTokenT(true)
            } else {
                setTokenT(false)
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
            setTokenT(true)
        } catch (err) {
            //console.log(err.response.data.error)
            toast.error(err.response.data.error, {
                toastId: 'toastId'
            })
        }
    }

    return (
        <AuthContexts.Provider value={{ handleLogar, autenticado, verificaToken, token }} >
            {children}
        </AuthContexts.Provider>
    )
}