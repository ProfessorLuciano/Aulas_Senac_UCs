import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contexts } from '../Contexts/Contexts'

export default function DashBoard() {

    const { verificaToken, autenticado } = useContext(Contexts)
    const navigation = useNavigate()
    const [usuario, setUsuario] = useState('')

    useEffect(() => {
        verificaToken()
        const iToken = localStorage.getItem('@tklogin24')
        if (!iToken) {
            return
        }
        const { nome } = JSON.parse(iToken)
        setUsuario(nome)
    }, [])

    function handleSair() {
        localStorage.removeItem('@tklogin24')
        verificaToken()
    }

    return (
        <>
            {
                autenticado === false
                    ?
                    navigation('/')
                    :
                    <div>
                        <h1>DashBoard</h1>
                        <h1>Seja Bem Vindo - {usuario}</h1>
                        <button onClick={() => navigation('/Produtos')}>Produtos</button>
                        <button onClick={handleSair}>Sair</button>
                    </div>
            }
        </>
    )
}