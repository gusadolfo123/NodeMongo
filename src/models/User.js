const bcrypt  = require('bcryptjs'); // pasa cifrar contraseña
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// metodos del esquema
// cifra la contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // aplica algoritmo 10 veces
    const hash = bcrypt.hash(password, salt);
    return hash;
};

// compara la contraseña con la de la base de datos
UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);    
};

module.exports = mongoose.model('User', UserSchema);
