const router = require('express').Router({ mergeParams: true });
const userController = require('../controller/userController');


router.post('/create-user', async (req, res) => {
    let result = await userController.createUserDetails(req);
    res.status(200).send(result);
});

router.get('/get-users', async (req, res) => {
    let result = await userController.getUserDetails(req);
    res.status(200).send(result);
});


router.get('/get-user/:id', async (req, res) => {
    console.log(req.query.id, "_________________________")
    let result = await userController.getUserById(req);
    res.status(200).send(result);
});


module.exports = router;