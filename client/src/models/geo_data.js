const PubSub = require('../helpers/pub_sub.js');

const GeoData = function(){
  this.url = null;
};

GeoData.prototype.bindEvents = function () {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    this.url = `/geo-data/${evt.detail.lat}/${evt.detail.lng}`;
    this.getData();
  });

  PubSub.subscribe('ISSData:current-position-for-button', (evt) => {
      this.url = `/geo-data/${evt.detail.latitude}/${evt.detail.longitude}`;
      this.getData();
    });
}

GeoData.prototype.getData = function(){
  fetch(this.url)
  .then(res => res.json())
  .then(data =>
  PubSub.publish('GeoData:data-ready', data));
};

module.exports = GeoData;
