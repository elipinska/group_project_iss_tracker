const PubSub = require('../helpers/pub_sub.js');
const leaflet = require('leaflet');

const MapView = function (mapDiv, coords, zoomLevel) {
  this.mapDiv = mapDiv;
  this.coords = coords;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
  this.markers = []
  this.protectedMarkers = [];
}

MapView.prototype.init = function () {
  const openStreetMapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const openStreetMapTileLayer = new leaflet.TileLayer(openStreetMapUrl);

  this.leafletMap = leaflet.map(this.mapDiv)
    .addLayer(openStreetMapTileLayer)
    .setView(this.coords, this.zoomLevel);
}

MapView.prototype.setMarker = function(coords, isProtected) {
  const newMarker = leaflet.marker(coords, {riseOnHover: true}).addTo(this.leafletMap);

  if (isProtected) {
    this.protectedMarkers.push(newMarker);
  } else {
    this.markers.push(newMarker);
  }
  return newMarker;
}


MapView.prototype.removeLastMarker = function() {
  if (this.markers.length > 0) {
    this.leafletMap.removeLayer(this.markers.pop());
  }
}

MapView.prototype.bindEvents = function () {
  this.setListenerForCityMarkers();
  this.setListenerForRemoveCityMarkers();
  this.setPopUpListener();
};

MapView.prototype.setListenerForCityMarkers = function() {
  PubSub.subscribe('CityView:mouse-over-city', (evt) => {
    this.setMarker(evt.detail, false);
  });
}

MapView.prototype.setListenerForRemoveCityMarkers = function() {
  PubSub.subscribe('Views:remove-city-marker', (evt) => {
    this.removeLastMarker();
  });
}

MapView.prototype.setPopUpListener = function() {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    const marker = this.setMarker([evt.detail.lat, evt.detail.lng], true);
    marker.bindPopup(`${evt.detail.name} (${evt.detail.country})`).openPopup();
  });
};

module.exports = MapView;
