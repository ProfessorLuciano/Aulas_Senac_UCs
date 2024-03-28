import React, { useState, useEffect, useContext } from 'react'
import { AuthContexts } from '../Contexts/AuthContext'
import apiLocal from '../API/apiLocal/api'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import './inicio.estilo.scss'

Modal.setAppElement('#root')

export default function Inicio() {

    const {handleLogar, verificaToken} = useContext(AuthContexts)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nome, setNome] = useState('')

    const [modalAberto, setModalAberto] = useState(false)
    verificaToken()
    async function handleLogin(e) {
        e.preventDefault()
        if (!email || !password) {
            toast.warn('Existem Campos em Branco')
        }
        await handleLogar(email, password)
    }

    async function handleCadastrar(e) {
        e.preventDefault()
        if (!nome || !email || !password) {
            toast.warn('Existem Campos em Branco')
        }
        try {
            await apiLocal.post('/CriarUsuarios', {
                nome,
                email,
                password
            })
            setModalAberto(false)

        } catch (err) {
            toast.error(err.response.data.error)
            return
        }
    }

    function abrirModal() {
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
    }

    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <button className='buttonAqui' onClick={abrirModal}>AQUI</button></p>
                <Modal
                    isOpen={modalAberto}
                    onRequestClose={fecharModal}
                >
                    <div className='formInicio'>
                        <h2>Cadastro de Usuário</h2>
                        <form onSubmit={handleCadastrar}>
                            <label>Nome:</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <label>Email:</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label>Senha:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type='submit'>Enviar</button>
                            <button onClick={fecharModal}>Fechar</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div >
    )
}