const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Structure of Account Data
const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 12
    }
});

//Pre-Save Hook for Password Hashing
accountSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

//Password Validation
accountSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error('Password comparison failed!');
    }
}

module.exports = mongoose.model('Account', accountSchema);