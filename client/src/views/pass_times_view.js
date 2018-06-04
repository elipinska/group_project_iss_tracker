const PubSub = require('../helpers/pub_sub.js');
const ISSData = require('../models/iss_data.js')

const PassTimesView = function(container) {
  this.container = container;
  this.city = null;
  this.issResponse = null;
}

PassTimesView.prototype.bindEvents = function () {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    this.city = evt.detail;

    const lng = this.city.lng;
    const lat = this.city.lat;

    const issData = new ISSData(`/iss-data/${lat}/${lng}`);
    issData.getData();
  });

  PubSub.subscribe('ISSData:data-ready', (evt) => {
    console.log(evt.detail);
    this.issResponse = evt.detail;
    this.render();

  });
};

PassTimesView.prototype.render = function() {
  this.clearContainer();
  this.createHTMLElement('h2', 'city-name', this.city.name);
  this.createHTMLElement('p', 'country', this.city.fullCountryName);

  const time = new Date(this.issResponse.response[0].risetime*1000);

  this.createHTMLElement('p', 'iss-pass-time-1', time);


  console.log(time);
};

PassTimesView.prototype.createHTMLElement = function(type, id, text) {
  const htmlElement = document.createElement(type);
  htmlElement.id = id;
  htmlElement.textContent = text;

  this.container.appendChild(htmlElement);
};

PassTimesView.prototype.clearContainer = function() {
  this.container.innerHTML = '';
};

module.exports = PassTimesView;
