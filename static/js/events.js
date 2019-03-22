$(document).ready(function() {
    // automtically scrolls page so navbar is hidden
    $('html, body').animate({
        'scrollTop' : $("#events_title").position().top
    });
    
    // shows tool tip when you hover over element
    $('[data-toggle="tooltip"]').tooltip(); 

    // makes go to top button appear when user scrolls down the page
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 100) { 
            $('#go-top').fadeIn(); 
        } else { 
            $('#go-top').fadeOut(); 
        } 
    }); 

    // on button click, scroll to the top of the page
    $('#go-top').click(function() { 
        $("html, body").animate({ scrollTop: 0 }, 300); 
        return false; 
    });
});

// removes bookmark from user
function removebookmark(concertid) {
    $.get('/concert/removebookmark/', {concertid: concertid});
    toastr.error('Bookmark removed!');
};


// fire when concert is deleted
function deleteconcert() {
    toastr.error('Concert deleted!');
}


function hideparent(elem, pretty) {
    if (pretty) { // if user has pretty view enabled
        // hides tile
        $(elem).parent().parent().parent().parent().parent().parent().hide();
    } else {
        // hides table row
        $(elem).parent().parent().hide();
    }
};

// bookmark a concert
function bookmark(concertid, pretty) {
    var $requesturl = document.getElementById("bookmarkButton").getAttribute('data-url');
    $requesturl = $requesturl.replace('1',concertid);

    var $button;
    if (pretty) {
        $button = '<button class="btn btn-danger" onclick = "removebookmark(' +concertid+ ');hideparent(this, true);" >Remove Bookmark</button>';
    } else {
        $button = '<button class="btn btn-danger" onclick = "removebookmark(' +concertid+ ');hideparent(this, false);" >Remove Bookmark</button>';
    }

    //Now use AJAX to fetch the data for a the concert
    $.ajax({
        url: $requesturl ,
        type: 'GET',
        async: false,
        dataType: 'json',

        success: function(res){
            //Depending on the date of the conert, append to appropiate table
            var $concerturl ='<a href="{% url "view" 1 %}">'
            $concerturl = $concerturl.replace('1',concertid);

            if (res[0].isfuture == "True") {
                $.each(res, function(i, item) {
                    if (pretty) { // if user has pretty view enabled
                        $('<div class="col-12 col-md-6 col-lg-4 mt">').append('<div class="tile-container"><div class="tile"><div class="tile-front" style="background-image: url( '+item.image+'); background-size: cover; background-position: center;"><div class="bottom-left"><p>'+item.artist+'<br>'+item.venuename+'</p></div></div><div class="tile-back" style=" background-image: url('+item.image+'); background-size: cover; background-position: center;"><div class ="center-white-bg tileback"> <div class ="center"><h6>'+item.artist+'<br>'+item.venuename+', '+item.location+'<br>'+item.date+'<br>'+item.starttime+' - '+item.endtime+'<br></h6>   <br> ' + $concerturl + ' <button class="btn btn-outline-info">View</button></a>  <button class="btn btn-danger" onclick = "removebookmark('+ concertid+');hideparent(this, true);" >Remove Bookmark</button></div></div></div></div></div>'
                            ).appendTo('#futureevents');
                    } else {
                        $('<tr>').append('<td>'+item.artist+'</td><td colspan="2">'+item.venuename+', '+item.location+'</td><td>'+item.date+'</td><td>'+item.starttime+' - '+item.endtime+'<td colspan="2">'+$concerturl+'<button class="btn btn-outline-info">View</button></a>&nbsp<button class="btn btn-danger" onclick = "removebookmark('+ concertid+');hideparent(this, false);">Remove Bookmark</button></td>'
                            ).appendTo('#futureevents');
                    }
                });
            } else {
                $.each(res, function(i, item) {
                    if (pretty) {
                        $('<div class="col-12 col-md-6 col-lg-4 mt">').append('<div class="tile-container"><div class="tile"><div class="tile-front" style="background-image: url( '+item.image+'); background-size: cover; background-position: center;"><div class="bottom-left"><p>'+item.artist+'<br>'+item.venuename+'</p></div></div><div class="tile-back" style=" background-image: url('+item.image+'); background-size: cover; background-position: center;"><div class ="center-white-bg tileback"> <div class ="center"><h6>'+item.artist+'<br>'+item.venuename+', '+item.location+'<br>'+item.date+'<br>'+item.starttime+' - '+item.endtime+'<br></h6>   <br> ' + $concerturl + ' <button class="btn btn-outline-info">View</button></a>  <button class="btn btn-danger" onclick = "removebookmark('+ concertid+');hideparent(this, true);" >Remove Bookmark</button></div></div></div></div></div>'
                            ).appendTo('#pastevents');
                    } else {
                        $('<tr>').append('<td>'+item.artist+'</td><td colspan="2">'+item.venuename+', '+item.location+'</td><td>'+item.date+'</td><td>'+item.starttime+' - '+item.endtime+'<td colspan="2">'+$concerturl+'<button class="btn btn-outline-info">View</button></a>&nbsp<button class="btn btn-danger" onclick = "removebookmark('+ concertid+');hideparent(this, false);">Remove Bookmark</button></td>'
                            ).appendTo('#pastevents');
                    }
                });
            }
        }
    });
    $.get('/concert/bookmark/', {concertid: concertid}); 
    toastr.success('Concert bookmarked!');
};

