module.exports = function() {
    describe('Skills Level Info Modal', function() {
        afterEach(function() {
            closeSkillsLevelInfoModal();
        });

        it('should open when it\'s link is clicked', function() {
            openSkillsLevelInfoModal();

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

        it('should display skill level bars even when skills are being filtered', function() {
            casper.then(function() {
                this.evaluate(function() {
                    var firstFilterTag = document.querySelector('#tags a.btn');
                    firstFilterTag.click();
                });
            });

            openSkillsLevelInfoModal();

            casper.then(function() {
                var skillLevelContainer = this.evaluate(function() {
                    return document.querySelector('#skill-level-info-modal .skill-container')
                });

                expect(skillLevelContainer.style.display).to.not.equal('none');
            });
        });
    });
};

function openSkillsLevelInfoModal() {
    casper.then(function() {
        this.evaluate(function() {
            var modalOpenButton = document.querySelector('.skill-list .flex-header .info > a.btn');
            modalOpenButton.click();
        });
    });
}

function closeSkillsLevelInfoModal() {
    casper.then(function() {
        this.evaluate(function() {
            var modalCloseButton = document.querySelector('#skill-level-info-modal span.close');
            modalCloseButton.click();
        });
    });
}
