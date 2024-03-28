import { useContext } from 'react'
import { AuthContexts } from '../Contexts/AuthContext'
import NoAuthRoutes from '../Routes/noAuth.routes'
import AuthRoutes from '../Routes/auth.routes'

export default function RotasIndex() {

    const { autenticado } = useContext(AuthContexts)
    
    return (
        autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
    )
}