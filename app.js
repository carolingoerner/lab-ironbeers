const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beersArr) => {
    const beers = {
      beers: beersArr
    }
    console.log(beers)
    res.render('beers', beers);
  })
  .catch((error) => {
    console.log("oops, there was an error", error); 
  });  
})

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer);
      res.render('random-beers', { beer });
    })
    .catch(error => console.log(error));
});
  
app.listen(3000, () => console.log('🏃‍ on port 3000'));
