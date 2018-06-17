var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

request("http://www.drudgereport.com/", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  $('a').each(function( index ) {
    var title = $(this).text().trim();
    var link = $(this).attr('href');
    fs.appendFileSync('drudge_170618.txt', title + '\n\r' + link + '\n\r');
  });

});