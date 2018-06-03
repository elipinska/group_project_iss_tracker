const PubSub = require('../helpers/pub_sub.js');

const CitiesInputView = function(container) {
  this.container = container;
  this.citiesData = null;
  this.countryFilter = 'All';
}

CitiesInputView.prototype.bindEvents = function () {
  PubSub.subscribe('CitiesData:all-cities-loaded', (evt) => {
    this.citiesData = evt.detail;
  });
  this.setUpCountryFilter();
};

CitiesInputView.prototype.addOnKeyUpToCitiesInput = function() {
  this.container.addEventListener('keyup', (evt) => this.prepareCitiesFiltered(evt));
};

CitiesInputView.prototype.setUpCountryFilter = function() {
  PubSub.subscribe('CountrySelectView:filter-country-selected', (evt) => {
    this.countryFilter = evt.detail;
    this.container.nextElementSibling.innerHTML = "";
  });
};

CitiesInputView.prototype.prepareCitiesFiltered = function(evt) {

  const input = evt.target;
  const filter = input.value.toUpperCase();
  const filteredCities = [];

  if(filter.length > 2 || (this.countryFilter !== 'All' && filter.length > 0)) {
    this.citiesData.forEach((city) => {
        if (this.countryFilter === 'All') {
      if(city.name.toUpperCase().indexOf(filter) === 0) {
        filteredCities.push(city);
      };
    } else {
        if(this.countryFilter === city.country && city.name.toUpperCase().indexOf(filter) === 0) {
            filteredCities.push(city);
        };
      };
    });
  };
  PubSub.publish('CityInputView:cities-filtered', filteredCities);
};

module.exports = CitiesInputView;
