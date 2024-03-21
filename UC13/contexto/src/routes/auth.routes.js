import { BrowserRouter, Route, Routes } from 'react-router-dom'

import DashBoard from '../Dashboard'
import Produtos from '../Produtos'


export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path='/Produtos' element={<Produtos />} />
                <Route path='*' element={<DashBoard />} />
            </Routes>
        </BrowserRouter>
    )
}
