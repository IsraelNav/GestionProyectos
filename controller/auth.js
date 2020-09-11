const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req,res) => {

    try {
        let usuario = new Usuario(req.body);
        
        usuario.save((err,usuario)=>{
            if(err ){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            usuario.salt = undefined;
            usuario.hashed_password = undefined;
            res.json({
                usuario
            });
        });
    } catch (error) {
        console.log(error);
        res.json({
            error
        });
    }
};

exports.signin = (req,res)=>{
    const { email,password } = req.body;

    Usuario.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: `El usuario No existe, Favor Registrese`
            });
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'El email y la contraseña no coinciden'
            });
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        res.cookie('t',token,{expire: new Date()+9999});
        const { _id, nombre, email, rol } = user;
        return res.json({token,user:{_id,email,nombre,rol}});
    });
};

exports.signout = (req,res)=>{
    res.clearCookie('t');
    res.json({mensaje: 'Cierre de Sesion exitoso'});
};

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let usuario = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(usuario);
    if (!usuario) {
        return res.status(403).json({
            error: "Acceso Denegado"
        });
    }
    next();
};


exports.isAdmin = (req,res,next)=>{
    if(req.profile.rol ===0){
        return res.status(403).json({
            error: 'Recurso de adminisrador! Acceso denegado'
        });
    }
    next();
};

