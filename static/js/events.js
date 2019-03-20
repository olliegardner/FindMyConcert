$(document).ready(function() { 
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

