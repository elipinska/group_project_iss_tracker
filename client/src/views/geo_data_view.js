const PubSub = require('../helpers/pub_sub.js');

const GeoDataView = function (container) {
  this.container = container;
};

GeoDataView.prototype.bindEvents = function () {
  PubSub.subscribe('GeoData:data-ready', (evt) => {
    const randomWikiPage = this.returnRandomWikiPage(evt.detail.query.pages);
    console.log(randomWikiPage);

    this.render(randomWikiPage);
  });
};

GeoDataView.prototype.returnRandomWikiPage = function (data) {
  const keys = Object.keys(data);

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const randomIdx = getRandomInt(keys.length);
  return data[keys[randomIdx]];
};

GeoDataView.prototype.render = function (wikiPage) {
  this.clearContainer();
  this.createHTMLElement('h2', 'wiki-page-title', wikiPage.title);
  this.createHTMLElement('p', 'wiki-page-extract', wikiPage.extract);

};

GeoDataView.prototype.createHTMLElement = function(type, id, text) {
  const htmlElement = document.createElement(type);
  htmlElement.id = id;
  htmlElement.textContent = text;

  this.container.appendChild(htmlElement);
};

GeoDataView.prototype.clearContainer = function() {
  this.container.innerHTML = '';
};


module.exports = GeoDataView;
