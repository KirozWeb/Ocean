const express = require('express')
const routes = express.Router()
const conexion = require('../conexion')
const session = require('express-session')
const fetch = require("node-fetch");


usua = [];
listausuarios = [];
listavehiculos = [];
listapasaportes = [];
listafilas = [];
pasaporte = [];
perfil = [];
let lobjeto;

routes.get('/login',(req,res)=>{
    res.render("formLogin")
})




routes.get('/registrarU',(req,res)=>{
    res.render("formRegistrarU")
})

routes.post('/comprobar',(req, res) => {
    usuario = []
    var contra = req.body;
    console.log(contra)
    conexion.query('SELECT * FROM Usuarios WHERE usuNom = ? AND usuClave = ?',[req.body.usuNom,req.body.usuClave],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            console.log(results.length)
            if(results.length> 0)
            {
                res.render("index",{titulo : "sus datos estan errados",
                datosUsuario : usuario})
            }
            else{
                conexion.query('INSERT INTO Usuarios SET ?',req.body,(error,rows)=>{
                    if (error){
                        return res.send(error);
                    } else {
                        res.render("index",{titulo : "registro fue comprobado y guardado con exito"})
                    }
                })
            }
        }
    })
    perfil = []
})



routes.post('/loguear',(req,res)=>{
    console.log("estoy en loguear")
    var contra = req.body;
    console.log("esto es body"+contra);
   usuario=[];

   conexion.query('SELECT * FROM Usuarios WHERE usuNom = ? AND usuClave = ?',[req.body.usuNom,req.body.usuClave],function(error,results,fields)
   {
       if(error){
           return res.send(error);
       }else
       {
                if(results.length>0)
                {
                    results.forEach(element =>{
                        perfil.push(element.usuPerfil)
                        usuario.push(element);
                    })
                    req.session.rol = perfil;
                    console.log("este es el rol " + req.session.rol);
                    if(perfil[0]==="administrador"){
                        res.render("dashboar",{titulo:"su perfil es administrador",
                        datosUsuario : usuario})
                    }
                    if(perfil[0]==="capitan"){
                        res.render("dashboar",{titulo:"su perfil es capitan",
                        datosUsuario : usuario})
                    }
                    if(perfil[0]==="recolector"){
                        res.render("dashboard",{titulo:"su perfil es recolector",
                        datosUsuario : usuario})
                    }
                    if(perfil[0]==="usuariofinal"){
                        res.render("menuppal",{titulo:"su perfil es usuario final",
                        datosUsuario : usuario})
                    }
                }
                else{
                    res.render("index",{titulo:"su contrasena o usuario esta errado",
                datosUsuario:usuario})
                }
       }

   })
   perfil=[];
})

routes.get('/registrarV',(req,res)=>{
    res.render("formRegistrarV")
})

routes.post('/comprobarV',(req, res) => {
    var contra = req.body;
    console.log(contra)
    conexion.query('SELECT * FROM Vehiculo WHERE vehMatricula = ?',[req.body.vehMatricula],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            console.log(results.length)
            if(results.length> 0)
            {
                res.render("index",{titulo : "Este vehiculo ya existe",
                datosUsuario : usuario})
            }
            else{
                conexion.query('INSERT INTO Vehiculo SET ?',req.body,(error,rows)=>{
                    if (error){
                        return res.send(error);
                    } else {
                        res.render("menuppal",{titulo : "registro del vehiculo fue comprobado y guardado con exito"})
                    }
                })
            }
        }
    })

})

routes.get('/consulta_usuarios', (req, res) => {

    console.log("estoy en consulta usuarios")

    conexion.query('SELECT * from Usuarios', function(error,results,fields) {
        if(error)
            throw error;

            results.forEach(element => {

            listausuarios.push(element);
            });

    });
    res.render("listadoU",{
        listadoUsuarios: listausuarios
   })
   listausuarios = [];
})

