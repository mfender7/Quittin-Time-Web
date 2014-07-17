$(document).ready(function() {
	// set not logged in if cookie doesn't exist
	if(! window.sessionStorage.getItem('loggedIn')){
		window.sessionStorage.setItem('loggedIn', 'false');
	}
}); // document ready
$(document).on("pageshow", "[data-role='page']", function() {
	if ($($(this)).hasClass("header_default")) {
		var curPage = $.mobile.activePage.data('url');
		var pageUpName = '';
		var backButtonCodeNeeded = true;
		switch(curPage) {
			case "splash":
				pageUpName = "splash";
				backButtonCodeNeeded = false; // don't need a back button on the splash screen
				setTimeout(function() { // automatically transition to mealSelector screen
				    window.location = "#mealSelector"; 
				 }, 1000);
				break;
			case "mealSelector":
				pageUpName = "splash";
				break;
			case "recipeDetail":
				pageUpName = "mealSelector";
				break;
			default:
				pageUpName = "splash";
				break;
		} // switch
		// only insert back button if it's not the top directory
		var backButtonCode = backButtonCodeNeeded ? '<a href="#' + pageUpName + '" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back">'+ pageUpName + '</a>' : '';
		$('<header data-theme="b" data-role="header"><h1></h1>'+ backButtonCode + '<button class="ui-btn-right ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-gear" id="viewSettings">Settings</a></header>')
		.prependTo( $(this) )
		.toolbar({ position: "fixed" });
		$("[data-role='header'] h1").text($(this).jqmData("title"));
	} //if header_default
	if ($($(this)).hasClass("header_settings")) {
		$('<header data-theme="b" data-role="header"><h1></h1><a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back" data-rel="back">Back</a><button  class="ui-btn-right ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-gear ui-btn-active" id="exitSettings">exit settings</a></header>')
		.prependTo( $(this) )
		.toolbar({ position: "fixed" });
		$("[data-role='header'] h1").text($(this).jqmData("title"));
	} //if header_settings
	$.mobile.resetActivePageHeight();

	// list recipes
	// var jsonUrl = "http://80.74.134.201/api/somerecipe";
	var jsonUrl =  "json/sampleJSON.json";
	console.log("About to get JSON");
	$.getJSON( jsonUrl, function (data){
		console.log("I got the JSON file");
		listRecipes(data);})
	.fail(function(jqxhr, textStatus, error){
		console.log("failed to parse JSON. Error: " + error);
	});
	// fillMap();
}); //show_page

function listRecipes(data) {
	window.sessionStorage.setItem('recipeJSON',JSON.stringify(data));
	var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';
	output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';
	// iterate through JSON matches
	// key = 0..10
	// val = object with all the goodies
	// smallImageUrls (list)
	// ingredients (list)
	// flavors
	// attributes
	// course
	// totalTimeInSeconds
	// rating
	// recipeName
	// sourceDisplayName
	// id
	// Loop through recipes
	$.each(data.matches, function(key, val) {
		// var tempDiv = document.createElement("tempDiv");
		// tempDiv.innerHTML = val.excerpt;
		// $("a", tempDiv).remove();
		// var excerpt = tempDiv.innerHTML;
		output += '<li>';
		output += '<a href="#recipeDetail" onclick = "showRecipe(\''+ val.id + '\')">';
		// Default icon or recipe-specific
		output += (val.smallImageUrls[0]) ?
			'<img src="' + val.smallImageUrls[0] + '" alt="' + val.recipeName + '">':
			'<img src="images/QuittinTimeIcon.png" alt="'+ val.recipeName + '">';
		// output += (val.image) ?
			// '<img src="' + val.image + '" alt="' + val.recipeName + '">':
			// '<img src="images/QuittinTimeIcon.png" alt="' + val.recipeName + '">';
		output += '<h3>' + val.recipeName + "</h3>";
		output += '</a>';
		output += '</li>';
	}); // for each post
	output += "</ul>"; // close the list
	$('#recipelist').html(output).enhanceWithin();
} //listRecipes

$("#recipeDetail").on("pageshow", function(){
	showDesiredRecipe();
});

function showRecipe(id) {
	var data = JSON.parse(window.sessionStorage.getItem('recipeJSON'));
	// find the recipe we want in our JSON file
	for (i = 0; i < data.matches.length; i++){
		if (data.matches[i].id == id){
			// set a cookie
			window.sessionStorage.setItem('desiredRecipe',JSON.stringify(data.matches[i]));
			break;
		}
	} // for each match
} // showRecipe

