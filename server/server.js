const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const fetch = require('node-fetch');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});

app.get(`/iss-data/:lat/:lng`, (req, res) => {
  const url =
 `http://api.open-notify.org/iss-pass.json?lat=${req.params.lat}&lon=${req.params.lng}`;

  fetch(url)
    .then(jsonData => jsonData.json())
    .then(data => res.json(data));
});
