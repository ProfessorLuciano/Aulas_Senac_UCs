import { useContext } from 'react'
import { Contexts } from '../Contexts/Contexts'
import NoAuthRoutes from '../routes/noAuth.routes'
import AuthRoutes from '../routes/auth.routes'

export default function RotasIndex() {

    const { autenticado } = useContext(Contexts)
    
    return (
        autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
    )
}