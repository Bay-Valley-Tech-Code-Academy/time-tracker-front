const jwt = require('jsonwebtoken');
const Account = require('../models/account.model')

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//@desc    Get account
//@route   GET /api/v1/accounts
//@access  Public
/*const getAccount = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};*/

//@desc    Register a new account
//@route   POST /api/accounts
//@access  Public
const registerAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Checks if current account exists
        const accountExists = await Account.findOne({ email });
        if (accountExists) {
            return res.status(400).json({ message: 'Account already exists' });
        }

        //Create account
        const account = await Account.create({
            email,
            password
        });
        if (account) {
            res.status(201).json({
                _id: account._id,
                email: account.email,
                token: generateToken(account._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid account data' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@desc    Login a account
//@route   POST /api/accounts/login
//@access  Public
const loginAccount = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check for account email
        const account = await Account.findOne({ email });
        if (account && (await account.isValidPassword(password))) {
            res.json({
                _id: account._id,
                email: account.email,
                token: generateToken(account._id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc    Update a account
//@route   PATCH /api/accounts/:id
//@access  Public
const updateAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        //Hash password automatically by the pre-save hook if updating password
        if (req.body.password) {
            account.password = req.body.password;
        }

        //Update other fields if needed
        if (req.body.email) {
            account.email = req.body.email;
        }

        const updatedAccount = await account.save();

        res.status(200).json({
            _id: updatedAccount._id,
            email: updatedAccount.email,
            message: 'Account info updated'
        });


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc    Delete a account
//@route   DELETE /api/accounts/:id
//@access  Public
const deleteAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        await Account.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Account successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerAccount, loginAccount, updateAccount, deleteAccount };