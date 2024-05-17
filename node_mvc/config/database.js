const mongoose = require('mongoose');

// Conexion a MongoDB
mongoose.connect('mongodb+srv://memsito2003:Pitochu.88@tienda.5q2evxb.mongodb.net/Tienda');

//verificar conexion
mongoose.connection.on('connected', () => {
    console.log('Conexión exitosa a MongoDB Atlas');
});

// errores en la conexión
mongoose.connection.on('error', (error) => {
    console.error('Error de conexión a MongoDB:', error);
});


//importar los modelos
require('../models/Usuarios');
require('../models/Productos');
require('../models/Direcciones');