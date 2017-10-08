module.exports = function() {
    describe('Skills Level Info Modal', function() {
        it('should open when it\'s link is clicked', function() {
            casper.then(function() {
                this.evaluate(function() {
                    var modalOpenButton = document.querySelector('.skill-list .flex-header .info > a.btn');
                    modalOpenButton.click();
                });
            });

            casper.then(function() {
                var bodyOverflowSetting = this.evaluate(function() {
                    return document.body.style.overflow;
                });

                expect(bodyOverflowSetting).to.equal('hidden');
            });

            casper.then(function() {
                var skillLevelInfoModal = this.evaluate(function() {
                    return document.querySelector('#skill-level-info-modal');
                });

                expect(skillLevelInfoModal.style.display).to.not.equal('none');
            });
        });
    });
};
