import { Route, Routes, BrowserRouter } from 'react-router-dom'


import Dashboard from '../Dashboard'
import Produtos from '../Produtos'
import Pedidos from '../Pedidos'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Dashboard /> } />
                <Route path='/Produtos' element={ <Produtos /> } />
                <Route path='/Pedidos' element={ <Pedidos /> } />
                <Route path='*' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}