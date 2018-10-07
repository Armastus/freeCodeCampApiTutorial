let express = require('express');
let router = express.Router();

// QueryString => query property on the request object
// the if statement is checking if a name is added to url localhost:3000/person?name=thomas
router.get('/person', (req, res) => {
    if(req.query.name) {
        res.send(`You have a requested a person ${req.query.name}`);
    }else {
        res.send('You have a requested a person')
    }
});

// Params property on the request object
// localhost:3000/person/thomas /**different from above **/
router.get('/person/:name', (req, res) => {
    res.send(`You have a requested a person ${req.params.name}`);
});

router.get('/error', (req, res) => {
    throw new Error("This is a forced error");
});

module.exports = router