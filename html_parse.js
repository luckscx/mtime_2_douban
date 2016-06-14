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

//{ href: 'http://movie.mtime.com/14865/',
  //title: '完美的世界/A Perfect World(1993)',
  //target: '_blank',
  //class: 'movie_75img' }
//9.8
movies.map(function(i,elem) {
    //console.log($(elem).html());
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



//str.forEach(function(one){
    //console.log(one.children);
//});

//var resArr = [];
//var handler = new htmlparser.DefaultHandler(function (error, dom) {
    //if (error){
       //console.error(error);
    //}else{
        //traverse(dom).forEach(function(one){
            //if (one && one.raw == 'div class="movie_75"') {
                //var obj = {};
                //console.log(one.children[1].attribs.title);
                //obj.szTitle = one.children[1].attribs.title;
                //obj.iRate = 10;
                //resArr.push(obj);
                ////traverse(one.children).forEach(function(one){
                    ////console.log(one);
                ////});
            //}
        //});
        ////console.log(dom);
    //}
//});
//var parser = new htmlparser.Parser(handler);
//parser.parseComplete(rawHtml);

//console.log(resArr);

//fs.createReadStream('./body.txt').pipe(parser);

