const PubSub = require('../helpers/pub_sub.js');

const CountriesInputView = function(container) {
  this.container = container;
  this.countriesData = null;
}

CountriesInputView.prototype.bindEvents = function() {
  PubSub.subscribe('CountriesData:all-countries-loaded', (evt) => {
    this.countriesData = evt.detail;
    console.dir(this.countriesData);
  });
};

CountriesInputView.prototype.addOnKeyUpToCountriesInput = function() {
  console.dir(this.container);
  this.container.addEventListener('keyup', (evt) => this.renderCountriesList(evt));
};


CountriesInputView.prototype.renderCountriesList = function (evt) {
  var input, filter, ul, li, a, i;

  input = evt.target;
  filter = input.value.toUpperCase();
  ul = evt.target.nextElementSibling;

  ul.innerHTML = "";

  if (filter.length > 2) {

    for (var key in this.countriesData) {
      const country = this.countriesData[key];
      if (country.name.toUpperCase().indexOf(filter) === 0) {
        const newLi = document.createElement('li');
        const newA = document.createElement('a');
        this.addOnClickListenerToListItem(country, newLi);
        newA.textContent = this.countriesData[key].name;
        newLi.appendChild(newA);
        ul.appendChild(newLi);
      };
    };
  };
};

CountriesInputView.prototype.addOnClickListenerToListItem = function(country, listElement) {
  listElement.addEventListener('click', (evt) => {
    this.container.value = country.name;
  });
};

module.exports = CountriesInputView;
