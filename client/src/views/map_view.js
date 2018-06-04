const PubSub = require('../helpers/pub_sub.js');
const leaflet = require('leaflet');

const MapView = function (mapDiv, coords, zoomLevel) {
  this.mapDiv = mapDiv;
  this.coords = coords;
  this.zoomLevel = zoomLevel;
  this.leafletMap = null;
  this.hoverMarkers = []
  this.clickedCityMarker = null;
  this.issMarker = null;
}

MapView.prototype.init = function () {
  const openStreetMapUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const openStreetMapTileLayer = new leaflet.TileLayer(openStreetMapUrl);

  this.leafletMap = leaflet.map(this.mapDiv)
  .addLayer(openStreetMapTileLayer)
  .setView(this.coords, this.zoomLevel);
}


MapView.prototype.bindEvents = function () {
  this.setListenerForCityMarkers();
  this.setListenerForRemoveCityMarkers();
  this.setPopUpListener();
  this.setListenerForISSCurrentPosition();
};

MapView.prototype.setMarker = function(coords, isClicked) {

  const newMarker = leaflet.marker(coords, {riseOnHover: true}).addTo(this.leafletMap);

  if (isClicked) {
    if (this.clickedCityMarker) {
      this.leafletMap.removeLayer(this.clickedCityMarker);
    }
    this.clickedCityMarker = newMarker;
  } else {
    this.hoverMarkers.push(newMarker);
  }
  return newMarker;
}

MapView.prototype.createISSMarker = function(coords) {
  const issIcon = L.icon({
    iconUrl: 'images/iss.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [32, 32], // size of the icon
  });

    const newISSMarker = leaflet.marker(coords, {riseOnHover: true, icon: issIcon}).addTo(this.leafletMap);



    return newISSMarker;
};


MapView.prototype.removeLastHoverMarker = function() {
  if (this.hoverMarkers.length > 0) {
    this.leafletMap.removeLayer(this.hoverMarkers.pop());
  }
}

MapView.prototype.setListenerForCityMarkers = function() {
  PubSub.subscribe('CityView:mouse-over-city', (evt) => {
    this.setMarker(evt.detail, false);
  });
}

MapView.prototype.setListenerForRemoveCityMarkers = function() {
  PubSub.subscribe('Views:remove-city-marker', (evt) => {
    this.removeLastHoverMarker();
  });
}

MapView.prototype.setPopUpListener = function() {
  PubSub.subscribe('CityView:city-selected', (evt) => {
    const marker = this.setMarker([evt.detail.lat, evt.detail.lng], true);
    marker.bindPopup(`${evt.detail.name}`).openPopup();
  });
};

MapView.prototype.setListenerForISSCurrentPosition = function () {
  PubSub.subscribe('ISSData:current-position', (evt) => {

    if (this.issMarker) {
      this.leafletMap.removeLayer(this.issMarker);
    }

    const currentCoords = [evt.detail.latitude, evt.detail.longitude];
    this.issMarker = this.createISSMarker(currentCoords, false);


//     const ISScircle = L.circle(currentCoords, {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(mymap);
  });
};

module.exports = MapView;
