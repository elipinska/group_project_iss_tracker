const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const fetch = require('node-fetch');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

app.listen(process.env.PORT || 5000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});

app.get(`/iss-data/:lat/:lng`, (req, res) => {
  const url =
 `http://api.open-notify.org/iss-pass.json?lat=${req.params.lat}&lon=${req.params.lng}`;

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
});

app.get(`/iss-data/current-position`, (req, res) => {
  const url = 'http://api.open-notify.org/iss-now.json';

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
});

app.get(`/iss-data/astronauts`, (req, res) => {
  const url = 'http://api.open-notify.org/astros.json';

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
});

app.get(`/geo-data/:lat/:lng`, (req, res) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=coordinates%7Cpageimages%7Cpageterms%7Cextracts&generator=geosearch&colimit=50&piprop=thumbnail&pithumbsize=250&pilimit=50&wbptterms=description&exsentences=3&exintro=1&explaintext=1&ggscoord=${req.params.lat}%7C${req.params.lng}&ggsradius=10000&ggslimit=20`;

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));

});
