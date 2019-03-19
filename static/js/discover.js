
var bookmarkButtons = document.querySelectorAll(".bookmarkbutton");

bookmarkButtons.forEach(function(element) {
    element.addEventListener("click", bookmark);
});

function bookmark() {
        var concertid = (this).getAttribute('data');
        $.get('/concert/bookmark/', {concertid: concertid}); 
        toastr.success('Concert bookmarked!');

        var newElement = $(this).replaceWith('<button class="btn btn-outline-danger removebookmarkbutton" data="'+concertid+'">Remove Bookmark</button>');

        var removeBookmarkButtons = document.querySelectorAll(".removebookmarkbutton");

        removeBookmarkButtons.forEach(function(element) {
                element.addEventListener("click", removebookmark);
        });


        //Start by bookmarking the concert
};


function removebookmark() {
        var concertid = (this).getAttribute('data');
        $.get('/concert/removebookmark/', {concertid: concertid});
        toastr.error('Bookmark removed!');

        $(this).replaceWith('<button class="btn btn-success bookmarkbutton" data = "'+concertid+'"> Bookmark</button> ');

        var bookmarkButtons = document.querySelectorAll(".bookmarkbutton");

        bookmarkButtons.forEach(function(element) {
            element.addEventListener("click", bookmark);
        });

};