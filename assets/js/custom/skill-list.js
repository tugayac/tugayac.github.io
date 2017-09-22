var $skillContainers = $('div.skill-container');

/*** Tag Filtering ***/
var setDisplayPropertyNone = function (container) {
  if (container.css('display') !== 'none') {
    container.data('defaultDisplayValue', container.css('display'));
    container.css('display', 'none');
  }
};

var forEachSkill = function (event) {
  return function () {
    var container = $(this);
    if (container.data('tags')) {
      var tags = container.data('tags').split(',');
      if (tags.length === 0 || tags.indexOf(event.target.dataset.tagName) === -1) {
        setDisplayPropertyNone(container);
      } else {
        container.css('display', container.data('defaultDisplayValue'));
      }
    } else {
      setDisplayPropertyNone(container);
    }
  }
};

var resetEachSkill = function () {
  var container = $(this);
  if (container.css('display') === 'none') {
    container.css('display', container.data('defaultDisplayValue'));
  }
};

var currentlySelectedTag;
var tagClickEventHandler = function (event) {
  if (currentlySelectedTag) {
    currentlySelectedTag.removeClass('selected');
  }

  if (currentlySelectedTag && currentlySelectedTag.eq(0).data('tagName') === event.target.dataset.tagName) {
    currentlySelectedTag = undefined;

    $skillContainers.each(resetEachSkill);
  } else {
    currentlySelectedTag = event.data.element;
    currentlySelectedTag.addClass('selected');

    $skillContainers.each(forEachSkill(event));
  }
};

var tagButtons = $('#tags > .tag-buttons > .btn');
tagButtons.each(function () {
  var element = $(this);
  element.on('click', { element: element }, tagClickEventHandler);
});
/*** END Tag Filtering ***/

/*** Skill Details Modal ***/
var $skillDetailsModal = $('.skill-details-modal');
$skillDetailsModal.on('click', function (event) {
  if ($(event.target).hasClass('skill-details-modal')) {
    $skillDetailsModal.css('display', 'none');
    document.body.style.overflow = 'initial';
  }
});
$skillDetailsModal.find('.close').on('click', function (event) {
  $skillDetailsModal.css('display', 'none');
  document.body.style.overflow = 'initial';
});
$skillDetailsModal.find('.btn').on('click', function (event) {
  $skillDetailsModal.css('display', 'none');
  document.body.style.overflow = 'initial';
});

$skillContainers.on('click', function (event) {
  var $relatedModal = $('div.skill-details-modal[data-skill-title="' + event.currentTarget.dataset.skillTitle + '"]');
  document.body.style.overflow = 'hidden';
  $relatedModal.css('display', 'block');
});
/*** END Skill Details Modal ***/

/*** Skill Level Info Modal ***/
var $skillLevelInfoModal = $('#skill-level-info-modal');
var $skillLevelInfoModalButton = $('.info > .btn');
$skillLevelInfoModal.on('click', function (event) {
  if (event.target.id === 'skill-level-info-modal') {
    $skillLevelInfoModal.css('display', 'none');
    document.body.style.overflow = 'initial';
  }
});
$skillLevelInfoModal.find('.close').on('click', function (event) {
  $skillLevelInfoModal.css('display', 'none');
  document.body.style.overflow = 'initial';
});
$skillLevelInfoModal.find('.btn').on('click', function (event) {
  $skillLevelInfoModal.css('display', 'none');
  document.body.style.overflow = 'initial';
});

$skillLevelInfoModalButton.on('click', function () {
  document.body.style.overflow = 'hidden';
  $skillLevelInfoModal.css('display', 'block');
});
/*** END Skill Level Info Modal ***/