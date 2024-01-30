var createError = require('http-errors');
const express = require('express');
const { v4 } = require('uuid');
var path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const generateColorGrid = require('./color-generator');

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

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