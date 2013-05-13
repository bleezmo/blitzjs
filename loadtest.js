var Blitz = require('blitz');
 
var email = "joshuarogers10@gmail.com",
    apiKey = "9ff52416-7b5ae544-c8bac39d-dcdea574",
    myWebsite = "http://corespring-local.herokuapp.com",
    blitz= new Blitz(email, apiKey);
 
console.log("Running a rush...");
var step = 0;
blitz.rush({
    steps: [{url: myWebsite}],
    region: 'california',
    pattern: { intervals: [{start: 1, end: 10, duration: 30}]}
}).on('status', function (data) {
    step = step + 1;
    console.log("completed step "+step);
}).on('complete', function (data) {
    console.log("completion results: "+JSON.stringify(data))
    // console.log('region: ' + data.region);
    // console.log('duration: ' + data.timeline.duration);
    // var steps = data.timeline.steps;
    // for(var i in steps) {
    //     var step = steps[i];
    //     console.log("> Step " + i);
    //     console.log("\tstatus: " + step.response.status);
    //     console.log("\tduration: " + step.duration);
    //     console.log("\tconnect: " + step.connect);
    // }
}).on('error', function (response) {
    console.log("error: " + response.error);    
    console.log("reason: " + response.reason);
});