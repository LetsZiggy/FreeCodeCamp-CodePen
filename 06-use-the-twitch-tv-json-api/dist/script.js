var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var set_html = "";
// var json = [
//   { // 0
//     "stream": {
//       "mature": false,
//       "status": "Greg working on Electron-Vue boilerplate w/ Akira #programming #vuejs #electron",
//       "broadcaster_language": "en",
//       "display_name": "FreeCodeCamp",
//       "game": "Creative",
//       "language": "en",
//       "_id": 79776140,
//       "name": "freecodecamp",
//       "created_at": "2015-01-14T03:36:47Z",
//       "updated_at": "2016-09-17T05:00:52Z",
//       "delay": null,
//       "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png",
//       "banner": null,
//       "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-channel_offline_image-b8e133c78cd51cb0-1920x1080.png",
//       "background": null,
//       "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_banner-6f5e3445ff474aec-480.png",
//       "profile_banner_background_color": null,
//       "partner": false,
//       "url": "https://www.twitch.tv/freecodecamp",
//       "views": 161989,
//       "followers": 10048,
//       "_links": {
//         "self": "https://api.twitch.tv/kraken/channels/freecodecamp",
//         "follows": "https://api.twitch.tv/kraken/channels/freecodecamp/follows",
//         "commercial": "https://api.twitch.tv/kraken/channels/freecodecamp/commercial",
//         "stream_key": "https://api.twitch.tv/kraken/channels/freecodecamp/stream_key",
//         "chat": "https://api.twitch.tv/kraken/chat/freecodecamp",
//         "subscriptions": "https://api.twitch.tv/kraken/channels/freecodecamp/subscriptions",
//         "editors": "https://api.twitch.tv/kraken/channels/freecodecamp/editors",
//         "teams": "https://api.twitch.tv/kraken/channels/freecodecamp/teams",
//         "videos": "https://api.twitch.tv/kraken/channels/freecodecamp/videos"
//       }
//     },
//     "_links": {
//       "self": "https://api.twitch.tv/kraken/streams/freecodecamp",
//       "channel": "https://api.twitch.tv/kraken/channels/freecodecamp"
//     }
//   },
//   { // 1
//     "stream": null,
//     "display_name": "OgamingSC2",
//     "_links": {
//       "self": "https://api.twitch.tv/kraken/streams/ogamingsc2",
//       "channel": "https://api.twitch.tv/kraken/channels/ogamingsc2"
//     }
//   },
//   { // 2
//     "stream": {
//       "mature": false,
//       "status": "RERUN: StarCraft 2 - Kane vs. HuK (ZvP) - WCS Season 3 Challenger AM - Match 4",
//       "broadcaster_language": "en",
//       "display_name": "ESL_SC2",
//       "game": "StarCraft II",
//       "language": "en",
//       "_id": 30220059,
//       "name": "esl_sc2",
//       "created_at": "2012-05-02T09:59:20Z",
//       "updated_at": "2016-09-17T06:02:57Z",
//       "delay": null,
//       "logo": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg",
//       "banner": null,
//       "video_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-channel_offline_image-5a8657f8393c9d85-1920x1080.jpeg",
//       "background": null,
//       "profile_banner": "https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_banner-f8295b33d1846e75-480.jpeg",
//       "profile_banner_background_color": "#050506",
//       "partner": true,
//       "url": "https://www.twitch.tv/esl_sc2",
//       "views": 60843789,
//       "followers": 135275,
//       "_links": {
//         "self": "https://api.twitch.tv/kraken/channels/esl_sc2",
//         "follows": "https://api.twitch.tv/kraken/channels/esl_sc2/follows",
//         "commercial": "https://api.twitch.tv/kraken/channels/esl_sc2/commercial",
//         "stream_key": "https://api.twitch.tv/kraken/channels/esl_sc2/stream_key",
//         "chat": "https://api.twitch.tv/kraken/chat/esl_sc2",
//         "subscriptions": "https://api.twitch.tv/kraken/channels/esl_sc2/subscriptions",
//         "editors": "https://api.twitch.tv/kraken/channels/esl_sc2/editors",
//         "teams": "https://api.twitch.tv/kraken/channels/esl_sc2/teams",
//         "videos": "https://api.twitch.tv/kraken/channels/esl_sc2/videos"
//       }
//     },
//     "_links": {
//       "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
//       "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
//     }
//   },
//   { // 3
//     "stream": null,
//     "display_name": "noobs2ninjas",
//     "_links": {
//       "self": "https://api.twitch.tv/kraken/streams/esl_sc2",
//       "channel": "https://api.twitch.tv/kraken/channels/esl_sc2"
//     }
//   },
//   { // 4
//     "error": "Not Found",
//     "status": 404,
//     "message": "Channel 'not-a-valid-account' does not exist"
//   }
// ];

