var notSupportedMessage = 'You are currently using {0}, ' +
  'which may not be supported by this website. You can continue using this website, ' +
  'but some elements may not function properly. The following browsers are supported:\n\n' +
  '- iOS Safari 10 and above\n' +
  '- MS Edge 37 and above\n' +
  '- Chrome 56 and above\n' +
  '- Firefox 50 and above\n' +
  '- Safari 10 and above';

if (bowser.msie) {
  alert(notSupportedMessage.replace('{0}', 'Internet Explorer ' + bowser.version));
}

var convertVersionStringToNumber = function () {
  var version = Number(bowser.version);
  return version === NaN ? -1 : version;
}

if (bowser.ios) {
  var version = convertVersionStringToNumber();
  if (version < 10.0) {
    alert(notSupportedMessage.replace('{0}', 'iOS Safari ' + bowser.version));
  }
} else if (bowser.msedge) {
  var version = convertVersionStringToNumber();
  if (version < 37.0) {
    alert(notSupportedMessage.replace('{0}', 'MS Edge ' + bowser.version));
  }
} else if (bowser.chrome) {
  var version = convertVersionStringToNumber();
  if (version < 56.0) {
    alert(notSupportedMessage.replace('{0}', 'Chrome ' + bowser.version));
  }
} else if (bowser.firefox) {
  var version = convertVersionStringToNumber();
  if (version < 50.0) {
    alert(notSupportedMessage.replace('{0}', 'Firefox ' + bowser.version));
  }
} else if (bowser.safari) {
  var version = convertVersionStringToNumber();
  if (version < 10.0) {
    alert(notSupportedMessage.replace('{0}', 'Safari ' + bowser.version));
  }
}

// Need this to show animation when go back in browser
window.onunload = function () { };

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// FitVids options
$(function () {
  $(".content").fitVids();
});

// All others
$(document).ready(function () {
  // zoom in/zoom out animations
  if ($(".container").hasClass('fadeOut')) {
    $(".container").removeClass("fadeOut").addClass("fadeIn");
  }
  // go up button
  $.goup({
    trigger: 500,
    bottomOffset: 10,
    locationOffset: 20,
    containerRadius: 0,
    containerSize: 60,
    containerColor: '#fff',
    arrowColor: '#000',
    goupSpeed: 'normal'
  });
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open. 
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});
