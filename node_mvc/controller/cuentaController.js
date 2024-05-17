const usuarios = require('../models/Usuarios');
const Direcciones = require('../models/Direcciones');
//Muestra los datos de cuenta.pug
exports.MiCuenta = async (req, res, next) =>{
    res.render('Cuenta')
}

//Muestra los datos de la vista datos.pug
exports.formEditarDatos = async (req, res, next) =>{
    const usuario = await usuarios.findOne({_id:req.user._id});
    res.render('Datos'),{
        usuario
    };
}

//Permite editar los datos de cuenta
exports.EditarDatos = async (req, res, next) =>{
    const datosUsuario = req.body
    const usuario = await usuarios.findOneAndUpdate({_id:req.user._id},
    datosUsuario,{
        new:true,
        runValidators:true
    });
    //mostrar los datos actualizados
    req.user.Nombre = req.body.Nombre
    req.user.Email = req.body.Email
    //indica que se guardo la informacion
    req.flash('correcto', 'cambios realizados');
    res.redirect('/logueado');
    
}



//muestra la info de direcciones
exports.Direcciones = async (req, res) => {
    try {
        
        const usuarioId = req.user._id; 

        
        const direcciones = await Direcciones.find({ UsuarioId: usuarioId });

        res.render('Direcciones', { direcciones });
    } catch (error) {
        console.error('Error al obtener direcciones:', error);
        res.status(500).send('Error al obtener direcciones');
    }
};
