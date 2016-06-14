/* jshint node:true*/

var util = require('util');
var request = require('request');
var fs = require('fs');
var async = require('async');


var iRateCount = 0;
var rate = function(iMovieID,iRate,cb) {
    var szUrl = util.format('https://movie.douban.com/j/subject/%d/interest',iMovieID);
    var options = {
        url : szUrl,
        form : {
            rating : iRate,
            interest : 'collect',
            foldcollect : 'F',
            tags : 'mtime',
            ck : 'Ohiq',
            comment : ''
        },
        headers : {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
            'Cookie' : 'bid=z-3X8mvoSjY; ll="118282"; dbcl2="49579643:DS3NChIUKfc"; ck=Ohiq;'
        }
    };
    request.post(options,function(err,res,body) {
        if (!err && body) {
            console.log('rate done %d',iRateCount++);
        }else{
            console.error(err);
        }
    });
};

var searchID = function(movieObj,cb) {
    var szTitle = movieObj.m;
    var szUrl = util.format('https://api.douban.com/v2/movie/search?q=%s',encodeURIComponent(szTitle));
    console.log('%j',movieObj);
    var bHit = false;
    request(szUrl,function(err,res,body) {
        if (!err && res.statusCode === 200 && body) {
            try{
                var result = JSON.parse(body);
                if (result.total > 0) {
                    result.subjects.forEach(function(searchObj){
                        if (!bHit && searchObj.rating.average > 0) {
                            console.log('%d - %s (%s) - %d - %d',searchObj.rating.average,searchObj.title,searchObj.original_title,searchObj.year,searchObj.id);
                            if (searchObj.year == movieObj.y || searchObj.title === movieObj.m || searchObj.original_title === movieObj.ym ) {
                                console.log('rate %s - %d in douban',searchObj.title,movieObj.r);
                                bHit = true;
                                rate(searchObj.id,movieObj.r);
                            }    
                        }
                    });
                }
            }catch(error){
                console.error(error);
            }
        }else{
            if (err) {
                console.error(err);
            }else{
                console.log('http code : %d - %s',res.statusCode,body);
            }
        }
        if (bHit === false) {
            console.log('===== no match for %s',szTitle);
        }
        setTimeout(cb,5000);
    });
};


var main = function() {
    var full_res = fs.readFileSync('./full_line.txt','utf8');

    var lines = full_res.split('\n');

    var movies = [];
    lines.forEach(function(one){
        var ttt = one.split('|');
        if (ttt.length === 2) {
            var szChineseName = ttt[0].split('/')[0];
            var szEnglishName = ttt[0].match(/\/(.*)\(/);
            if (szEnglishName &&  szEnglishName.length > 0) {
                szEnglishName = szEnglishName[0].slice(1,-1);
            }else{
                console.error(one);
            }
            var iYear = ttt[0].match(/(\d{4})/)[0];
            var iRate = Math.floor(ttt[1] / 2);
            console.log(szChineseName,szEnglishName,iRate,iYear);
            movies.push({m:szChineseName,r:iRate,y:iYear,ym:szEnglishName});
        }
    });

    async.eachSeries(movies,function(one,callback) {
        searchID(one,callback);
    });
};



if(require.main === module){
    main();
}

