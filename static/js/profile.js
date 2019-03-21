var map;
var service;
var infowindow;

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});

document.getElementById("postusercomment").addEventListener("click", postusercomment);

function postusercomment() {
    var id = document.getElementById("postusercomment").getAttribute('data');
    var comment_url = document.getElementById("postusercomment").getAttribute('data-url');
    //MAake AJAX post request
    $.ajaxSetup({
        headers: { "X-CSRFToken": $('meta[name="csrf-token"]').attr('content') }
    });
    $.ajax({
        type: 'POST',
        url: comment_url,
        data: {'data':$('#usercommentbox').val(),'id':id},
        credentials: 'include',
        dataType: 'json',

        success:function(data){
            if (data.success == "True") {
            var $text = $('#usercommentbox').val();
            toastr.success('Comment posted succesfully');
                $("#usercommentbox").val(''); //Clear the comment box


                //Next part is a mess, this appens the new comment to the html code
                //The links are left blank deliberately for the sake of simplicity and time constraints
                //The user will have to relaod to access more fucntions
                $('<li class="media">').append(
                    $('<a href="#" class="pull-left"><img src="' +data.image+'" class="avatar"></a>'),
                    $('<div class="media-body"><a href="#"<strong class="text-success">&nbsp;&nbsp;'+data.username +'</strong></a><p>&nbsp;&nbsp;' +$text +'</p>')
                ).appendTo('#allusercomments');      

                $('#allusercomments').animate({ scrollTop: 10000000000000000 }, 50); //This is hack, scrolling too far scrolls to the bottom
                } else {
                    toastr.error('Comment not sent!');
                }      
            },

            error: function(data) {
                toastr.error('Comment not sent!');
        }
    });   
};


