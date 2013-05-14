var Blitz = require('blitz');
var _ = require('underscore');

var email = "joshuarogers10@gmail.com",
    apiKey = "9ff52416-7b5ae544-c8bac39d-dcdea574";
var blitz= new Blitz(email, apiKey);
var host = "http://corespring-local.herokuapp.com"

function getWebsite(path, queryParams){
    var url = host + path
    var queryPairs = _.pairs(queryParams)
    if(queryPairs.length > 0){
        url = url + "?" + queryPairs[0][0] + "=" + queryPairs[0][1];
        _.each(_.rest(queryPairs),function(pair){
            url = url + "&" + pair[0] + "=" + pair[1];
        })
    }
    return url;
}
console.log("Running a rush...");
function rush(){
    var path = "/player.js"
    var params = {
        apiClientId : "502d46ce0364068384f217a6",
        options : "fadd89c220f50509875291123cecbcf0b68968c2ea6470d79efa89ad04a7f2c681eea0e4c0cfee5898180d67e158b36f0c2f10f324d3c423b5b6173adab864ddeaf58e1dd0536004bf469f6145023ee5a065f1bc77240511ee6b6187e3493ea0a3beff5c05898dd5ad0533550a874889"
    }
    var path2 = "/player/item/50180807e4b0b89ebc0153b0/administer"
    var params2 = {}
    blitz.rush({
        steps: [
            {url: getWebsite(path, params), status: 200, timeout:800},
            {url: getWebsite(path2, params2), status: 200, timeout: 800, cookies}
        ],
        region: 'california',
        pattern: { intervals: [{start: 1, end: 10, duration: 30}]}
    }).on('status', function (data) {
        process.stdout.write('.');
    }).on('complete', function (data) {
        console.log('');
        console.log('region: ' + data.region);
        _.each(data.timeline,function(point){
                console.log("> Point ");
                console.log("\ttotal: " + point.total);
                console.log("\thits: " + point.hits);
                console.log("\terrors: " + point.errors);
                console.log("\ttimeouts: " + point.timeouts);
                console.log("\tduration: " + point.duration);
            for(var i in point.steps) {
                var step = point.steps[i];
                console.log("\t> Step " + i);
                console.log("\t\terrors: " + step.errors);
                console.log("\t\ttimeouts: " + step.timeouts);
                console.log("\t\tduration: " + step.duration);
                console.log("\t\tconnect: " + step.connect);
            }
        })
    }).on('error', function (response) {
        console.log("error: " + response.error);    
        console.log("reason: " + response.reason);
    });
}
rush();