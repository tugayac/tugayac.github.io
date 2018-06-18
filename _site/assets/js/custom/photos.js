var $thumbnailContainers = $('div.thumbnail-container');
var $photoLargeModal = $('#photo-large-modal');

var closeModal = function ($modal) {
    $modal.fadeOut({
        duration: 400,
        complete: function () {
            $modal.css('display', 'none');
            document.body.style.overflow = 'initial';
        }
    });
};

var mousedownEvent;
var clickEventHandler = function (check) {
    return function (event) {
        if (event.type === 'mousedown') {
            mousedownEvent = event;
        } else if (check(event) && event.type === 'mouseup') {
            if (mousedownEvent.clientX === event.clientX && mousedownEvent.clientY === event.clientY) {
                closeModal($photoLargeModal);
            }
        }
    };
};

$thumbnailContainers.on('click', function (event) {
    var photoNum = $(event.currentTarget).data('photoNum');
    var $imageDiv = $photoLargeModal.find('.image');
    $imageDiv.html('<img src="/assets/photography/photos/' + photoNum + '.jpg">');

    $photoLargeModal.fadeIn({
        duration: 400,
        start: function () {
            document.body.style.overflow = 'hidden';
            $photoLargeModal.css('display', 'block');
        }
    });
});

$photoLargeModal.on('mousedown mouseup', clickEventHandler(function (event) {
    return event.target.id === 'skill-level-info-modal';
}));
$photoLargeModal.find('.close').on('click', function () {
    closeModal($photoLargeModal);
});
$photoLargeModal.find('.btn.done').on('click', function () {
    closeModal($photoLargeModal);
});

