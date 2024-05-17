//Modelo de usuarios
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//configurar los tipos de datos de usuarios
const UsuariosSchema = new mongoose.Schema({
    Email: {
        type: String,
        unique: true,
        lowercase:true,
        trim:true
    },
    Nombre:{
        type:String,
        required: 'Ingrese el nombre',
    },
    Contraseña:{
        type:String,
        required:true,
        trim:true
    },
    Token:String,
    expira:Date,
    Imagen:String
},);

//Alerta al registrarse

UsuariosSchema.post('save', function(error,doc,next){
    if(error.code === 11000){
        next('El correo ya esta registrado');
    }else{
        next(error);
    }
})

//metodo encriptar contraseñas

UsuariosSchema.pre('save', async function(next){

    //si ya esta encriptado
    if(!this.isModified('Contraseña')){
        return next();
    }

    //si no esta encriptado
    const hash = await bcrypt.hash(this.Contraseña,12)
    this.Contraseña = hash;
    next();
})

//verificar usuario
UsuariosSchema.methods = {
    compararContraseña: function(Contraseña){
        return bcrypt.compareSync(Contraseña, this.Contraseña)
    }
};

module.exports = mongoose.model('usuarios', UsuariosSchema);