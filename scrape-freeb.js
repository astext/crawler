var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

request("http://freebeacon.com/", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  
  var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd
	} 

	if(mm<10) {
		mm = '0'+mm
	} 

	today = dd +  mm + yyyy;
	//document.write(today);
  
  $('article header h2 a').each(function( index ) {
    var title = $(this).text().trim();
    var link = $(this).attr('href');
    fs.appendFileSync('freebeacon_' + today + '.html', '<div class="freeb-scrape"><h3>' + title + '</h3><p><a target="_blank" href='+ link + '>' + link + '</a></p></div>');
  });

});