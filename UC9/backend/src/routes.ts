import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

import { LoginController } from './Controller/Login/LoginController'
import { CriarusuariosController } from './Controller/Usuarios/CriarUsuariosController'
import { ListarUsuarioTokenController } from './Controller/Usuarios/listarUsuarioTokenController'

import { CriarProdutosController } from './Controller/Produtos/CriarProdutosController'

import { CriarCategoriasController } from './Controller/Categorias/CriarCategoriasController'
import { ListarCategoriasController } from './Controller/Categorias/ListarCategoriasController'

import { isAutenticado } from './middleware/isAutenticado'
const router = Router()
const upload = multer(uploadConfig.upload('./tmp'))


//Rotas de Logins
router.post('/LoginUsuarios', new LoginController().handle)

//Estrutura de Usuários
router.post('/CriarUsuarios', new CriarusuariosController().handle)
router.get('/ListarUsuarioToken', isAutenticado, new ListarUsuarioTokenController().handle)

//Estrutura de Produtos
router.post('/CriarProdutos', isAutenticado, upload.single('file'), new CriarProdutosController().handle)


//Estrutura de Categorias
router.post('/CriarCategorias', isAutenticado, new CriarCategoriasController().handle)
router.get('/ListarCategorias', isAutenticado, new ListarCategoriasController().handle)


export { router }