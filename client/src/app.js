const CitiesData = require('./models/cities_data.js');
const CountriesData = require('./models/countries_data.js');
const MapView = require('./views/map_view.js');
const CountrySelectView = require('./views/country_select_view.js');
const CitiesInputView = require('./views/cities_input_view.js');
const CitySelectionFormView = require('./views/city_selection_form_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const mapDiv = document.getElementById('mapid');
    const coords = [33,0];
    const zoomLevel = 2;
    const mapView = new MapView(mapDiv, coords, zoomLevel);
    mapView.init();

    const countryDropdown = document.getElementById('country-dropdown');
    const countrySelectView = new CountrySelectView(countryDropdown);
    countrySelectView.bindEvents();

    const citiesInputElement = document.querySelector('#cities-input');
    const citiesInputView = new CitiesInputView(citiesInputElement, mapView);
    citiesInputView.addOnKeyUpToCitiesInput();
    citiesInputView.bindEvents();

    const citySelectionForm = document.querySelector('#city-selection-form')
    const citySelectionFormView = new CitySelectionFormView(citySelectionForm);
    citySelectionFormView.bindEvents();


    const countriesData = new CountriesData();
    countriesData.getData();

    const citiesData = new CitiesData();
    citiesData.getData();

});
