const productos = require('../models/Productos');

//muestra los productos
exports.CrearTienda = async (req,res, next) =>{

    const Productos = await productos.find();

    if(!Productos) return next();
        
    res.render('Tienda',{
        Productos
    })
        
}


exports.ProductoUrl = async (req,res, next) =>{

    try {
        // Intenta encontrar el producto
        const Producto = await productos.findOne({ Imagen: req.params.url });
        
        // Verifica 
        if (!Producto) {
            console.log('No se encontró ningún producto', req.params.Url);
            return next(); 
        }

        //se encontró el producto
        console.log('encontrado:', Producto);
        res.render('Producto', { Producto });
    } catch (error) {
        console.error('Error producto:', error);
        next(error); 
    }
    
    
}

