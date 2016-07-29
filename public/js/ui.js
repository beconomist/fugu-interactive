function popMenu() {
  console.log('popMenu called');
  document.getElementsByClassName("topnav")[0].classList.toggle('responsive');
}

$(document).ready(function() {

$('.image-slider').slick({
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true
});

$('.topnav').smint({
  'scrollSpeed': 1000
});

}); // end document.ready
