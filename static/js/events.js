// when the user scrolls down, show the button
/*window.onscroll = function() { onScroll() };

function onScroll() {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    	document.getElementById("go-top").style.display = "block";
  	} else {
    	document.getElementById("go-top").style.display = "none";
  	}
}

// when the user clicks on the button, scroll to the top of the document
function goTop() {
	document.body.scrollTop = 0; // Safari
  	document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}*/

$(document).ready(function() { 
    $(window).scroll(function() { 
        if ($(this).scrollTop() > 100) { 
            $('#go-top').fadeIn(); 
        } else { 
            $('#go-top').fadeOut(); 
        } 
    }); 

    $('#go-top').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 300); 
        return false; 
    }); 
});

