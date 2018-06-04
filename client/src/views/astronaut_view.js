const PubSub = require('../helpers/pub_sub.js');

const AstronautView = function(container) {
  this.container = container;
  this.astronauts = null;
}

AstronautView.prototype.bindEvents = function () {
  PubSub.subscribe('ISSData:current-people-in-space', (evt) => {
    this.astronauts = evt.detail;
    this.render();
  })
};



AstronautView.prototype.render = function() {
  this.clearContainer();
  this.astronauts.forEach((astronaut) => {
    this.createHTMLElement('p', 'astronaut-person', astronaut.name);
  });
};

AstronautView.prototype.createHTMLElement = function(type, id, text) {
  const htmlElement = document.createElement(type);
  htmlElement.id = id;
  htmlElement.textContent = text;

  this.container.appendChild(htmlElement);
};

AstronautView.prototype.clearContainer = function() {
  this.container.innerHTML = '';
};



module.exports = AstronautView;
