const CitySelectionFormView = function(container) {
  this.container = container;
}

CitySelectionFormView.prototype.bindEvents = function () {
  this.container.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

module.exports = CitySelectionFormView;
