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