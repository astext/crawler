var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

request("https://www.thegatewaypundit.com/", function(error, response, body) {
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
  
  
  
    $(('h3.post-title a') || ('div.post-thumbnail a')).each(function( index ) {
        var title = $(this).text().trim();
        var link = $(this).attr('href');
        fs.appendFileSync('gpundit/gpundit_' + today + '.html', '<div class="gpundit-scrape"><h3>' + title + '</h3> <a target="_blank" href='+ link + '>' + link + '</a><br> </div>');
    });

   

  
});