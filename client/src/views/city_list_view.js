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
        const cityView = this.createCityView(city);

  });
};

CityListView.prototype.createCityView = function (city) {
  const cityView = new CityView(city);
  this.container.appendChild (cityView.renderCity());
  return cityView;
};

CityListView.prototype.clearElement = function() {
  this.container.innerHTML = '';
}

module.exports = CityListView;
