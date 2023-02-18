const router = require('express').Router({ mergeParams: true });
const userController = require('../controller/userController');


router.post('/create-user', async (req, res) => {

    let result = await userController.createUserDetails(req);
    res.status(200).send(result);
});

router.get('/get-users', async (req, res) => {

    let result = await userController.getAllUsersDetails(req);
    res.status(200).send(result);
});


router.put('/get-user/:id', async (req, res) => {

    let result = await userController.getUserById(req);
    res.status(200).send(result);
});

router.post('/update-user/:id', async (req, res) => {

    let result = await userController.updateUser(req);
    res.status(200).send(result);
});


router.delete('/delete-user/:id', async (req, res) => {

    let result = await userController.deleteUser(req);
    res.status(200).send(result);
});


module.exports = router;