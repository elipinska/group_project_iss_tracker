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
this.leafletMap.removeLayer(this.markers.pop());
}

module.exports = MapView;
