const CitySelectionFormView = function(container) {
  this.container = container;
}

CitySelectionFormView.prototype.bindEvents = function () {
  this.container.addEventListener('submit', (evt) => {
    console.log(evt.target[2].value);
    evt.preventDefault();
  });
};

module.exports = CitySelectionFormView;
