
const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const usuario = mongoose.model('usuarios');

exports.autenticarUsuario = passport.authenticate('local', ({
    successRedirect: '/', 
    failureRedirect: '/login',
    failureFlash:true,
    badRequestMessage: 'Ambos campos son obligatorios'
}));


//verificar
exports.usuarioAutenticado = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    //sino esta verificado el usuario
    return res.redirect('/login');
}

//cerrar sesion
exports.cerrarSesion = (req,res,next) => {
    req.logout((function(err){
        if(err){
            return next(err);
        }
    }))
    req.flash('Correcto', 'Sesion finalizada');
    res.redirect('/Login');
    next();
}

//form restablecer contraseña
exports.formRestablecer = (req,res) =>{
    res.render('Contraseña');
}

//Enviar token contraseña
exports.EnviarToken = async (req,res,next)=>{
    const Email = req.body.Email;
    const Usuario = await usuario.findOne({Email})

    //En caso usuario no exista
if(!Usuario){
    req.flash('error', 'Usuario no encontrado');
    return res.redirect('/login');
}

    //en caso que exista, generar token
    Usuario.Token = crypto.randomBytes(20).toString('hex');
    Usuario.expira = Date.now() + 3600000;

    //guardar en la DB
    await Usuario.save();

    const ResetUrl = `http://${req.headers.host}/restablecer/${Usuario.Token}`;
    console.log(ResetUrl);
   
    //
    req.flash('Success', 'Revise su email');
    res.redirect('/Login');
}

exports.ValidarToken = async (req,res) =>{
    const Token = req.params.Token;
    const Usuario = await usuario.findOne({Token});

    //sino existe Usuario
    if(!Usuario){
        req.flash('error', 'No valido');
        res.redirect('/restablecer');
    }

     //Formulario generar contraseña
     res.render('reset-contraseña', {Token: Token});
}

exports.ActualizarPassword = async (req, res) => {
    try {
        // Verificar token según fecha de expiración
        const Usuario = await usuario.findOne({
            Token:req.params.Token,
            expira:{ $gt: Date.now() }
        });

        // Verificar existencia de usuario y asignación de contraseña
        if (!Usuario) {
            req.flash('error', 'Token no válido o expirado');
            return res.redirect('/restablecer');
        }

        // Asignar nueva contraseña
        Usuario.Token = null
        Usuario.expira = null
        Usuario.Contraseña = req.body.Contraseña

        // Guardar usuario en la base de datos
        await Usuario.save();

        req.flash('success', 'La contraseña se ha restablecido correctamente');
        return res.redirect('/login');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Ocurrió un error al restablecer la contraseña');
        res.redirect('/restablecer');
    }
};

