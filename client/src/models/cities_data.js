const cities = require('cities.json');
const PubSub = require('../helpers/pub_sub.js');


const CitiesData = function() {
}

CitiesData.prototype.getData = function() {
  PubSub.publish('CitiesData:all-cities-loaded', cities)
}

CitiesData.prototype.setCountryNames = function() {
  PubSub.subscribe('CountriesData:all-countries-loaded', (evt) => {
    cities.forEach((city) => {
      city.fullCountryName = evt.detail[city.country].name;
    });
  });
};

module.exports = CitiesData;
