const Usuario = require('../models/usuario');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.userById = (req,res,next,id)=>{
    Usuario.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'Usuario no encontrado'
            });
        }
        req.profile = user;
        next();
    });
};

exports.uId = (req,res,next,id)=>{
    Usuario.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: 'Usuario no encontrado'
            });
        }
        req.profile = user;
        next();
    });
};


exports.update = (req,res)=>{
    Usuario.findOneAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:'No se encuentra autorizado para realizar esta accion'
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.list = (req,res)=>{
    Usuario.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};