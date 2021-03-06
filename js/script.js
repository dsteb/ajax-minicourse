(function() {

  'use strict';

  /*
    Capitalize each word in the string
  */
  function capitalize(text) {
    var lambda = function(x) {
      return x.slice(0, 1).toUpperCase() + x.slice(1);
    };
    return text.split(' ').map(lambda).join(' ');
  }

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
      var title = 'Do you really want to live at ' + address + '?';
      $greeting.text(capitalize(title));
      var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + location;
      var $bg = $('<img>').addClass('bgimg').attr('src', url);
      $body.append($bg);

      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': 'd42803f1d4a94ffe84ae633e29fbfa98',
        q: location
      });

      $.getJSON(url, function(data) {
        var title = 'New York Times articles for ' + address;
        $nytHeaderElem.text(capitalize(title));
        var $ul = $('#nytimes-articles');
        data.response.docs.forEach(function(doc) {
          var $li = $('<li>').addClass('article');
          var headline = doc.headline.print_headline || doc.headline.main;
          var paragraph = doc.lead_paragraph;
          if (headline && paragraph) {
            $('<a>').text(headline).attr('href', doc.web_url).appendTo($li);
            $('<p>').text(paragraph).appendTo($li);
            $ul.append($li);
          }
        });
      }).fail(function(err) {
        console.error(err);
        var title = 'New Your Times articles can not be loaded';
        $nytHeaderElem.text(capitalize(title));
      });

      url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + location;
      $.ajax(url, {
        dataType: 'jsonp'
      }).done(function(data) {
        var titles = data[1];
        var urls = data[3];
        for (var i = 0; i < titles.length; ++i) {
          var title = titles[i];
          var url = urls[i];
          var $li = $('<li>');
          $('<a>').attr('href', url).text(title).appendTo($li);
          $wikiElem.append($li);
        }
      });

      return false;
  }

  $('#form-container').submit(loadData);

})();
