//funcionalidad del login
const passport = require('passport');
const localStrategy = require('passport-local');
const mongoose = require('mongoose');
const usuario = mongoose.model('usuarios')

passport.use(new localStrategy({
    usernameField:'Email',
    passwordField:'Contraseña'
}, async (Email,Contraseña,done)=>{
    try {
        //Usuario no existe
        const Usuario = await usuario.findOne({Email})
        if(!Usuario) return done(null, false,{
            message: 'Usuario no existe'
        });

        //Validar usuario
        const verificarContra = Usuario.compararContraseña(Contraseña);
        if(!verificarContra) return done(null, false,{
            message: 'Contraseña incorrecta'
        });

        //Datos de usuario correctos
        return done(null,Usuario);
    } catch (error) {
        //Usuario no existe
        return done(null,false,{
            message: 'Cuenta no existe'
        });
    }
} ));

    //serealizar usuario
    passport.serializeUser((Usuario,callback) =>{
        callback(null,Usuario);
    });

    //deserealizar usuario
    passport.deserializeUser((Usuario,callback) =>{
        callback(null,Usuario);
    });

module.exports = passport;