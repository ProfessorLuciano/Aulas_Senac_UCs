import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Inicio from '../Inicio'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Inicio />} />
                <Route path='*' element={ <Inicio /> } />
            </Routes>
        </BrowserRouter>
    )
}