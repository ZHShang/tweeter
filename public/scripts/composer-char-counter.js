/*This is a helper function that calculates the amount of characters the user has inputted
as well as making the counter dynamic, turning the counter to red if it's over 140 chars.
*/
$(document).ready(function(){
  $('#txt').on('input', function(){
    var totalChars = $(this).val().length;
    var charLeft = 140;
    charLeft = charLeft - totalChars;
    $(this).parent().find('span').html(charLeft);
    if(charLeft < 0){
      $(this).parent().find('span').css("color", "red");
    } else {
      $(this).parent().find('span').css("color", "black");
    }
  });
});