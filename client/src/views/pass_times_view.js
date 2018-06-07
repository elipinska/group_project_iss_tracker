const PubSub = require('../helpers/pub_sub.js');
const ISSData = require('../models/iss_data.js')

const PassTimesView = function(container) {
  this.container = container;
  this.city = null;
  this.issResponse = null;
}

PassTimesView.prototype.bindEvents = function () {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    this.container.style.display = '';

    this.city = evt.detail;

    const lng = this.city.lng;
    const lat = this.city.lat;

    const issData = new ISSData(`/iss-data/${lat}/${lng}`);
    issData.getData();
  });

  PubSub.subscribe('ISSData:data-ready', (evt) => {
    this.issResponse = evt.detail;
    this.render();

  });

  PubSub.subscribe('WikiForISSLocationView:button-clicked', (evt) => {
    this.clearContainer();
    this.container.style.display = "none";
  });
};

PassTimesView.prototype.render = function() {
  this.clearContainer();
  this.createHTMLElement('h2', 'pass-times', `Upcoming ISS pass times for:`);
  this.createHTMLElement('h3', 'city-info', `${this.city.name} (${this.city.fullCountryName})`);

  this.issResponse.response.forEach((passTime) => {
    const time = new Date(passTime.risetime * 1000);
    this.createHTMLElement('p', 'iss-pass-time-1', time);
  });
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
