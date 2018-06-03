const countriesList = require('countries-list');
const PubSub = require('../helpers/pub_sub.js');


const CountriesData = function() {
};

CountriesData.prototype.getData = function() {
  PubSub.publish('CountriesData:all-countries-loaded', countriesList.countries);
};

module.exports = CountriesData;
