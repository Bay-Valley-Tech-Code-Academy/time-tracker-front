const express = require('express');
const { registerAccount, loginAccount, updateAccount, deleteAccount } = require('../controllers/account.controller');

const router = express.Router();

router.post('/register', registerAccount);
router.post('/login', loginAccount);
router.patch('/:id', updateAccount);
router.delete('/:id', deleteAccount);

module.exports = router;