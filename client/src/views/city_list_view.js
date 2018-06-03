const CityView = require('./city_view.js')
const PubSub = require('../helpers/pub_sub.js');

const CityListView = function (container) {
  this.container = container;
  this.cities = null;
}

CityListView.prototype.receiveData = function () {
  PubSub.subscribe ('CityInputView:cities-filtered', (evt) => {
    this.cities = evt.detail;
    this.createCityViews();
  })

};

CityListView.prototype.createCityViews = function () {
  this.clearElement();
  this.cities.forEach((city) => {
        this.createCityView(city);
  });
};

CityListView.prototype.createCityView = function (city) {
  const cityView = new CityView(city);
  const cityLi = cityView.renderCity();
  this.container.appendChild(cityLi);
};

CityListView.prototype.clearElement = function() {
  PubSub.publish('Remove-city-marker', 'hello');
  this.container.innerHTML = '';
}

module.exports = CityListView;
