const PubSub = require('../helpers/pub_sub.js');
const leaflet = require('leaflet');

const MapView = function (mapDiv, coords, zoomLevel) {
  this.mapDiv = mapDiv;
  this.coords = coords;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
  this.markers = []
}

MapView.prototype.init = function () {
  const openStreetMapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const openStreetMapTileLayer = new leaflet.TileLayer(openStreetMapUrl);

  this.leafletMap = leaflet.map(this.mapDiv)
    .addLayer(openStreetMapTileLayer)
    .setView(this.coords, this.zoomLevel);
}

MapView.prototype.setMarker = function(coords) {
  const newMarker = leaflet.marker(coords).addTo(this.leafletMap);
  this.markers.push(newMarker);
}

MapView.prototype.removeLastMarker = function() {
  if (this.markers.length > 0) {
    this.leafletMap.removeLayer(this.markers.pop());
  }
}

MapView.prototype.bindEvents = function () {
  this.setListenerForCityMarkers();
  this.setListenerForRemoveCityMarkers();
};

MapView.prototype.setListenerForCityMarkers = function() {
  PubSub.subscribe('CityView:set-city-marker', (evt) => {
    this.setMarker(evt.detail);
  });
}

MapView.prototype.setListenerForRemoveCityMarkers = function() {
  PubSub.subscribe('CityView:remove-city-marker', (evt) => {
    this.removeLastMarker();
  });
}

module.exports = MapView;
