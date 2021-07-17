document.addEventListener("DOMContentLoaded", function(event) {

    event.preventDefault();
    // make navbar visible or disappear
    this.getElementById("navButton").addEventListener("click", function(){

	var navBar = document.getElementById("navBar");
	
	if(navBar.classList.contains("navBarHide")){
	    navBar.classList.remove("navBarHide");
	    navBar.classList.add("navBarShow");
	}else if(navBar.classList.contains("navBarShow")){
	    navBar.classList.remove("navBarShow");
	    navBar.classList.add("navBarHide");
	}
    });
});
