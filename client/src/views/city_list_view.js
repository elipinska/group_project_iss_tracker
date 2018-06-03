const CityView = require('./city_view.js')
const PubSub = require('../helpers/pub_sub.js');

const CityListView = function (container) {
  this.container = container;
  this.cities = null;
}

CityListView.prototype.bindEvents = function () {
  this.receiveData();
  this.setListenerForClosingList();
};

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

CityListView.prototype.setListenerForClosingList = function () {
  window.addEventListener('mouseup', (evt) => {
    if (evt.target !== this.container && evt.target.parentNode !== this.container && evt.target !== this.container.previousElementSibling) {
      this.clearElement();
    }
  });
};

CityListView.prototype.clearElement = function() {
  PubSub.publish('Views:remove-city-marker');
  this.container.innerHTML = '';
}

module.exports = CityListView;
