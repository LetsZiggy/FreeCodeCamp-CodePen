const api = "https://en.wikipedia.org/w/api.php?action=query&callback=?&format=json&prop=extracts%7Cinfo%7Cpageimages&generator=search&exchars=50&exlimit=20&exintro=1&explaintext=1&inprop=url&piprop=thumbnail%7Cname&pithumbsize=250&pilimit=20&gsrnamespace=0&gsrlimit=20&gsrsearch=";

function getResults(value) {
  $.getJSON( api + value, function(json) {
      let i;
      let set_html = "";

      for (i in json["query"]["pages"]) {
        set_html +=
          "<div class='result-parent'><a class='result-link' href=" + json["query"]["pages"][i]["fullurl"] + " target='_blank'>";

        if (json["query"]["pages"][i]["thumbnail"] !== undefined) {
        set_html +=
            "<img src='" + json["query"]["pages"][i]["thumbnail"]["source"] + "'>";
        }

        set_html +=
            "<div class='result-info'>"
        +     "<p class='result-title'>"
        +       "<strong>" + json["query"]["pages"][i]["title"] + "</strong>"
        +     "</p>"
        +     "<p class='result-extract'>"
        +       json["query"]["pages"][i]["extract"]
        +     "</p>"
        +   "</div>"
        + "</a></div>";
      }
      $(".results-container").html( set_html );
      $(".wrapper").css('marginBottom', '30px');
  });
}

$("#search-button").on('focus', function () {
  $(this).parent('label').addClass('active');
});

$("#search-button").on('blur', function () {
  if ($(this).val().length == 0) {
    $(this).parent('label').removeClass('active');
    $(".results-container").addClass('hidden');
    $(".wrapper").css('marginBottom', '0px');
  }
});

$("#search-button").keydown(function(e) {
  if ((e.keyCode == 13) && ($(this).val().length > 0)) {
    $(".results-container").removeClass('hidden');
    let value = $(this).val();
    value = value.replace(/^\s{1,}/g, "")
    value = value.replace(/\s{1,}$/g, "")
    value = value.replace(/\s/g, "+")
    getResults(value);
  }
});