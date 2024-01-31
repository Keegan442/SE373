const express = require('express');
const hbs = require('hbs');
const handlebars = require('handlebars');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:false}));

function rando() {
    return Math.round(Math.random() * 4 + 1);
}

handlebars.registerHelper('ptag', (num, messagePassedIn) => {
    var msg = '';
    for (let i = 0; i < num; i++) {
        msg += `<p>${messagePassedIn}</p>`;
    }

    return new handlebars.SafeString(msg);
});

handlebars.registerHelper('error404', function () {
    const numberOfDivs = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    let output = '';

    for (let i = 0; i < numberOfDivs; i++) {
        const classNames = ['still', 'rotate', 'shrink'];
        const randomClass = classNames[Math.floor(Math.random() * classNames.length)];

        output += `<div class="${randomClass}">404</div>`;
    }

    return new handlebars.SafeString(output);
});

function dateLogger(req, res, next) {
    let date = new Date();
    console.log(date);
    req.date = date;
    next();
}

app.get('/', dateLogger, (req, res) => {
    console.log(req.body);
});

app.get('/form', (req, res) => {
    res.render('form.hbs');
});

app.post('/results', (req, res) => {
    res.render('results.hbs', {
        numberFromForm: req.body.textNumber
    });
});

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render('error.hbs', {
        message: `${error.status} ${error.message}`,
        num: rando(),
        error404: handlebars.helpers.error404, // Pass the error404 helper to the template
    });
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`);
});
