var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var requesthost = "https://www.tehrantimes.com/" ;

request(requesthost, function(error, response, body) {
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

  var pagehead = '<!doctype html><html lang="en"><meta charset="utf-8">';
  pagehead += '<title> Tehran Times scrape: ' + today + '</title>' ;
  pagehead += '<link rel="stylesheet" href="../css/astextnet.min.css">' ;
  pagehead += '</head><body>';
  pagehead += '<h1 class="px-5 py-3 bg-light">Tehran Times ' + today + '</h1>' ;
  var pagefoot = '<hr></body></html>' ;
  var pagename = 'tehran/tehran_' + today + '.html' ;

  fs.appendFileSync(pagename, pagehead) ;

  $('article h3.article-heading a').each(function( index ) {
    var title = $(this).text().trim();
    var link = $(this).attr('href').trim();
    fs.appendFileSync(pagename, '<div class="scraped px-3 pb-2"><h3 class="h3 text-success">' + title + '</h3><p class="px-3 pb-2"><a target="_blank" href="' + requesthost + link + '">' + link + '</a></p></div>');
  });

  fs.appendFileSync(pagename, pagefoot) ;

});