routes.get('/buscar_usuario/:id',(req, res) => {
    console.log("estoy en buscar_usuario")
    let id = req.params.id;
    console.log(id)
    listausuarios = [];
    conexion.query('SELECT * FROM Usuarios WHERE usuId = ?',[id],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            results.forEach(element => {
                listausuarios.push(element);
                });

            res.render("editar_usuario",{
                listadoUsuarios: listausuarios})
            }

    })
})

routes.post('/actualizar_usuario',(req, res) => {
    usua = []
    usua.push(req.body)
    console.log("esto es el usuid"+req.body.usuId)
    conexion.query('UPDATE Usuarios SET ? WHERE usuId = ?',[req.body,req.body.usuId],function(error,results,fields){
        if (error){
            console.log("hasta aqui llego")
            return res.send(error);
        } else {
            console.log("estoy en actualizar user "+req.session.rol)
            let rol = req.session.rol;
            if(rol[0] === "administrador"){
                res.send('<script>window.location.href="/fragileocean/consulta_usuarios";</script>');
            }
            else{
                res.render("index",{titulo : "sus datos se han actualizado",
                listadoUsuarios: listausuarios})

            }
            }
    })
})

routes.get('/borrar_usuario/:id',(req, res) => {
    console.log("estoy en borrar un usuario")
    let id = req.params.id
    console.log(id)
    user = []
    conexion.query('DELETE FROM Usuarios WHERE usuId = ?', [id],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            console.log("este es req rol"+req.session.rol)
            let rol = req.session.rol;
            console.log(rol);
            if(rol[0] === "administrador"){
                res.send('<script>window.location.href="/fragileocean/consulta_usuarios";</script>');
            }
            else{
                usuario = []
                res.render("index",{titulo : "sus datos se han actualizado",
                listadoUsuarios: listausuarios})

            }

            }

    })
})

routes.get('/consulta_vehiculos', (req, res) => {

    console.log("estoy en consulta vehiculos")

    conexion.query('SELECT * from Vehiculo', function(error,results,fields) {
        if(error)
            throw error;

            results.forEach(element => {

            listavehiculos.push(element);
            });

    });
    res.render("listadoV",{
        listadoVehiculos:listavehiculos
   })
   listavehiculos = [];
})

routes.get('/buscar_vehiculo/:id',(req, res) => {
    console.log("estoy en buscar_vehiculo")
    let id = req.params.id;
    console.log(id)
    listavehiculos = [];
    conexion.query('SELECT * FROM Vehiculo WHERE vehId = ?',[id],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            results.forEach(element => {
                listavehiculos.push(element);
                });

            res.render("editar_vehiculo",{
                listadoVehiculos: listavehiculos})
            }

    })
})

routes.post('/actualizar_vehiculo',(req, res) => {
    usua = []
    usua.push(req.body)
    console.log("esto es el vehid"+req.body.vehId)
    conexion.query('UPDATE Vehiculo SET ? WHERE vehId = ?',[req.body,req.body.vehId],function(error,results,fields){
        if (error){
            console.log("hasta aqui llego")
            return res.send(error);
        } else {
            console.log("estoy en actualizar user "+req.session.rol)
            let rol = req.session.rol;
            if(rol[0] === "administrador"){
                res.send('<script>window.location.href="/fragileocean/consulta_vehiculos";</script>');
            }
            else{
                res.render("index",{titulo : "sus datos se han actualizado",
                listadoVehiculos: listavehiculos})

            }
            }
    })
})

routes.get('/borrar_vehiculo/:id',(req, res) => {
    console.log("estoy en borrar un vehiculo")
    let id = req.params.id
    console.log(id)
    user = []
    conexion.query('DELETE FROM Vehiculo WHERE vehId = ?', [id],function(error,results,fields){
        if (error){
            return res.send(error);
        } else {
            console.log("este es req rol"+req.session.rol)
            let rol = req.session.rol;
            console.log(rol);
            if(rol[0] === "administrador"){
                res.send('<script>window.location.href="/fragileocean/consulta_vehiculos";</script>');
            }
            else{
                usuario = []
                res.render("index",{titulo : "sus datos se han actualizado",
                listadoVehiculos: listausuarios})

            }

            }

    })
})