function getData() {
  /*
  *** INDIVIDUAL CHANNEL REQUEST METHOD (USING FREECODECAMP'S PROXY)
   */
  channels.forEach(function (channel) {
    var api_stream = "https://wind-bow.gomix.me/twitch-api/streams/" +
    channel + "?callback=?";
    var api_channel = "https://wind-bow.gomix.me/twitch-api/channels/" +
    channel + "?callback=?";

    $.getJSON(api_stream, function (json) {
      if (json["error"] == "Not Found") {
        set_html = "<div class = 'result-item invalid' href = 'javascript:void(0)'>" +
        "<div class='result-img-frame'>" +
        "<i class='material-icons'>report_problem</i>" +
        "</div>" +
        "<div class='result-info'>" +
        "<h5 class='result-display-name' style='font-family: Lato'>" + channel.toUpperCase() + "</h5>" +
        "<p class='result-status'>" + json["message"] + "</p>" +
        "</div>" +
        "</div>";
        $(".results").append(set_html);
      } else
      if (json["stream"] === null) {
        $.getJSON(api_channel, function (jsonNull) {
          set_html = "<a class='result-item offline' href='" + jsonNull["url"] + "' target='_blank'>" +
          "<div class='result-img-frame'>" +
          "<i class='material-icons'>visibility_off</i>" +
          "</div>" +
          "<div class='result-info'>" +
          "<h5 class='result-display-name' style='font-family: Lato'>" + jsonNull["display_name"] + "</h5>" +
          "<p class='result-status'>Not streaming at the moment.</p>" +
          "</div>" +
          "</a>";
          $(".results").append(set_html);
        });
      } else
      {
        $.getJSON(api_channel, function (jsonStream) {
          set_html = "<a class='result-item online' href='" + jsonStream["url"] + "' target='_blank'>" +
          "<div class='result-img-frame'>" +
          "<img src='" + jsonStream["logo"] + "'>" +
          "</div>" +
          "<div class='result-info'>" +
          "<h5 class='result-display-name' style='font-family: Lato'>" + jsonStream["display_name"] + "</h5>" +
          "<p class='result-status'>" + jsonStream["status"] + "</p>" +
          "</div>" +
          "</a>";
          $(".results").append(set_html);
        });
      }
    });
  });

  /*
  *** HARDCODED JSON RESULT (BASED ON FREECODECAMP'S JSON RESULT)
   */
  // var status = "";
  // var i      = 0;
  // for (i in json) {
  //   if (json[i]["stream"] === null) {
  //     status = "offline";
  //     $(".results").append(
  //         "<div class='result-item " + status + "' href='javascript:void(0)'>"
  //       +   "<div class='result-img-frame'>"
  //       +     "<i class='material-icons'>visibility_off</i>"
  //       +   "</div>"
  //       +   "<div class='result-info'>"
  //       +     "<h5 class='result-display-name'>" + json[i]["display_name"] + "</h5>"
  //       +     "<p class='result-status'>Not streaming at the moment.</p>"
  //       +   "</div>"
  //       + "</div>"
  //     );
  //   }
  //   else if (json[i]["error"] == "Not Found") {
  //     status = "invalid";
  //     $(".results").append(
  //         "<div class='result-item " + status + "' href='javascript:void(0)'>"
  //       +   "<div class='result-img-frame'>"
  //       +     "<i class='material-icons'>report_problem</i>"
  //       +   "</div>"
  //       +   "<div class='result-info'>"
  //       +     "<h5 class='result-display-name'>Channel Name</h5>"
  //       +     "<p class='result-status'>Channel not found.</p>"
  //       +   "</div>"
  //       + "</div>"
  //     );
  //   }
  //   else {
  //     status = "online";
  //     $(".results").append(
  //         "<a class='result-item " + status + "' href='" + json[i]["stream"]["url"] + "' target='_blank'>"
  //       +   "<div class='result-img-frame'>"
  //       +     "<img src='" + json[i]["stream"]["logo"] + "'>"
  //       +   "</div>"
  //       +   "<div class='result-info'>"
  //       +     "<h5 class='result-display-name'>" + json[i]["stream"]["display_name"] + "</h5>"
  //       +     "<p class='result-status'>" + json[i]["stream"]["status"] + "</p>"
  //       +   "</div>"
  //       + "</a>"
  //     );
  //   }
  // }
}

$(document).ready(function () {
  getData();

  $(".radio-label-online").click(function () {
    $(".offline").addClass("hidden");
    $(".invalid").addClass("hidden");
    $(".online").removeClass("hidden");
  });

  $(".radio-label-all").click(function () {
    $(".offline").removeClass("hidden");
    $(".invalid").removeClass("hidden");
    $(".online").removeClass("hidden");
  });

  $(".radio-label-offline").click(function () {
    $(".offline").removeClass("hidden");
    $(".invalid").removeClass("hidden");
    $(".online").addClass("hidden");
  });
});