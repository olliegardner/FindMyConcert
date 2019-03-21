var map;
var service;
var infowindow;

function initMap() {
    //This function initialises the map in the map tab
    var venue_location = new google.maps.LatLng(55.873468, -4.292683); //Default location (boyd orr)

    //Get venuename and location
    var venuename = document.getElementById("google-map").getAttribute('data-venuename');
    var location = document.getElementById("google-map").getAttribute('data-location');    
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('google-map'), {center: venue_location, zoom: 15});

    var request = {
        query: venuename +','+ location,
        fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    //This function creates a marker on the map
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}


$(document).ready(function() {
    // loads google map when tab is pressed
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        if (target == "#map") {
            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA80wEVfNDR49oTo3yede1S6Nik_Lw6PyY&libraries=places&callback=initMap");
        };
    });

    //Scroll to the top
    $('html, body').animate({
        'scrollTop' : $("#concert_title").position().top
    });

    //Add rating if applicable
    var filledStars = document.getElementById('stars').getAttribute('data-url');
    var emptyStars = 5 - filledStars;

    for (var i = 0; i < filledStars; i++) { 
        $('<span class="fa fa-star checked"></span>').appendTo('#stars'); 
    }

    for (var i = 0; i < emptyStars; i++) { 
        $('<span class="fa fa-star"></span>').appendTo('#stars'); 
    }
});


document.getElementById("postcomment").addEventListener("click", postcomment);


function postcomment() {
    var id = document.getElementById("postcomment").getAttribute('data');
    var comment_url = document.getElementById("postcomment").getAttribute('data-url');
    //MAake AJAX post request
    $.ajaxSetup({
        headers: { "X-CSRFToken": $('meta[name="csrf-token"]').attr('content') }
    });
    $.ajax({
        type: 'POST',
        url: comment_url,
        data: {'data':$('#commentbox').val(),'id':id},
        credentials: 'include',
        dataType: 'json',
        success:function(data){
            if (data.success == "True") {
            var $text = $('#commentbox').val();
            toastr.success('Comment posted succesfully');
                $("#commentbox").val(''); //Clear the comment box


                //Next part is a mess, this appens the new comment to the html code
                //The links are left blank deliberately for the sake of simplicity and time constraints
                //The user will have to relaod to access more fucntions
                $('<li class="media">').append(
                    $('<a href="#" class="pull-left"><img src="' +data.image+'" class="avatar"></a>'),
                    $('<div class="media-body"><a href="#"<strong class="text-success">&nbsp;&nbsp;'+data.username +'</strong></a><p>&nbsp;&nbsp;' +$text +'</p>')
                    ).appendTo('#allcomments');      

                $('#allcomments').animate({ scrollTop: 10000000000000000 }, 50); //This is hack, scrolling too far scrolls to the bottom
                } else {
                    toastr.error('Comment not sent!');
                }      
            },

            error: function(data) {
                toastr.error('Comment not sent!');
        }
    });   
};


document.getElementById("ratingbutton").addEventListener("click", rateconcert);

function rateconcert() {
    var id = document.getElementById("postcomment").getAttribute('data');
    var rating_url = document.getElementById("ratingbutton").getAttribute('data-url');

    console.log(rating_url)
    var $rating = $("#rating").val();
    //MAake AJAX post request
    $.ajaxSetup({
        headers: { "X-CSRFToken": $('meta[name="csrf-token"]').attr('content') }
    });
    $.ajax({
        type: 'POST',
        url: rating_url,
        data: {'data':$rating,'id': id},
        credentials: 'include',
        dataType: 'json',
        success:function(data){
            toastr.success('Rating succesfully recorded');
            $('#ratingdiv').replaceWith('<p style = "float:right"> Thank you for rating!</p>');
            console.log('get rating data back')
            var filledStars = data.filledStars;
            var emptyStars = 5 - filledStars;

            for (var i = 0; i < filledStars; i++) { 
                $('<span class="fa fa-star checked"></span>').appendTo('#stars-not-rated'); 
                console.log('Appended')
            }

            for (var i = 0; i < emptyStars; i++) { 
                $('<span class="fa fa-star"></span>').appendTo('#stars-not-rated'); 
            }
            
        },

        error: function(data) {
            toastr.error('Rating not recorded');
        }
    });   
};

function removebookmark(concertid) {
      $.get('/concert/removebookmark/', {concertid: concertid});
      toastr.error('Bookmark removed!');
      $('#bookmarkbutton').replaceWith('<button class="btn btn-outline-success navbar-right pull-right" id = "bookmarkbutton" onclick="bookmark('+ concertid +')" >Bookmark</button></p>')
};

function bookmark(concertid) {
        $.get('/concert/bookmark/', {concertid: concertid}); 
        toastr.success('Concert bookmarked!');
        $('#bookmarkbutton').replaceWith('<button class="btn btn-outline-danger navbar-right pull-right" id = "bookmarkbutton" onclick="removebookmark('+ concertid +')" >Remove Bookmark</button></p>')

        //Start by bookmarking the concert
};
