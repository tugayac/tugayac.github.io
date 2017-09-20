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

var $nav = $('nav');
var $navMenuItems = $nav.find('.fluid-menu-container');
var $menuIcon = $nav.find('.menu-icon');
var $barsIcon = $menuIcon.find('i.fa-bars');
var $timesIcon = $menuIcon.find('i.fa-times');
$menuIcon.on('click', function () {
  if ($nav.hasClass('menu-open')) {
    $navMenuItems.slideUp({
      duration: 400,
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
    $navMenuItems.slideDown({
      start: function () {
        $(this).css({
          display: 'flex'
        });
      },
      duration: 400,
      easing: 'linear'
    });

    $barsIcon.fadeOut(200, function () {
      $timesIcon.fadeIn(200);
    });
  }
});

$(window).scroll(function () {
  if ($(document).scrollTop() > 70) {
    $nav.addClass('shrink');
  } else {
    $nav.removeClass('shrink');
  }
})
