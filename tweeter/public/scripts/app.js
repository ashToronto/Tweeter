/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function(){

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

 function createFooter(data){
  var $foot = $('<footer>').addClass('tweet_lower');
  $lastTweetTime = $('<p>').addClass('tweet-time').text(data.created_at);
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

 function createTweetElement(data){
  var $dublicate = $('<article>').addClass('tweet');
  let $section = $('<section>').addClass('new_message');
  $dublicate.append($section);
  $section.append(createHeader(data));
  var $message = $('<p>').addClass('content').text(data.content.text);
  $section.append($message);
  $section.append(createFooter(data));
  return $dublicate;
 }

 // function createAndAppendTweet(tweetData) {
 //   let $tweetHtml = createTweetElement(tweet);
 //   $('.container').append($tweetHtml);
 // }

function renderTweets(tweets){
  for (tweet of tweets){
   let $tweetHtml = createTweetElement(tweet);
   $('.container').append($tweetHtml);
  }

  // for (let i = 0; i < tweets.length; i += 2) {
  //   createTweetElement(tweets[i]);
  // }

  // tweets.forEach(function (tweet) {
  //   let $tweetHtml = createTweetElement(tweet);
  //   $('.container').append($tweetHtml);
  // });

  // tweets.forEach(createAndAppendTweet);
}

renderTweets(data);

// Appends main page
  // var $tweet = createTweetElement(tweetData);
  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // console.log($tweet.html());
  // $('.container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});

// STATIC TWEET DATA
//  const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// }

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
