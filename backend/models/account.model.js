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
        minlength: 12,
        validate: [
            {
                validator: function (value) {
                    return /[!@#$%^&*(),.?":{}|<>]/.test(value);
                },
                message: 'Password must contain at least one special character.'
            },
            {
                validator: function (value) {
                    const blacklist = ['password', '123', '1234', '12345', '123456'];
                    const lowerValue = value.toLowerCase();

                    return !blacklist.some(banned => lowerValue.includes(banned));
                },
                message: 'Password cannot contain any of these words: password, 123, 1234, 12345, 123456'
            }
        ]
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