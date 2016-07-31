
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var location = street + ',' + city;
    $greeting.text('Do you really want to live at ' + address + '?');
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + location;
    var $bg = $('<img>').addClass('bgimg').attr('src', url);
    $body.append($bg);

    url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': 'd42803f1d4a94ffe84ae633e29fbfa98',
      q: location
    });
    
    $.getJSON(url, function(data) {
      var $ul = $('#nytimes-articles');
      data.response.docs.forEach(function(doc) {
        var $li = $('<li>');
        var headline = doc.headline.print_headline || doc.headline.main;
        $('<h4>').text(headline).appendTo($li);
        $ul.append($li);
      });
    });
    return false;
}

$('#form-container').submit(loadData);
