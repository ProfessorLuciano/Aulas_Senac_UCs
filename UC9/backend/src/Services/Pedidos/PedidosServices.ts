import prismaClient from '../../prisma'

interface IdCliente {
    id_cliente: string
}
interface ListarProdutos {
    id: string
}
interface CriarItensPedido{
    quantidade: number
    valor: number
    id_pedido: string
    id_produto: string
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

    async criarItenspedido({quantidade, valor, id_pedido, id_produto}: CriarItensPedido){
        const produtoExiste = await prismaClient.itemPedido.findFirst({
            where:{
                AND: [
                    {
                        id_produto: id_produto
                    },
                    {
                        id_pedido: id_pedido
                    }
                ]
            }
        })

        if(produtoExiste){
            throw new Error('Produto já inserido no pedido')
        }


        const resposta = await prismaClient.itemPedido.create({
            data:{
                quantidade,
                id_pedido,
                valor,
                id_produto
            },
            include:{
                produtos: true
            }
        })
        return resposta
    }

    async somarItensPedido({id}: ListarProdutos){
        const resposta = await prismaClient.itemPedido.aggregate({
            _sum: {
                valor: true
            }, where:{
                id_pedido: id
            }
        })
        return (resposta._sum.valor)
    }

    async apagarItemPedido({id}: ListarProdutos){
        await prismaClient.itemPedido.delete({
            where:{
                id: id
            }
        })
        return {dados: 'Item Apagado com Sucesso'}

    }
}

export { PedidosServices }