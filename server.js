const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// usuarios simulados
const usuarios = [
 {user:'admin', pass:'1234', nombre:'Carlos'},
 {user:'mchuyes', pass:'1234', nombre:'Marcos'}
];

let pedidos = [];

// LOGIN
app.post('/login',(req,res)=>{
 const {user,pass} = req.body;

 let u = usuarios.find(x=>x.user===user && x.pass===pass);

 if(!u) return res.status(401).json({error:'login incorrecto'});

 res.json({
 user:{
  user: u.user,
  nombre: u.nombre
 }
});res.json({user:u});
});

// CREAR PEDIDO
app.post('/pedido',(req,res)=>{
 let comprobante = 'BOL-'+Math.floor(Math.random()*99999);

 let pedido = {...req.body, comprobante};

 pedidos.push(pedido);

 res.json(pedido);
});

// LISTAR
app.get('/pedidos',(req,res)=>{
 res.json(pedidos);
});
app.post('/registro',(req,res)=>{
 usuarios.push(req.body);
 res.json({msg:'ok'});
});
app.listen(3000,()=>console.log('Servidor funcionando en 3000'));
