
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

    var address = $('#street').val() + ',' + $('#city').val();
    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address;
    var $bg = $('<img>').addClass('bgimg').attr('src', url);
    // YOUR CODE GOES HERE!
    $body.append($bg);
    return false;
}

$('#form-container').submit(loadData);
