$(document).ready(function() {
	// if the login-toast div exists then get the message stored in data and display toast to user
    var elementExists = document.getElementById("login-toast");
    if (elementExists != null) {
        var message = document.getElementById("login-toast").getAttribute("data");
        toastr.error(message);
    };
});