routes.get('/registrarP',(req,res)=>{
    res.render("formRegistrarP")
})


routes.post('/crear_pasaporte',(req, res) => {
    pasaporte = [];
    pasaporte.push(req.body);
    vehiculorecolector = [];

    otro = [];
    console.log("este es pasaporte");
    console.log(pasaporte);
    //usua.push(req.body)
    //console.log("esto es el usuid"+pasaporte)
    conexion.query('SELECT * FROM FilaRecolectores LIMIT 1',function(error,results,fields){
        if (error){
            console.log("hasta aqui llego en filarecolectores")
            return res.send(error);
        }
        else
        {
                    let cadena = JSON.stringify(results)
                    console.log(cadena)
                       lobjeto=JSON.parse(cadena);
                    //objeto.push(lobjeto);
                    console.log(lobjeto[0]);

                    console.log(lobjeto[0]['filaId']);


                    conexion.query('DELETE FROM FilaRecolectores WHERE filaId = ?',[lobjeto[0]['filaId']],function(error,results,fields){
                        if (error){
                            return res.send(error);
                        } else {
                             console.log("elemento de la Filarecolector borrado");
                            }

                    })

           conexion.query("INSERT INTO FilaRecolectores (vehMatricula,vehNombre,vehCapacidad) VALUES (?,?,?)",[lobjeto[0]['vehMatricula'],lobjeto[0]['vehNombre'],lobjeto[0]['vehCapacidad']],function(error,results,fields){
            if (error){
                return res.send(error);
            } else {
                  console.log("elemento de fila insertado al final de la tabla");
                 }

          })
          console.log("pesoCarga")
          console.log(req.body.pesoCarga);
          let reciclajeporcarga = (req.body.pesoCarga*2)/100;
          console.log("este es reciclajeporcarga")
          console.log(reciclajeporcarga);
          let reciclajefaltante = reciclajeporcarga - req.body.reciclajePropio;
          console.log("este es reciclafaltante")
          console.log(reciclajefaltante);
          let valortotalreciclaje = reciclajefaltante * 300000;
          console.log("este es valortotaldelreciclaje")
          console.log(valortotalreciclaje)
          console.log("esta es la matricula del barco recolector")
          console.log(lobjeto[0]["vehMatricula"])
          req.body.reciclajeCarga = reciclajeporcarga;
          req.body.vehMatricularec = lobjeto[0]["vehMatricula"];
          req.body.reciclajeFaltante = reciclajefaltante;
          req.body.valorTotalreciclaje = valortotalreciclaje;

          console.log(req.body);


          conexion.query('INSERT INTO Pasaporte SET ?',[req.body],function(error,results,fields){
            if (error){
                return res.send(error);
            } else {
                  console.log("elemento de fila insertado en registro pasaporte");
                }

        })


    }

})


})

routes.get('/consulta_pasaportes', (req, res) => {

    console.log("estoy en consulta pasaportes")

    conexion.query('SELECT * from Pasaporte', function(error,results,fields) {
        if(error)
            throw error;

            results.forEach(element => {

            listapasaportes.push(element);
            });

    });
    res.render("listadoP",{
        listadoPasaportes: listapasaportes
   })
   listapasaportes = [];
})




routes.get('/consulta_turnos', (req, res) => {

        console.log("estoy en consulta turnos")

    conexion.query('SELECT * from FilaRecolectores', function(error,results,fields) {
        if(error)
            throw error;

            results.forEach(element => {

            listafilas.push(element);
            });

    });
    res.render("listadoF",{
        listadoFilas: listafilas
   })
   listafilas = [];
})


module.exports = routes;