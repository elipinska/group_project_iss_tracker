const CitiesData = require('./models/cities_data.js');
const CountriesData = require('./models/countries_data.js');
const GeoData = require('./models/geo_data.js');
const MapView = require('./views/map_view.js');
const CountrySelectView = require('./views/country_select_view.js');
const CitiesInputView = require('./views/cities_input_view.js');
const CityListView = require('./views/city_list_view.js');
const PassTimesView = require('./views/pass_times_view.js');
const ISSData = require('./models/iss_data.js');
const AstronautView = require('./views/astronaut_view.js');
const GeoDataView = require('./views/geo_data_view.js');
const WikiForISSLocationView = require('./views/wiki_for_iss_location_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const mapDiv = document.getElementById('mapid');
    const coords = [30, 0];
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

    const cityListViewContainer = document.querySelector('#cities-list');
    const cityListView = new CityListView(cityListViewContainer);
    cityListView.bindEvents();

    const passTimesContainer = document.querySelector('#pass-times');
    const passTimesView = new PassTimesView(passTimesContainer);
    passTimesView.bindEvents();

    const wikiForISSLocationContainer = document.querySelector('#wiki-for-iss-location');
    const wikiForISSLocationView = new WikiForISSLocationView(wikiForISSLocationContainer);
    wikiForISSLocationView.bindEvents();

    const issData = new ISSData('/iss-data/current-position');
    issData.bindEvents();
    setInterval(function(){ issData.getCurrentISSPosition(); }, 5000);

    const issDataPeople = new ISSData('/iss-data/astronauts');
    issDataPeople.getAstronautsInSpace();

    const peepsInSpace = document.querySelector('#people-in-space');
    const astronautView = new AstronautView(peepsInSpace);
    astronautView.bindEvents();

    const geoDataContainer = document.querySelector('#geo-data');
    const geoDataView = new GeoDataView(geoDataContainer);
    geoDataView.bindEvents();

    const geoData = new GeoData();
    geoData.bindEvents();

    const citiesData = new CitiesData();
    citiesData.getData();
    citiesData.setCountryNames();

    const countriesData = new CountriesData();
    countriesData.getData();


});
