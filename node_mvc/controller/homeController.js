//mandamos el home desde el controlador
exports.Home = (req, res)=>{
    res.render('Home', {
        Pagina: 'Index',
        Header: 'ContenedorHeader'

    })       
};