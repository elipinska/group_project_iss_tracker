const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const ISSData = function(url) {
    this.url = url;
}

ISSData.prototype.bindEvents = function () {
  PubSub.subscribe('WikiForISSLocationView:button-clicked', (evt) => {
    this.getCurrentISSPositionForButton();
  });
};

ISSData.prototype.getData = function () {
  fetch(this.url)
    .then(res => res.json())
    .then(data => PubSub.publish('ISSData:data-ready', data));
};

ISSData.prototype.getCurrentISSPosition = function () {
  fetch(this.url)
    .then(res => res.json())
    .then(data => PubSub.publish('ISSData:current-position', data.iss_position));
};

ISSData.prototype.getCurrentISSPositionForButton = function () {
  fetch(this.url)
    .then(res => res.json())
    .then(data => PubSub.publish('ISSData:current-position-for-button', data.iss_position));
};

ISSData.prototype.getAstronautsInSpace = function () {
  fetch(this.url)
    .then(res => res.json())
    .then(data => PubSub.publish('ISSData:current-people-in-space', data.people));
};

module.exports = ISSData;
