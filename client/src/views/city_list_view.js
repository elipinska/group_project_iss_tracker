const CityListView = function(container) {
  this.container = container;
  this.cities = null;
}

CityListView.prototype.receiveData = function () {
  PubSub.subscribe('CityData:cities-ready', (event) => {
    this.cities = event.detail;
    this.createCityViews();
  });

};

CityListView.prototype.createCityViews = function () {
  this.clearElement();
  this.cities.forEach((city) => {
        const cityView = this.createCityView(city);
        cityView.render();
  });
};

CityListView.prototype.createCityView = function (city) {
  const cityView = new CityView(city);
  this.element.appendChild (cityView.createElement());
  return cityView;
};

CityListView.prototype.clearElement = function() {
  this.container.innerHTML = '';
}


module.exports = CityListView;
