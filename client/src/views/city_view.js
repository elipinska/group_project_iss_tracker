const PubSub = require('../helpers/pub_sub.js');

const CityView = function (city) {
  this.city = city;
  this.listElement = null;
}

CityView.prototype.renderCity = function () {
  const newLi = document.createElement('li');
  newLi.textContent = `${this.city.name} (${this.city.fullCountryName}), longitude: ${this.city.lng}, latitude: ${this.city.lat}`;

  this.listElement = newLi;

  this.setAddMapMarkerListenerToListItem();
  this.setRemoveMapMarkerListenerToListItem();
  this.addOnClickListenerToListItem();

  return this.listElement;
};

CityView.prototype.setAddMapMarkerListenerToListItem = function() {
  this.listElement.addEventListener('mouseover', (evt) => {
    PubSub.publish('CityView:mouse-over-city', [this.city.lat, this.city.lng]);
  });
};

CityView.prototype.setRemoveMapMarkerListenerToListItem = function() {
  this.listElement.addEventListener('mouseout', (evt) => {
    PubSub.publish('Views:remove-city-marker');
  });
};

CityView.prototype.addOnClickListenerToListItem = function() {
  this.listElement.addEventListener('click', (evt) => {
    this.listElement.parentElement.previousElementSibling.value = this.city.name;
    PubSub.publish('CityView:city-selected', this.city);
  });
};

module.exports = CityView;
