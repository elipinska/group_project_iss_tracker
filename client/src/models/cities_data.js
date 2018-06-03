const cities = require('cities.json');
const PubSub = require('../helpers/pub_sub.js');


const CitiesData = function() {
}

CitiesData.prototype.getData = function() {
  PubSub.publish('CitiesData:all-cities-loaded', cities)
}

module.exports = CitiesData;
