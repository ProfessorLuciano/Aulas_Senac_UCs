import { useState, useEffect, useContext } from 'react'
import { Contexts } from '../Contexts/Contexts'
import { toast } from 'react-toastify'
import './login.estilo.scss'

export default function Login() {

    const { handleLogar, verificaToken } = useContext(Contexts)

    //useEffect(() => {
    verificaToken()
    // }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e) {
        try {
            e.preventDefault()
            if (!email || !password) {
                toast.warn('Existem Campos em Branco', {
                    toastId: 'toastId'
                })
                return
            }
            await handleLogar(email, password)
        } catch (err) {
            //console.log(err)
        }

    }

    return (     
            <div className='conteinerLogin'>
                <div className='cabecalhoLogin'>
                    <h1>Login</h1>
                </div>
                <div className='formLogin'>
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder='Digite o Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder='Digite a Senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type='submit'>Enviar</button>
                    </form>
                </div>
            </div>
    )
}