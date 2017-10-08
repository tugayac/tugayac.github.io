var skillsLevelInfoModalTests = require('./skills-levels-info-modal');

module.exports = function () {
    describe('Skills page', function () {
        before(function () {
            casper.start('http://localhost:4000/skills/')
        });

        skillsLevelInfoModalTests();
    });
};
