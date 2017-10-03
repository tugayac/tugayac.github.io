/*** Browser Support Check ***/
var notSupportedMessage = 'You are currently using {0}, ' +
    'which may not be supported by this website. You can continue using this website, ' +
    'but some elements may not function properly. The following browsers are supported:\n\n' +
    '- iOS Safari 10 and above\n' +
    '- MS Edge 37 and above\n' +
    '- Chrome 56 and above\n' +
    '- Firefox 50 and above\n' +
    '- Safari 10 and above';

var convertVersionStringToNumber = function () {
    var version = Number(bowser.version);
    return isNaN(version) ? -1 : version;
};

var showAlert = function (message) {
    // For resetting the cookie, use "notSupportedMessageShown=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    if (!readCookie('notSupportedMessageShown')) {
        alert(message);
        setCookie('notSupportedMessageShown', 'true', 5);
    }
};

var version;
if (bowser.msie) {
    showAlert(notSupportedMessage.replace('{0}', 'Internet Explorer ' + bowser.version));
} else if (bowser.ios) {
    version = convertVersionStringToNumber();
    if (version < 10.0) {
        showAlert(notSupportedMessage.replace('{0}', 'iOS Safari ' + bowser.version));
    }
} else if (bowser.msedge) {
    version = convertVersionStringToNumber();
    if (version < 37.0) {
        showAlert(notSupportedMessage.replace('{0}', 'MS Edge ' + bowser.version));
    }
} else if (bowser.chrome) {
    version = convertVersionStringToNumber();
    if (version < 56.0) {
        showAlert(notSupportedMessage.replace('{0}', 'Chrome ' + bowser.version));
    }
} else if (bowser.firefox) {
    version = convertVersionStringToNumber();
    if (version < 50.0) {
        showAlert(notSupportedMessage.replace('{0}', 'Firefox ' + bowser.version));
    }
} else if (bowser.safari) {
    version = convertVersionStringToNumber();
    if (version < 10.0) {
        showAlert(notSupportedMessage.replace('{0}', 'Safari ' + bowser.version));
    }
}

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif'],a[href$='.svg']").addClass("image-popup");

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

/*** Check for images with errors ***/
$('img').error(function () {
    var linkElement = $(this).parent();
    linkElement.css({
        'color': 'black',
        'cursor': 'default',
        'opacity': '0.5'
    });
    linkElement.attr('href', '');
    if (linkElement.html().indexOf('Image not found') === -1) {
        linkElement.prepend('Image not found');
    }
});

/*** Cookie Utility Functions (taken from https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript) ***/
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    setCookie(name, "", -1);
}
