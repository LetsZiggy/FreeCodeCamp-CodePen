var quote = "";
var author = "";
var tweet = "";

function getQuotes() {
  // $.ajax({
  //   url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
  //   success: function(json) {
  //     json = json.shift(); // The data is an array of posts. Grab the first one.
  //     quote = json.content.substring(3, (json.content.length - 5));
  //     author = json.title;
  //     $("#quote").html(quote);
  //     $("#author").text("- " + author);
  //     $("i").html("play_arrow");
  //     $("#get-quote").prop("disabled", false);
  //   },
  //   cache: false
  // });
  $.ajax({
    url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
    cache: false }).

  done(function (json) {
    json = json.shift(); // The data is an array of posts. Grab the first one.
    quote = json.content.substring(3, json.content.length - 5);
    author = json.title;
    $("#quote").html(quote);
    $("#author").text("- " + author);
    $("i").html("play_arrow");
    $("#get-quote").prop("disabled", false);
  });
}

function sendTweet() {
  tweet = quote + " - " + author;
  tweet = tweet.replace(/\s+/g, " ");
  tweet = tweet.replace(/((&#822)+[0-2]+;)/g, "'");
  tweet = tweet.replace(/((&#821)+[6-8]+;)/g, "'");
  tweet = tweet.replace(/((&#821)+[1-2]+;)/g, "'");
  tweet = encodeURI(tweet);
  tweet = tweet.replace(/[:;]/g, escape);
  tweet = "https://twitter.com/intent/tweet?text=" + tweet;
  $("#tweet-btn").attr("href", tweet);
}

$(document).ready(function () {
  $("#get-quote").prop("disabled", true);
  $("i").html("hourglass_full");
  getQuotes();
  $("#get-quote").on("click", function () {
    $("#get-quote").prop("disabled", true);
    $("i").html("hourglass_full");
    window.setTimeout(function () {
      getQuotes();
    }, 1000);
  });
  $("#tweet-btn").on("click", function () {
    sendTweet();
  });
});