const PubSub = require('../helpers/pub_sub.js');

const CityView = function (city) {
  this.city = city;
}

CityView.prototype.renderCity = function () {
  const newLi = document.createElement('li');
  newLi.textContent = `${this.city.name} (${this.city.fullCountryName}), longitude: ${this.city.lng}, latitude: ${this.city.lat}`;

  this.setAddMapMarkerListenerToListItem(newLi);
  this.setRemoveMapMarkerListenerToListItem(newLi);
  this.addOnClickListenerToListItem(newLi);

  return newLi;
};

CityView.prototype.setAddMapMarkerListenerToListItem = function(listElement) {
  listElement.addEventListener('mouseover', (evt) => {
    PubSub.publish('CityView:set-city-marker', [this.city.lat, this.city.lng]);
  });
};

CityView.prototype.setRemoveMapMarkerListenerToListItem = function(listElement) {
  listElement.addEventListener('mouseout', (evt) => {
    PubSub.publish('Remove-city-marker');
  });
};

CityView.prototype.addOnClickListenerToListItem = function(listElement) {
  listElement.addEventListener('click', (evt) => {
    listElement.parentElement.previousElementSibling.value = this.city.name;
  });
};

module.exports = CityView;
