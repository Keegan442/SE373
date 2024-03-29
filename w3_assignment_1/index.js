var createError = require('http-errors');
const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const generateColorGrid = require('./color-generator');

const app = express();
const port = process.env.PORT || 3000;

const whitelist = [
  '*'
];

app.use(bodyParser.urlencoded({ extended: true }));

// Set up Handlebars with '.hbs' extension
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate', (req, res) => {
  const gridSize = parseInt(req.body.gridSize);
  const colors = generateColorGrid(gridSize);

  res.send(colors);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;