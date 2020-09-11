const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuario');
const tareaRoutes = require('./routes/tarea');
const proyectoRoutes = require('./routes/proyecto');

const app = express();

mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser:true,
        useCreateIndex:true
    })
    .then(() => console.log('Conexion a la BD realizada con exito!!!'))
    .catch(error => {
        console.log(error);
        process.exit(1);    
    });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use('/api',authRoutes);
app.use('/api',usuarioRoutes);
app.use('/api',proyectoRoutes);
app.use('/api',tareaRoutes);


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
});