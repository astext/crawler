var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

request("https://pjmedia.com/", function(error, response, body) {
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
  
  
  
    $('div.title h3 a').each(function( index ) {
        var title = $(this).text().trim();
        var link = $(this).attr('href');
        fs.appendFileSync('pjmedia_' + today + '.html', '<div class="crawl-scrape"><h3>' + title + '</h3> <a target="_blank" href="https://pjmedia.com'+ link + '">' + link + '</a><br> </div>');
    });

   

  
});