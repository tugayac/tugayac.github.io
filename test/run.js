var skillsPage = require('./pages/skills/skills');

var navbar = require('./components/navbar/navbar');

casper.options.onResourceRequested = function(casper, requestData, request) {
    var skip = [
        'www.googletagmanager.com'
    ];

    skip.forEach(function(needle) {
        if (requestData.url.indexOf(needle) > 0) {
            request.abort();
        }
    });
};

skillsPage();
navbar();