function showDesiredRecipe(){
	var desiredRecipe = JSON.parse(window.sessionStorage.getItem('desiredRecipe'));
	var output = (desiredRecipe.smallImageUrls[0]) ?
		  '<img align="left" src="' + desiredRecipe.smallImageUrls[0] + '" alt="' + desiredRecipe.recipeName + '">':
		  '<img src="images/viewsourcelogo.png" alt="' + desiredRecipe.recipeName + '">';
	output += '<h3>' + desiredRecipe.recipeName + '</h3>';
	output += '<div data-role="tabs" id="desiredRecipeTabs">';
	output += '<div data-role="navbar" id="desiredRecipeNavbar">';
	output += '<ul>';
	output += '<li><a href="#ingredients" data-ajax="false" class="ui-btn-active ui-state-persist">Ingredients</a></li>';
	output += '<li><a href="#instructions" data-ajax="false">Instructions</a></li>';
	output += '</ul>';
	output += '</div>'; // desiredRecipeNavbar
	output += '<div id="ingredients">';
	output += '<h5>Ingredients</h5>';
	output += '<ul data-role="listview">';
	for (i = 0; i < desiredRecipe.ingredients.length; i++){
		output += '<li>';
		output += desiredRecipe.ingredients[i];
		output += '</li>';
	}
	output += '</ul>';
	output += '</div>'; // ingredients
	output += '<div id="instructions">';
	output += '<h5>Intstructions</h5>';
	output += '<ol data-role="listview">';
	var instructionArray = desiredRecipe.instructions.split('.');
	for (i = 0; i < instructionArray.length; i++){
		if (instructionArray[i] != ''){
			output += '<li>';
			output += instructionArray[i];
			output += '</li>';
		}
	} // for each instruction
	output += '</ol>';
	output += '</div>'; // instructions
	output += '</div>'; // desiredRecipeTabs
	$('#desiredRecipeContent').html(output).enhanceWithin();
} // showRecipe

$("#login").on("pageshow", function(){
	showLogin();
});

function showLogin(){
	var output = '';
	loggedIn = window.sessionStorage.getItem('loggedIn');
	if (loggedIn === 'false'){
		output = '<form action="#" id="loginForm">\
					<input type="text" name="username" placeholder="username">\
					<input type="password" name="password" placeholder="password">\
					<div data-role="fieldcontain" class="ui-hide-label">\
						<fieldset data-role="controlgroup">\
						   <input type="checkbox" name="checkbox-agree" id="checkbox-remember"/>\
						   <label for="checkbox-remember">Remember me</label>\
						</fieldset>\
					</div>\
					<!-- <input type="submit" value="Login"> -->\
					<a class="ui-btn ui-corner-all" onclick="login()">Login</a>\
				</form>';
	} else { // Already logged in
		output = '<h3>Logged In</h3><a href="#login" class="ui-btn ui-corner-all">Log out</a>';
	}
	$('#loginContent').html(output).enhanceWithin();
 }
 
 function login(){
	// TODO implement login
	window.sessionStorage.setItem('loggedIn','true');
	showLogin();
 }

 var g_lastAppPage;
 $(document).on('click', '#exitSettings', function(){
	exitSettings();
 });
 $(document).on('click', '#viewSettings', function(){
	viewSettings();
 });
 
 function exitSettings(){
 	var lastPage = window.sessionStorage.getItem('loggedIn');
	if (lastPage == undefined){
		console.log('g_lastAppPage is not defined');
		return;
	} else {
		console.log('navigating as expected');
	}
	$.mobile.navigate( "#"+lastPage);
 }
 
 function viewSettings(){
//	g_lastAppPage = $.mobile.activePage.data('url');
	window.sessionStorage.setItem('loggedIn',$.mobile.activePage.data('url'));
	$.mobile.navigate('#settings');
 }
 
// // the select function uses the viewport of the chosen location to relocate the map
// function fillMap() {
    // // var map = new google.maps.Map(document.getElementById("storeLocatorMap"), { mapTypeId: google.maps.MapTypeId.ROADMAP });
// // 
	// // $('#locationInput').geo_autocomplete({
		// // select: function(_event, _ui) {
			// // if (_ui.item.viewport) map.fitBounds(_ui.item.viewport);
		// // }
	// // });
	// $("#geocomplete").geocomplete({
	  // map: ".map_canvas",
	  // location: "Atlanta, GA" // TODO update this to GPS coordinates
	// });
// }

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else { 
        $('#mapCanvas').innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $('#mapCanvas').html("<p>Latitude: " + position.coords.latitude + 
    	"<br>Longitude: " + position.coords.longitude + "</p>").enhanceWithin();
	var lat = position.coords.latitude;
	var long = position.coords.longitude;
	// var jsonUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=grocery_or_supermarket&location=' + lat + ',' + long + '&radius=5000&key=AIzaSyAdALk9fKSutYxvkBmfrODopOu1xuWRddc';
	var jsonUrl = 'json/returnedStores.json';
    $.getJSON( jsonUrl, function (data){
 		console.log("I got the JSON file for places!");
		// TODO handle json
		listStores(data);
	})
  .fail(function(jqxhr, textStatus, error){
  	console.log("failed to parse JSON for places. Error: " + error);
  });
}

function listStores(data){
	var output = ''; // construct output
	output += '<ul data-role="listview">';
	for (i = 0; i < data.results.length; i++){
		if (data.results[i] != ''){
			output += '<li>';
			output += '<a href="#storeDetail" onclick = "showStore(\''+ data.results[i].place_id + '\')">';
			output += '<b>' + data.results[i].name + '</b> <br/> at ' + data.results[i].vicinity;
			output += '</a>';
			output += '</li>';
		}
	} // for each instruction
	output += '</ul>';
	$('#mapCanvas').html(output).enhanceWithin();
	
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $('#mapCanvas').innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            $('#mapCanvas').innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            $('#mapCanvas').innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            $('#mapCanvas').innerHTML = "An unknown error occurred."
            break;
    }
}