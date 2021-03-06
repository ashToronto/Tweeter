/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

// Time since last Tweet //When server starts it sets a new time stamp// New time stamp
function timeStamp(date){
    var TS = new Date();
    var secondsDiff = Math.floor((TS - date)/1000); // seconds time difference
    var numMonths = Math.floor(numDays / 30);
    var numYears = Math.floor(secondsDiff / 31536000)
    if (numYears > 1){
        return numYears + " years old"
    }
    var numDays = Math.floor(secondsDiff / 86400);
    if (numDays > 1){
        return numDays + " days old"
    }
    var numHours = Math.floor(secondsDiff / 3600);
    if (numHours > 1 ){
        return numHours + " hours ago"
    }
    var numMinutes = Math.floor(((secondsDiff % 86400) % 3600) / 60);
    if (numMinutes > 3){
        return numMinutes + " minutes ago"
    } else {
        return 'Now'
    }


    // return timeDifference + 'seconds';
}


    // Create Header
    function createHeader(data) {
        var $title = $('<header>').addClass('tweet_head');
        var $handler = $('<p>').addClass('handle').text(data.user.handle);
        $title.append($handler);
        var $Avatar = $('<img>').attr('src', data.user.avatars.small).addClass('picture');
        $title.append($Avatar);
        $profileName = $('<h3>').addClass('username').text(data.user.name);
        $title.append($profileName);
        return $title;
    };

    // Create Footer
    function createFooter(data) {
        var $foot = $('<footer>').addClass('tweet_lower');
        $lastTweetTime = $('<time>').text(timeStamp(data.created_at));
        $foot.append($lastTweetTime);
        let $hoverIcons = $('<span>').addClass('tweet_options');
        $foot.append($hoverIcons);
        let $flag = $("<l>").addClass('fa fa-flag');
        $hoverIcons.append($flag);
        let $reTweet = $("<l>").addClass('fa fa-retweet');
        $hoverIcons.append($reTweet);
        let $like = $("<l>").addClass('fa fa-heart');
        $hoverIcons.append($like);
        return $foot;
    }

    // Join Header + Footer => Generate New Tweet
    function createTweetElement(data) {
        var $dublicate = $('<article>').addClass('tweet');
        let $section = $('<section>').addClass('new_message');
        $dublicate.append($section);
        $section.append(createHeader(data));
        var $message = $('<p>').addClass('content').text(data.content.text);
        $section.append($message);
        $section.append(createFooter(data));
        return $dublicate;
    }

    // Compose Button Hide and Show
    $(document).ready(function(){
          $(".composeTweet").click(function(){
          $(".new-tweet").toggle(500);
      });
    });

    //Set Cursor automatically on Textarea
    $(".textField").focus();
    $(".textField").select();
    $(document).ready(function(){
         $(".composeTweet").click(function(){
         $(".textField").focus();
         $(".textField").select();
      });
    });

    //Hide TextField on initial load
    $(window).load(function(){
      $('.new-tweet').hide();
    });

    // Loop through Objects and show them
    function renderTweets(tweets) {
      $('.base').empty();
        for (tweet of tweets) {
            let $tweetHtml = createTweetElement(tweet);
            $('.base').append($tweetHtml);
        }
    }

    //AJAX GET REQUEST
    function loadTweets() {
        $.ajax({
            url: '/tweets',
            method: 'GET',
            success: function(tweets) {
              tweets.reverse();
              renderTweets(tweets);
            }
        });
    };

    // Prevent Form from re-directing + AJAX POST + Form control
    $(".sendTweet").on('submit', function(event) {
        var $sendTweet = $(this)
        event.preventDefault();
        var $tweetMessage = $('textarea').val();
        if ($tweetMessage.length > 0 && $tweetMessage.length < 140) {
            var serializedMessage = $(this).serialize();
            $.post("/tweets", serializedMessage, function() {
                console.log(serializedMessage)
                loadTweets();
            });
        } else if ($tweetMessage.length > 140) {
            alert("Your tweet is too Long");
        } else if ($tweetMessage.length === 0) {
            alert("Please type in a tweet")
        }
    });
    loadTweets();
});
