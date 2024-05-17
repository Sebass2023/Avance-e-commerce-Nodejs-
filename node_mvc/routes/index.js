//importar express
const express = require('express');
const router = express.Router();
const path = require('path');

//importar controladores
const homeController = require('../controller/homeController');
const usuariosController = require('../controller/usuariosController');
const authController = require('../controller/authController');
const tiendaController = require('../controller/tiendaController');
const cuentaController = require('../controller/cuentaController');
//funcion que exporte todas las rutas
module.exports = function(){

    // llamar la ruta home desde el controlador
    router.get('/', homeController.Home);

    //Seccion cuenta

    // RUTA - register
    router.get('/register', usuariosController.formRegister)
    router.post('/register', usuariosController.validarRegistro, usuariosController.CrearUsuario)

    //Cuenta logueada
    router.get('/logueado', cuentaController.MiCuenta)
    router.get('/datos', cuentaController.formEditarDatos)
    router.post('/datos', cuentaController.EditarDatos)

    //direcciones
    router.get('/direcciones', cuentaController.Direcciones)

    //RUTA - login
    router.get('/login', usuariosController.formLogin)
    router.post('/login', authController.autenticarUsuario)

    //RUTA - Cerrar sesion
    router.get('/cerrarSesion', authController.usuarioAutenticado, authController.cerrarSesion);

    //RUTA - restablecer contraseña
    router.get('/restablecer', authController.formRestablecer);

    //TOKEN CONTRASEÑA
    router.post('/restablecer', authController.EnviarToken);
    router.get('/restablecer-password/:Token', authController.ValidarToken);
    router.post('/restablecer-password/:Token', authController.ActualizarPassword);

    //RUTA tienda
    router.get('/tienda', authController.usuarioAutenticado, tiendaController.CrearTienda);
    router.get('/tienda/:url', tiendaController.ProductoUrl);
    router.use('/img', express.static(path.join(__dirname, 'public', 'img')));


    return router;
}