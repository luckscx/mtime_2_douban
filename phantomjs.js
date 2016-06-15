/* jshint node:true*/
"use strict";

//console.log('start new page');

var system = require('system');
var process = require('child_process');
var execFile = process.execFile;
var iPageNum = system.args[1];
var fs = require('fs');

phantom.addCookie({
	'name':     '_mi_',   
	'value':    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',  
	'domain':   'mtime.com',           
});

var iPageNum = 0;

iPageNum++;

renderPage();

function renderPage(){
    var page = require('webpage').create();

    var szUrl = 'http://my.mtime.com/movie/seen/?sort=2&pageIndex=' + iPageNum;
    var redirectURL = null;

    console.log('render ' , szUrl);

    page.open(szUrl, function (status) {
        var fileName = iPageNum + '.txt';
        console.log(fileName);
        fs.write(fileName,page.content,'w');
        execFile("node",['html_parse.js',fileName],null,function(err,stdout,stderr) {
            if (err) { console.error(err); }
            console.log(stdout);
            console.log(stderr);
            if (parseInt(stdout) === 0) {
                phantom.exit();
            }else{
                iPageNum++;
                renderPage();
            }
        });
    });
}




