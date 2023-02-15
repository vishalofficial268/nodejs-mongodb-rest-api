const router = require('express').Router({ mergeParams: true });


router.get('/user', async (req, res) => {
    res.send('user fetched and tested okay...');
});


module.exports = router;