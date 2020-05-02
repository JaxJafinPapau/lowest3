var express = require('express');
var router = express.Router();

var https = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
  let dataLocation = "https://www.iwillfearnoevil.com/screen/string.txt";
  let targetIntegers;
  const externalRequest = https.request(dataLocation, externalResponse => {
    externalResponse.on('data', responseBuffer => {
      let responseJson = Buffer.from(responseBuffer);
      let rawIntegers = responseJson.toString('utf-8').split("\n");
      let orderedIntegers = sortAndUniqify(rawIntegers);
      let firstThree = [orderedIntegers[0], orderedIntegers[1], orderedIntegers[2]];
      res.render('index', { targetIntegers: firstThree, dataLocation: dataLocation });
    });
  });

  externalRequest.on('error', error => {
    console.error(error);
  });

  externalRequest.end();

  sortAndUniqify = (intArray) => {
    let uniqueInts = {};
    intArray.forEach(int => {
      // This leverages the nature of objects in JS, which will order and constrain unique keys
      let parsed = parseInt(int);
      uniqueInts[`${parsed}`] = parsed;
    });
    return Object.values(uniqueInts);
  };
});

module.exports = router;
