/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("button.compose").on('click', function() { //toggle for the compose slide
    $("section.new-tweet").slideToggle("slow");
    var textInput = document.getElementById("txt");
    textInput.focus(); //auto select the text field
  })


  function escape(str) { //helper function to present users putting js in the form
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) { //helper function
    const $tempTweet= //creates a template for each tweet
    `<article class="tweet">
        <header>
          <img class="userPic" src="${tweet.user.avatars.regular}" align="bottom">
            <h3>${tweet.user.name}</h3>
            <p>${tweet.user.handle}</p>
        </header>
        <div class="content">${escape(tweet.content.text)}</div>
        <footer>${jQuery.timeago(tweet.created_at)}
          <img class="footerPic" src="/images/like.png">
          <img class="footerPic" src="/images/retweet.png">
          <img class="footerPic" src="/images/flag.png">
        </footer>
      </article>
    `;

    return $tempTweet;
  }

  function renderTweets(arrTweets) {
    $('.tweets').empty();
    arrTweets.forEach(function(tweet) { //calls the other function and loops it through the array of objects
      $('.tweets').prepend(createTweetElement(tweet));
    });
  }

  function loadTweets() {
    $.ajax({
      url:"/tweets" //the get request with AJAX
    })
    .done(data => {
      renderTweets(data); //calls the function to the data
    });
  }

  loadTweets();

  $('#txt').on('input', function() {
        $("div.nullError").slideUp(); //the error slides up on input
        $("div.longError").slideUp();
  });

  $("form").on("submit", function(e) {
    e.preventDefault(); //stops the button from redirecting
    var $textLen = $('#txt').val().length;
    if ($textLen === 0) {
      $("div.nullError").slideToggle("slow"); //if the text is empty
    } else if ($textLen > 140) {
      $("div.longError").slideToggle("slow");
    } else {
      $.ajax({
        url: $(this).attr("action"), //gets the /tweet link
        type: $(this).attr("method"), //gets the method which is "POST"
        data: $(this).serialize() //converts the data into urlencoded
      }).done(function() {
        $("#txt").val(""); //clears the textbox after submit
        loadTweets();
      });
    }
  });

});