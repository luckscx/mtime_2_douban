/* jshint node:true*/
"use strict";
var fs = require('fs');
var traverse = require('traverse');
var htmlparser = require("htmlparser");

var szFileName = process.argv[2];
var rawHtml = fs.readFileSync(szFileName,'utf8');
fs.unlinkSync(szFileName);

var cheerio = require('cheerio');

var $ = cheerio.load(rawHtml);

var obj = $('ul.mt25.col2.clearfix').html();

var movies = $('#seenMoviesRegion').find('ul.mt25.col2.clearfix');

console.log(movies.length);

movies.map(function(i,elem) {
    var m_img = $(elem).find('.movie_75img');
    var moiveObj = m_img[0].attribs;
    var m_score = $(elem).find('.c_green.bold').html();
    console.log(' %s - %s - %d',moiveObj.title,moiveObj.href,m_score);
    var addLine = moiveObj.title + '|' + m_score + '\n'; 
    fs.appendFileSync('./full_line.txt',addLine);
});

if (movies.length > 0) {
    process.exit(0);
}else{
    process.exit(1);
}



