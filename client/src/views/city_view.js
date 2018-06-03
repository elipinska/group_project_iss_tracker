const PubSub = require('../helpers/pub_sub.js');


const CityView = function (city) {
  this.city = city;
}

CityView.prototype.renderCity = function () {
  const newLi = document.createElement('li');
  newLi.textContent = `${this.city.name}, longitude: ${this.city.lng}, latitude: ${this.city.lat}`;
  return newLi;
};

module.exports = CityView;
