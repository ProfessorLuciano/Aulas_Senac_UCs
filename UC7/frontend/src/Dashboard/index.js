import React, { useContext, useEffect, useState } from 'react'
import { AuthContexts } from '../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import { toast } from 'react-toastify'
import './estilo.dashboard.scss'


export default function Dashboard() {

    const navigation = useNavigate()
    const { verificaToken, token } = useContext(AuthContexts)
    verificaToken()

    const [pedidos, setPedidos] = useState([''])
    const [dadosPedidos, setDadosPedidos] = useState(false)

    useEffect(() => {
        async function lerPedidos() {
            const resposta = await apiLocal.get('/ListarPedidos', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setPedidos(resposta.data)
            setDadosPedidos(true)
        }
        lerPedidos()
    }, [pedidos])

    async function handleAceitar(id) {
        try {
            const status = 'Confirmado'
            const aceito = true
            await apiLocal.put('/AceitarPedidos', {
                id,
                status,
                aceito
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            toast.success('Pedido Aceito', {
                toastId: 'toastId'
            })
        } catch (err) {

        }
    }

    function handleSair() {
        localStorage.removeItem('@tklogin24')
        navigation('/')
    }



    return (
        <div className='containerDashboard'>
            <h1>Dashboard</h1>
            <div className='containerLinks'>
                <Link to=''>Fechar Pedido</Link>
                <Link to='/Produtos'>Cadastrar Produtos</Link>
                <Link to='/Pedidos'>Realizar Pedidos</Link>
                <button onClick={handleSair}>Sair</button>
            </div>
            <div className='aguardandoAprovacao'>
                <div >
                    <h2>Pedidos Aguardando Aprovação</h2>
                    <table className='pedidosTabela'>
                        <thead>
                            <tr key="">
                                <th>Numero Pedido</th>
                                <th>Nome Cliente</th>
                                <th>Status Pedido</th>
                                <th>Aceitar</th>
                            </tr>
                            {dadosPedidos === true && (
                                <>
                                    {pedidos.map((item) => {
                                        return (
                                            <>
                                                <tr key="">
                                                    {item.aceito === false && item.draft === false && item.entrega === false && (
                                                        <>
                                                            <td>{item.n_pedido}</td>
                                                            <td>{item.clientes.nome}</td>
                                                            <td>{item.status}</td>
                                                            <td><Link onClick={() => handleAceitar(item.id)}>Clique Para Aceitar</Link></td>
                                                        </>
                                                    )}
                                                </tr>
                                            </>
                                        )
                                    })
                                    }
                                </>
                            )}
                        </thead>
                    </table>
                </div>
                <div>
                    <h2 className='h2Aprovados'>Pedidos Aprovados</h2>
                    <table className='pedidosTabelaAprovados'>
                        <thead>
                            <tr key="">
                                <th>Numero Pedido</th>
                                <th>Nome Cliente</th>
                                <th>Status Pedido</th>
                                <th>Situação</th>
                            </tr>
                            {dadosPedidos === true && (
                                <>
                                    {pedidos.map((item) => {
                                        return (
                                            <>
                                                <tr key="">
                                                    {item.aceito === true && item.draft === false && item.entrega === false && (
                                                        <>
                                                        <td>{item.n_pedido}</td>
                                                        <td>{item.clientes.nome}</td>
                                                        <td>{item.status}</td>
                                                        <td>Aceito</td>
                                                        </>
                                                    )}

                                                </tr>
                                            </>
                                        )
                                    })}
                                </>
                            )}
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}