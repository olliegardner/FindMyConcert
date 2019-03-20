// when the user scrolls down, show the button
window.onscroll = function() { onScroll() };

function onScroll() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    	document.getElementById("go-top").style.display = "block";
  	} else {
    	document.getElementById("go-top").style.display = "none";
  	}
}

// when the user clicks on the button, scroll to the top of the document
function goTop() {
	document.body.scrollTop = 0; // Safari
  	document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}