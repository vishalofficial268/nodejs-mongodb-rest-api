const router = require('express').Router({ mergeParams: true });
const authController = require('../controller/authController');

router.post('/signup', async (req, res) => {
    let result = await authController.signUp(req);
    res.json(result);
})

router.post('/login', async (req, res) => {
    let result = await authController.logIn(req);
    res.json(result);
})


module.exports = router;