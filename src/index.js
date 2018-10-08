let express = require('express');
let app = express();
let mongoose = require('mongoose');
let personRoute = require('./routes/person');
let customerRoute = require('./routes/customer');
let path = require('path');
let bodyParser = require('body-parser');
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/freeCodeCampApiTutorial');

app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));

function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "https://www.kirupa.com/blank.png";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 304) {
                console.log("connection exists!");
            } else {
                console.log("connection doesn't exist!");
            }
        }
    }
};

doesConnectionExist();
