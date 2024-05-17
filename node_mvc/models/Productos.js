
//modelo productos
const mongoose = require('mongoose');

//configurar los tipos de datos de productos
const ProductosSchema = new mongoose.Schema({
    Titulo:{
        type:String,
        require:'Ingrese un titulo'
    },
    Precio:{
        type:mongoose.Decimal128,
        require:'Ingrese un precio'
    },
    Cantidad:{
        type:Number
    },
    Imagen:{
        type:String
    }
})

module.exports = mongoose.model('productos',ProductosSchema);