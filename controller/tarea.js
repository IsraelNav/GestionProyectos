const Tarea = require('../models/tarea');
const Proyecto = require('../models/proyecto');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.tasktById = (req, res, next, id) => {
    Tarea.findById(id).exec((err, tarea) => {
        if (err || !tarea) {
            return res.status(400).json({
                error: "Proyecto No Existe"
            });
        }
        req.tarea = tarea;
        next();
    });
};
exports.createTask = (req,res) => {
    
    try {
        Proyecto.findById(req.body.proyecto,(err,data) =>{
            if(err || !data){
                res.status(400).json({
                    error: 'Proyecto no encontrado'
                });
            }

            if(data.creador != req.auth._id){
                res.status(401).json({
                    error: 'No Autorizado'
                });
            }
        });

        const tarea = new Tarea(req.body);
        tarea.save((err,data) => {
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(data);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.listTaskForProjects = (req,res) => {
    try {
        Proyecto.findById(req.body.proyecto,(err,data) =>{
            if(err || !data){
                res.status(400).json({
                    error: 'Proyecto no encontrado'
                });
            }
            
            if(data.creador != req.auth._id){
                res.status(401).json({
                    error: 'No Autorizado'
                });
            }
        });
         const { proyecto } = req.body;
         Tarea.find({ proyecto },(err,data) => {
            if(err || !data){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
         });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.updateTask = async (req,res) => {
    try {
        let taskId = req.param('taskId');
        let task = Tarea.findById(taskId);

        if(!task){
            return res.status(404).json({
                error: 'Tarea no existe'
            });
        }

        Proyecto.findById(req.body.proyecto,(err,data) =>{
            if(err || !data){
                res.status(400).json({
                    error: 'Proyecto no encontrado'
                });
            }
            
            if(data.creador != req.auth._id){
                res.status(401).json({
                    error: 'No Autorizado'
                });
            }
        });


         task = await Tarea.findOneAndUpdate(
            {_id: taskId},
            {$set: req.body},
            {new: true}
         );

         res.json(task);
 

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};

exports.deleteTask = async (req,res) => {
    try {
        let taskId = req.param('taskId');
        let task = Tarea.findById(taskId);

        if(!task){
            return res.status(404).json({
                error: 'Tarea no existe'
            });
        }


        await Tarea.findByIdAndRemove(
            {_id: taskId}
        );
        res.json({
            mensaje:'Tarea eliminada exitosamente'
        });
 

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
};