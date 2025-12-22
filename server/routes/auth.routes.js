
const express = require('express')
const { signup, login, getAllUsers } = require('../controllers/auth.controller')
const { protect } = require('../middlewares/auth.middlewares')





const authRouter = express.Router()
authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/', protect, getAllUsers)



// auto login
authRouter.post('/auto-login', protect, (req, res) => {
    res.status(200).json({
        status: 'success',
        user: req.user
    });
});

module.exports = authRouter

