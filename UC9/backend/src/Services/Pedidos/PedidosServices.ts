import prismaClient from '../../prisma'

interface IdCliente {
    id_cliente: string
}
interface ListarProdutos {
    id: string
}

class PedidosServices {
    async criarPedido({ id_cliente }: IdCliente) {
        const resposta = await prismaClient.pedido.create({
            data: {
                id_cliente
            },
            include: {
                clientes: true
            }
        })
        return resposta
    }
    async listarProdutosCategoria({ id }: ListarProdutos) {
        const resposta = await prismaClient.produto.findMany({
            where: {
                categoriaId: id
            }
        })
        return resposta
    }
}

export { PedidosServices }