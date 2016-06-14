
var str = '_userCode_=2016613151784740; _userIdentity_=2016613151784680; virtualuser=virtualuser; loginEmail=luckscx%40gmail.com; _mi_=610631052112709850496101212261005.1606131622012648AFAA8AF94BE4651A311E; aliyungf_tc=AQAAAHVGDGa1TgEAIRYRDu8mLj7paC7D; _utmx_=sUJcXI+ZDKwe7C50epsm7qGx5fHW/5EA2fIJ5OkF8lI=; __utmt=1; __utmt_~1=1; Hm_lvt_6dd1e3b818c756974fb222f0eae5512e=1465802229,1465887870; Hm_lpvt_6dd1e3b818c756974fb222f0eae5512e=1465887870; DefaultCity-CookieKey=366; DefaultDistrict-CookieKey=0; __utma=225482886.2128432700.1465806079.1465813011.1465887870.3; __utmb=225482886.4.8.1465887880999; __utmc=225482886; __utmz=225482886.1465806079.1.1.utmcsr=mtime.com|utmccn=(referral)|utmcmd=referral|utmcct=/';

str.split(';').forEach(function(one){
    var arr = one.split('=');
    console.log(`'${ arr[0] }' : '${ arr[1] }',`);
});


