const router = require('express').Router();
router.use('/users', require('./userRouter'));
router.use('/auth', require('./authRouter'));


module.exports = router;