/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function popMenu() {
  console.log('popMenu called');
  document.getElementsByClassName("topnav")[0].classList.toggle('responsive');
}
