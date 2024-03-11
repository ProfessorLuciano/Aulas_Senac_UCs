import { Request, Response } from 'express'
import { PedidosServices } from '../../Services/Pedidos/PedidosServices'


class PedidosController {
    async criarPedidos(req: Request, res: Response) {
        const { id_cliente } = req.body
        const criarPedidoServices = new PedidosServices()
        const resposta = await criarPedidoServices.criarPedido({
            id_cliente
        })
        return res.json(resposta)
    }

}

export { PedidosController }