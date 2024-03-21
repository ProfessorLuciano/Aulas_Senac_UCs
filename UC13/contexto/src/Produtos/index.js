import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contexts } from '../Contexts/Contexts'

export default function Produtos() {

    const navigation = useNavigate()
    const { verificaToken, autenticado } = useContext(Contexts)
    verificaToken()

    return (
        <>
            {
                autenticado === false
                    ?
                    navigation('/')
                    :
                    <div>
                        <h1>Tela de Produtos</h1>
                        <button onClick={() => navigation('/')}>DashBoard</button>
                    </div>
            }
        </>
    )
}