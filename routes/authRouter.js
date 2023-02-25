const router = require('express').Router({ mergeParams: true });
const authController = require('../controller/authController');

router.post('/signup', async (req, res) => {
    let result = await authController.signUpUser(req, res);
    res.json(result);
})

router.post('/login', async (req, res) => {
    let result = await authController.logInUser(req, res);
    res.json(result);
})

router.post('/reset-password', async (req, res) => {
    let result = await authController.resetuserPassword(req);
    res.json(result);
})


router.post('/logout', async (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.json({ success: true, message: "Logged out successfully!" });
})



module.exports = router;