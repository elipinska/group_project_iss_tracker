const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const ISSData = function(url) {
    this.url = url;
}

ISSData.prototype.getData = function () {
  const request = new Request(this.url);
  request.get()
    .then((issData) => {
      console.log(issData);
    });
};

module.exports = ISSData;
