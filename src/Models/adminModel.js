const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    
  name: {type:String, required:true},
  
phone: {
    trim: true,
    type: String,
    required: ' mobile is required',
    unique: true,
    validate: {
        validator: function (phone) {
            return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)
        }, message: 'Please fill a valid mobile number', isAsync: false
    }
}
},{timestamps:true})




module.exports = mongoose.model('adiminsdatas', adminSchema)

