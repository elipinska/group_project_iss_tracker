# NASA International Space Station Tracker

Now deployed to Heroku at <a href="https://nasa-iss-tracker.herokuapp.com/" target="_blank">https://nasa-iss-tracker.herokuapp.com/</a>

## Project definition

An interactive educational app built with JavaScript using Node.js, webpack and Express for the server side. It uses positional data from the International Space Station (ISS) as a fun way for users to retrieve educational material about locations around the Earth! Created within a 4-person Agile team over the course of a week.

## MVP
* Take user selection of a location and display a prediction of the next time the ISS will be above that location.
* A dynamic map showing the ISS current location related to city selection.

## Extensions
* Take user selection of a location and display educational material relevant to that location.
* Use NASA media resources to provide relevant and appealing background content.

## Data sources used
* <a href="http://open-notify.org/" target="_blank">Open Notify API</a>  for the ISS data,
* <a href="https://leafletjs.com/" target="_blank">Leaflet</a> for map rendering
* <a href="https://www.mediawiki.org/wiki/Special:ApiSandbox" target="_blank">Wikipedia API</a> for additional information about locations
* <a href="https://github.com/annexare/Countries" target="_blank">Countries</a> and <a href="https://www.npmjs.com/package/cities.json?activeTab=readme" target="_blank">cities</a> npm packages
