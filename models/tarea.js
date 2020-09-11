const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const tareaShema = mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true,
            trim: true
        },
        estado:{
            type: Boolean,
            default: false
        },
        fechaCreacion:{
            type: Date,
            default: Date.now()
        },
        proyecto:{
            type: ObjectId,
            ref: 'Proyecto'
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Tarea',tareaShema);