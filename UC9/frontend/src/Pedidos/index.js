import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import apiLocal from '../API/apiLocal/api'

export default function Pedidos() {

    const [clientes, setClientes] = useState([''])
    const [idCliente, setIdCliente] = useState('')
    const [pedidos, setPedidos] = useState([''])
    const [categorias, setCategorias] = useState([''])
    const [categoriaId, setCategoriaId] = useState('')
    const [produtosCategoria, setProdutosCategoria] = useState([''])

    const [quantidade, setQuantidade] = useState('')
    const [idItemProduto, setIdItemProduto] = useState('')

    const [modalAberto, setModalAberto] = useState(false)

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
        async function listarClientes() {
            const resposta = await apiLocal.get('/ListarClientes', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setClientes(resposta.data)
        }
        listarClientes()
    }, [])

    useEffect(() => {
        try {
            if(!categoriaId){
                return
            }
            async function lerProdutosCategoria() {
                const resposta = await apiLocal.get(`/ListarProdutosCategoria/${categoriaId}`, {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setProdutosCategoria(resposta.data)
            }
            lerProdutosCategoria()
        } catch (err) {
            
        }
    }, [categoriaId])

    async function abrirModal() {
        try {
            const id_cliente = idCliente
            const resposta = await apiLocal.post('/CriarPedidos', {
                id_cliente
            }, {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setPedidos(resposta.data)
            if (resposta.data.id) {
                setModalAberto(true)
            }

            async function lerCategorias() {
                const resposta = await apiLocal.get('/ListarCategorias', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                setCategorias(resposta.data)
            }
            lerCategorias()
        } catch (err) {

        }
    }

    function fecharModal() {
        setModalAberto(false)
    }

    async function handleItemPedido(e) {
        e.preventDefault()
        const prodExt = produtosCategoria.filter((item) => item.id === idItemProduto)
        const valor = Number(prodExt.map((item) => item.preco))

        //console.log(quantidade, pedidos.id, valor * quantidade)
    }

    console.log(produtosCategoria)


    return (
        <div>
            <h1>Pedidos</h1>
            <select
                value={idCliente}
                onChange={(e) => setIdCliente(e.target.value)}
            >
                <option>Selecine o Cliente...</option>
                {clientes.map((item) => {
                    return (
                        <option value={item.id}>{item.nome}</option>
                    )
                })}
            </select>
            <button onClick={abrirModal}>Criar Pedidos</button>

            {pedidos.length !== 1 && (
                <Modal
                    isOpen={modalAberto}
                >
                    <h1>Ralizar Pedidos</h1>
                    <>
                        <h2>Cliente: {pedidos.clientes.nome}</h2>
                        <h2>Numero do Pedido: {pedidos.n_pedido}</h2>
                        <h1>Itens do Pedido</h1>                       
                            <form onSubmit={handleItemPedido}>
                                <select
                                    value={categoriaId}
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                >
                                    <option>Selecione a categoria</option>
                                    {categorias.map((item) => {
                                        return (
                                            <option value={item.id}>{item.nome}</option>
                                        )
                                    })}
                                </select>
                                <select
                                    value={idItemProduto}
                                    onChange={(e) => setIdItemProduto(e.target.value)}
                                >
                                    <option>Selecione a Produto</option>
                                    {produtosCategoria.map((item) => {
                                        return (
                                            <option value={item.id}>{item.nome}</option>
                                        )
                                    })}
                                </select>
                                <input
                                    type='number'
                                    placeholder='Quantidade'
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                />
                                <button type='submit'>Adicionar Produto</button>
                            </form>                        
                    </>
                    <button onClick={fecharModal}>Finalizar Pedidos</button>
                </Modal>
            )}

        </div>
    )
}