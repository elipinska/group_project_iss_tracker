const PubSub = require('../helpers/pub_sub.js')

const WikiForISSLocationView = function(container) {
  this.container = container;
}

WikiForISSLocationView.prototype.bindEvents = function () {
  this.container.addEventListener('click', (evt) => {
    PubSub.publish('WikiForISSLocationView:button-clicked')
  });

};

module.exports = WikiForISSLocationView;
