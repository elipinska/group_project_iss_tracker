const PubSub = require('../helpers/pub_sub.js');

const CitiesInputView = function(container, map) {
  this.container = container;
  this.citiesData = null;
  this.countriesData = null;
  this.map = map;
  this.countryFilter = 'All';
}

CitiesInputView.prototype.bindEvents = function () {
  PubSub.subscribe('CitiesData:all-cities-loaded', (evt) => {
    this.citiesData = evt.detail;
  });
  PubSub.subscribe('CountriesData:all-countries-loaded', (evt) => {
    this.countriesData = evt.detail;
  });

  this.setUpCountryFilter();
};

CitiesInputView.prototype.addOnKeyUpToCitiesInput = function() {
  console.dir(this.container);
  this.container.addEventListener('keyup', (evt) => this.renderCitiesList(evt));
};

CitiesInputView.prototype.renderCitiesList = function (evt) {
  var input, filter, ul, li, a, i;

  input = evt.target;
  filter = input.value.toUpperCase();
  ul = evt.target.nextElementSibling;

  ul.innerHTML = "";
  if (filter.length > 1 || (this.countryFilter !== 'All' && filter.length > 0)) {
    this.citiesData.forEach((city) => {
      if (this.countryFilter === "All") {
        if (city.name.toUpperCase().indexOf(filter) === 0) {
          const newLi = document.createElement('li');
          // const newA = document.createElement('a');
          this.addMapMarkerListenerToListItem(city, newLi);
          this.removeMapMarkerListenerToListItem(city, newLi);
          this.addOnClickListenerToListItem(city, newLi);
          newLi.textContent = `${city.name} (${this.countriesData[city.country].name}), longitude: ${city.lng}, latitude: ${city.lat}`;
          // newLi.appendChild(newA);
          ul.appendChild(newLi);
        };
      } else {
        if (this.countryFilter === city.country && city.name.toUpperCase().indexOf(filter) === 0) {
          const newLi = document.createElement('li');
          // const newA = document.createElement('a');
          this.addMapMarkerListenerToListItem(city, newLi);
          this.removeMapMarkerListenerToListItem(city, newLi);
          this.addOnClickListenerToListItem(city, newLi);
          newLi.textContent = `${city.name} (${this.countriesData[city.country].name}), longitude: ${city.lng}, latitude: ${city.lat}`;
          // newLi.appendChild(newA);
          ul.appendChild(newLi);
        };
      };
    });
  }
};

CitiesInputView.prototype.addMapMarkerListenerToListItem = function(city, listElement) {
  listElement.addEventListener('mouseover', (evt) => {
  this.map.setMarker([city.lat, city.lng]);
  });
};

CitiesInputView.prototype.removeMapMarkerListenerToListItem = function(city, listElement) {
  listElement.addEventListener('mouseout', (evt) => {
  this.map.removeLastMarker();
  });
};

CitiesInputView.prototype.addOnClickListenerToListItem = function(city, listElement) {
  listElement.addEventListener('click', (evt) => {
    this.container.value = city.name;
  });
};

CitiesInputView.prototype.setUpCountryFilter = function() {
  PubSub.subscribe('CountrySelectView:filter-country-selected', (evt) => {
    this.countryFilter = evt.detail;
    this.container.nextElementSibling.innerHTML = "";
  });
};

module.exports = CitiesInputView;
