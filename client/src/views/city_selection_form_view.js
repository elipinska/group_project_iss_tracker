const CitySelectionFormView = function(container) {
  this.container = container;

  // this.addOnBlurEvenentListenerToInputElement();
}

CitySelectionFormView.prototype.bindEvents = function () {
  this.container.addEventListener('submit', (evt) => {
    console.log(evt.target[2].value);
    evt.preventDefault();
  });
};

// CitySelectionFormView.prototype.addOnBlurEvenentListenerToInputElement = function () {
//   this.container.addEventListener('focusout', (evt) => {
//     this.container.children[1].innerHTML = "";
//     this.container.children[3].innerHTML = "";
//     console.dir(this.container);
//   });
// };

module.exports = CitySelectionFormView;
