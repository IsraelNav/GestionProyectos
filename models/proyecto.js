const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const proyectoSchema = mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true,
            trim:true
        },
        creador:{
            type: ObjectId,
            ref: 'Usuario'
        },
        fechaCreacion:{
            type: Date,
            default: Date.now()
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Proyecto',proyectoSchema);