function popMenu() {
  console.log('popMenu called');
  document.getElementsByClassName("topnav")[0].classList.toggle('responsive');
}

$(document).ready(function() {

$('.image-slider').slick({
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false
});

$('.round-shape').hover(function(){
  $('.icon').css('display', 'inline-block');
})


}); // end document.ready
