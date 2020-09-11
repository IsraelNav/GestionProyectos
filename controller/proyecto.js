const Proyecto = require('../models/proyecto');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.projectById = (req, res, next, id) => {
    Proyecto.findById(id).exec((err, proyecto) => {
        if (err || !proyecto) {
            return res.status(400).json({
                error: "Proyecto No Existe"
            });
        }
        req.proyecto = proyecto;
        next();
    });
};

exports.createProjects = (req,res)=>{
    try {
        const proyecto = new Proyecto(req.body);
        
        proyecto.creador = req.auth._id;
        proyecto.save((err,proyecto) =>{
            if(err){
                res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(proyecto);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
};

exports.listProjects = (req,res) =>{
    //console.log(req.auth._id);
    try {
        Proyecto.find({creador: req.auth._id}).exec((err,data)=>{
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.updateProjects = async (req,res) => {
    let projectId = req.param('projectId');

    const { nombre } = req.body;
    const nuevoProyecto  = {};
    
    
    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try {
        let proyecto =  Proyecto.findById(projectId,(err,pro) =>{
            if(err){
                return res.status(404).json({
                    error: 'Proyecto no encontrado'
                });
            }
        });

        proyecto = await Proyecto.findByIdAndUpdate(
            {_id: projectId},
            {$set: nuevoProyecto},
            {new: true},
            (err,pro) => {
                if(err || pro._doc.creador != req.auth._id){
                    res.status(401).json({
                        error: 'No Autorizado'
                    });
                }
            }
        );

        res.json({proyecto});

    } catch (error) {
        res.status(500).send('Error en el servidor');
    }

};

exports.removeProject = async (req,res) => {
    let projectId = req.param('projectId');
    try {
        let proyecto =  Proyecto.findById(projectId,(err,pro) =>{
            if(err){
                return res.status(404).json({
                    error: 'Proyecto no encontrado'
                });
            }
        });

        proyecto = await Proyecto.findByIdAndRemove(
            {_id: projectId},
            (err,pro) => {
                if(pro._doc.creador != req.auth._id){
                    res.status(401).json({
                        error: 'No Autorizado'
                    });
                }
            }
        );
        
        res.json({mensaje: 'Proyecto Eliminado exitosamente'});
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }


};