const CitiesData = require('./models/cities_data.js');
const CountriesData = require('./models/countries_data.js');
const MapView = require('./views/map_view.js');
const CountrySelectView = require('./views/country_select_view.js');
const CitiesInputView = require('./views/cities_input_view.js');
const CitySelectionFormView = require('./views/city_selection_form_view.js');
const CityListView = require('./views/city_list_view.js');
const PassTimesView = require('./views/pass_times_view.js');
const ISSData = require('./models/iss_data.js');

document.addEventListener('DOMContentLoaded', () => {

  const mapDiv = document.getElementById('mapid');
    const coords = [0, 0];
    const zoomLevel = 2;
    const mapView = new MapView(mapDiv, coords, zoomLevel);
    mapView.init();
    mapView.bindEvents();

    const countryDropdown = document.getElementById('country-dropdown');
    const countrySelectView = new CountrySelectView(countryDropdown);
    countrySelectView.bindEvents();

    const citiesInputElement = document.querySelector('#cities-input');
    const citiesInputView = new CitiesInputView(citiesInputElement);
    citiesInputView.addOnKeyUpToCitiesInput();
    citiesInputView.bindEvents();

    const citySelectionForm = document.querySelector('#city-selection-form')
    const citySelectionFormView = new CitySelectionFormView(citySelectionForm);
    citySelectionFormView.bindEvents();

    const cityListViewContainer = document.querySelector('#cities-list');
    const cityListView = new CityListView(cityListViewContainer);
    cityListView.bindEvents();

    const passTimesContainer = document.querySelector('#pass-times');
    const passTimesView = new PassTimesView(passTimesContainer);
    passTimesView.bindEvents();

    const issData = new ISSData('/iss-data/current-position');
    setInterval(function(){ issData.getCurrentISSPosition(); }, 5000);


    const citiesData = new CitiesData();
    citiesData.getData();
    citiesData.setCountryNames();

    const countriesData = new CountriesData();
    countriesData.getData();

});
