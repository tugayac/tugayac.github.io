var $skillContainers = $('.skill-list div.skill-container');

/*** Tag Filtering ***/
var setDisplayPropertyNone = function (container) {
  if (container.css('display') !== 'none') {
    container.data('defaultDisplayValue', container.css('display'));
    container.css('display', 'none');
  }
};

var forEachSkill = function (event) {
  return function () {
    var skillContainer = $(this);
    if (skillContainer.data('tags')) {
      var tags = skillContainer.data('tags').split(',');
      if (tags.length === 0 || tags.indexOf(event.target.dataset.tagName) === -1) {
        setDisplayPropertyNone(skillContainer);
      } else {
        skillContainer.css('display', skillContainer.data('defaultDisplayValue'));
      }
    } else {
      setDisplayPropertyNone(skillContainer);
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
var $currentlyOpenModal;
var closeModal = function ($modal) {
  $modal.fadeOut({
    duration: 400,
    complete: function () {
      $modal.css('display', 'none');
      document.body.style.overflow = 'initial';

      $currentlyOpenModal = undefined;
    }
  });
};

var mousedownEvent;
var previousTarget;
var clickEventHandler = function (check) {
  return function (event) {
    if (event.type === 'mousedown') {
      mousedownEvent = event;
      previousTarget = event.target;
    } else if (check(event) && event.type === 'mouseup') {
      if (mousedownEvent.clientX === event.clientX && mousedownEvent.clientY === event.clientY
          || $(previousTarget).hasClass('skill-details-modal') && $(event.target).hasClass('skill-details-modal')) {
        closeModal($currentlyOpenModal);
      }
    }
  };
};

var $skillDetailsModal = $('.skill-details-modal');
$skillDetailsModal.on('mousedown mouseup', clickEventHandler(function (event) { return $(event.target).hasClass('skill-details-modal'); }));
$skillDetailsModal.find('.close').on('click', function (event) {
  closeModal($currentlyOpenModal);
});
$skillDetailsModal.find('.btn.done').on('click', function (event) {
  closeModal($currentlyOpenModal);
});

$skillContainers.on('click', function (event) {
  var $relatedModal = $('div.skill-details-modal[data-skill-title="' + event.currentTarget.dataset.skillTitle + '"]');
  document.body.style.overflow = 'hidden';
  $relatedModal.fadeIn({
    duration: 400,
    start: function () {
      $relatedModal.css('display', 'block');
    },
    complete: function () {
      $currentlyOpenModal = $relatedModal;
    }
  });
});
/*** END Skill Details Modal ***/

/*** Skill Level Info Modal ***/
var $skillLevelInfoModal = $('#skill-level-info-modal');
var $skillLevelInfoModalButton = $('.info > .btn');
$skillLevelInfoModal.on('mousedown mouseup', clickEventHandler(function (event) { return event.target.id === 'skill-level-info-modal'; }));
$skillLevelInfoModal.find('.close').on('click', function (event) {
  closeModal($skillLevelInfoModal);
});
$skillLevelInfoModal.find('.btn.done').on('click', function (event) {
  closeModal($skillLevelInfoModal);
});

$skillLevelInfoModalButton.on('click', function () {
  document.body.style.overflow = 'hidden';
  $skillLevelInfoModal.fadeIn({
    duration: 400,
    start: function () {
      $skillLevelInfoModal.css('display', 'block');
    },
    complete: function () {
      $currentlyOpenModal = $skillLevelInfoModal;
    }
  });
});
/*** END Skill Level Info Modal ***/
