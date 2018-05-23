
// Counts Characters used in tweet
$(document).ready(function() {
  $('.new-tweet textarea').on('keyup', function() {
    let maxLen = 140;
    let textLen = ($(this).val().length);
    let remainingChars = maxLen - textLen;
    let count = $('.counter')
    count.text(remainingChars)
    if (remainingChars < 0){
      count.css('color', 'red');
    } else {
      count.css('color','black')
    }
  });
});


