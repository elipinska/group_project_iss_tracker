const PubSub = require('../helpers/pub_sub.js');

const PassTimesView = function(container) {
  this.container = container;
  this.city = null;
}

PassTimesView.prototype.bindEvents = function () {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    this.city = evt.detail;
    this.render();
  });
};

PassTimesView.prototype.render = function() {
  this.clearContainer();
  this.createHTMLElement('h2', 'city-name', this.city.name);
  this.createHTMLElement('p', 'country', this.city.fullCountryName);
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
