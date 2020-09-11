const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const usuarioSchema = mongoose.Schema(
    {
        nombre:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        hashed_password:{
            type:String,
            trim:true
        },
        salt:String,
        rol:{
            type:Number,
            default:0
        }
    },
    {timestamps:true}
);

usuarioSchema
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

    usuarioSchema.methods = {
        authenticate:function(plainText){
            return this.encryptPassword(plainText) === this.hashed_password;
        },

        encryptPassword: function(password){
            if(!password) return '';
            try {
                return crypto
                    .createHmac('sha1',this.salt)
                    .update(password)
                    .digest('hex');
            } catch (error) {
                return '';
            }
        }
    };




module.exports = mongoose.model('Usuario',usuarioSchema);