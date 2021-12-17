const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index",{titulo:"mi titulo dinamico",
    tituloPagina:"Pagina de Inicio"})
})

router.get('/servicios',(req,res)=>{
    res.render("servicios",{tituloServicios: "Este es un mensaje dinamico servicios",
tituloPagina:"Pagina de servicios"})
})

module.exports = router;