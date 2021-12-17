const express = require('express');

const bodyParser = require('body-parser')
const app = express();


require('dotenv').config();
const Rutas = require('./router/RutasWeb')
const consultasBd = require("./router/consultasmysql");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));


app.set('view engine','ejs');
app.set ('views',__dirname + '/views');



//esto es un middleware
app.use(express.static(__dirname + "/public"))


//Rutas Web
app.use('/', Rutas);
app.use('/fragileocean',consultasBd);

app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo:"404",
        tituloPagina:"Pagina 404",
        descripcion:"Error 404"
    })
})

app.listen(port,()=>{
    console.log('servidor a su servicio en el puerto',port)
})