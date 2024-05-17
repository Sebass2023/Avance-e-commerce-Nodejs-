const mongoose = require('mongoose');

const DireccionSchema = new mongoose.Schema({
    Nombre:{
        type:String,
        //para que no entre vacia la info
        required:true
    },
    Apellido:{
        type:String,
        required:true
    },
    Telefono:{
        type:Number,
        required:true
    },
    Direccion:{
        type:String,
        required:true
    },
    Ciudad:{
        type:String,
        required:true
    },
    CodigoPostal:{
        type:String,
        required:true
    },
    //el id del usuario que inicia sesion
    UsuarioId:{
        type:String
    }
})

module.exports = mongoose.model('direcciones', DireccionSchema);