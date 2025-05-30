const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
	res.render('index');
});
app.listen(port,()=>{
console.log(`Servidor iniciado http://localhost:${port}`);
	console.log("Creado por Julian Amer 30336715")
	console.log("Creado por Cristopher Gomez 28166561")
});

