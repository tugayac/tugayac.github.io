$(document).ready(function () {
  var path = window.location.pathname;

  switch (path) {
    case '/':
      $('#nav-item-about').addClass('active');
      break;
    case '/resume/':
      $('#nav-item-resume').addClass('active');
      break;
    case '/projects/':
      $('#nav-item-projects').addClass('active');
      break;
    case '/skills/':
      $('#nav-item-skills').addClass('active');
      break;
  }
});

var menuOpenFadeDuration = 200;

var $nav = $('nav');
var $navMenuItems = $nav.find('.fluid-menu-container');
var $menuIcon = $nav.find('.menu-icon');
var $barsIcon = $menuIcon.find('i.fa-bars');
var $timesIcon = $menuIcon.find('i.fa-times');
$menuIcon.on('click', function () {
  if ($nav.hasClass('menu-open')) {
    $navMenuItems.fadeOut({
      duration: menuOpenFadeDuration,
      easing: 'linear',
      complete: function () {
        $nav.removeClass('menu-open');
      }
    });

    $timesIcon.fadeOut(200, function () {
      $barsIcon.fadeIn(200);
    });
  } else {
    $nav.addClass('menu-open');
    $navMenuItems.fadeIn({
      start: function () {
        $(this).css({
          display: 'flex'
        });
      },
      duration: menuOpenFadeDuration,
      easing: 'linear'
    });

    $barsIcon.fadeOut(menuOpenFadeDuration / 2, function () {
      $timesIcon.fadeIn(menuOpenFadeDuration / 2);
    });
  }
});

$(window).scroll(function () {
  if ($(document).scrollTop() > 70) {
    $nav.addClass('shrink');
  } else {
    $nav.removeClass('shrink');
  }
});

$(window).resize(function () {
  if ($menuIcon.css('display') === 'none') {
    $nav.removeClass('menu-open');

    if ($navMenuItems.css('display') === 'none') {
      $navMenuItems.css('display', '');
    }
  } else {
    if ($navMenuItems.css('display') !== 'none') {
      $navMenuItems.css('display', 'none');
      $nav.removeClass('menu-open');
    }

    $barsIcon.css('display', '');
    $timesIcon.css('display', 'none');
  }
});
