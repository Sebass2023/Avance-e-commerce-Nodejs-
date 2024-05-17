//mandamos el login desde el controlador
const mongoose = require('mongoose');
const usuario = mongoose.model('usuarios');

//exportamos el controlador de registro
exports.formRegister = (req, res)=>{
    res.render('Register', { messages: req.flash('error') });
};
/* validar registro para evitar fallos de seguridad
y cambiar simbolos*/
exports.validarRegistro = (req,res,next)=>{
    req.sanitizeBody('Email').escape()
    req.sanitizeBody('Nombre').escape()
    req.sanitizeBody('Contraseña').escape()

    //los campos no deben estar vacios
    req.checkBody('Email', 'El correo es obligatorio').notEmpty();
    req.checkBody('Nombre', 'El nombre es obligatorio').notEmpty();
    req.checkBody('Contraseña', 'La contraseña es obligatoria').notEmpty();

    //almacenar los errores
    const errores = req.validationErrors();

    if (errores) {
        req.flash('error', errores.map(error => error.msg));
        res.redirect('/register');
    } else {
        next();
    }
    return;
}


exports.CrearUsuario = async (req,res,next)=>{
    const Usuario = new usuario(req.body);
    try{
        await Usuario.save();
        console.log('Usuario guardado', Usuario);
        res.redirect('/login');
    } catch (error){
        console.error('error', error);
        req.flash('error', error)
        res.redirect('/register');
    }
    
}

//exportamos el controlador de login
exports.formLogin = (req, res)=>{
    res.render('Login');
}
