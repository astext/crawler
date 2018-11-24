var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var requesthost = "https://www.tehrantimes.com";

request(requesthost, function (error, response, body) {
  if (error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  var today = new Date();

  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const smonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  var ftoday = dd + '&nbsp;' + monthNames[today.getMonth()] + '&nbsp;' + yyyy;
  var fntoday = dd + smonthNames[today.getMonth()] + yyyy;


  var pagehead = '<!doctype html><html lang="en"><meta charset="utf-8">';
  pagehead += '<title> Tehran Times scrape: ' + ftoday + '</title>';
  pagehead += '<link rel="stylesheet" href="../../css/astextnet.min.css">';
  pagehead += '</head><body>';
  pagehead += '<h1 class="px-5 py-3 bg-light">Tehran Times ' + ftoday + '</h1>';
  var pagefoot = '<hr></body></html>';
  var pagename = 'output/tehran/tehran_' + fntoday + '.html';

  fs.appendFileSync(pagename, pagehead);

  $('li.news h3 a').each(function (index) {
    var title = $(this).text().trim();
    var link = $(this).attr('href').trim();
    fs.appendFileSync(pagename, '<div class="scraped px-3 pb-2 border border-light"><h3 class="h4 text-success">' + title + '</h3><p class="px-3 pb-2"><a target="_blank" href="' + requesthost + link + '">' + link + '</a></p></div>');
  });

  fs.appendFileSync(pagename, pagefoot);

});