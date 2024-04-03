const express = require('express');
const path = require('path');
const fetchData = require('./utils/fetchData');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = 'YLSmQ7YZd6YndqlTkexFWAFHr7K0XZ9b';

console.log(process.env.API_KEY);

const pathToDistFolder = path.join(__dirname, '..', 'frontend', 'dist');

const app = express();

/////////////////////
// Controllers
/////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

const serveStatic = express.static(pathToDistFolder);

const serveGifs = (req, res, send) => {
  const API_URL = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  try {
    const [data, error] = await fetchData(API_URL);
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
}

////////////////////////
// Routes
////////////////////////

app.use(logRoutes);
app.use(serveStatic);
app.get('/api/gifs', serveGifs);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});