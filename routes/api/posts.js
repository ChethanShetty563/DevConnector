const express = require('express');
const router = express.Router();    



// @route  GET api/public/test
// @desc test public route
//@access public
router.get('/test', (req,res) => {
    res.json({msg : 'posts found'})
});

module.exports = router;