$(document).ready(function() {
	// set not logged in if cookie doesn't exist
	if(! window.sessionStorage.getItem('loggedIn')){
		window.sessionStorage.setItem('loggedIn', 'false');
	}
	var timeToNotify = window.sessionStorage.getItem('timeToNotify');
	if(typeof timeToNotify === 'string'){ // if we have timeToNotify
		console.log('Setting up notifications again');
		notificationIntervalId = window.sessionStorage.getItem('notificationIntervalId');
		console.log('Clearing notificationIntervalId '+ notificationIntervalId);
		clearInterval(notificationIntervalId); // clear old interval
		setNotificationTimeout(); // start new interval
	} else {
		console.log("Don't have timeToNotify in session storage");
	}
	injectExcludedFoods();
	// this prevents users from pressing "ENTER" on a form to submit it,
	// which would normally redirect them to the splash screen for some reason I don't know
	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	      event.preventDefault();
	      return false;
	    }
	});
	console.log('Document ready');
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

	// fillMap();
}); //show_page

 // ---------------------------------------------------------------------------------------
 // FIND A RECIPE
 // ---------------------------------------------------------------------------------------

$("#mealSelector").on("pageshow", function(){
	// list recipes
	var jsonUrl = "http://80.74.134.201/api/somerecipe";
	// var jsonUrl =  "json/sampleJSON.json";
	console.log("About to get JSON");
	$.getJSON( jsonUrl, function (data){
		console.log("I got the JSON file");
		listRecipes(data);})
	.fail(function(jqxhr, textStatus, error){
		console.log("failed to parse JSON. Error: " + error);
	});
});

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
		output += '<li>';
		output += '<a href="#recipeDetail" onclick = "showRecipe(\''+ val.id + '\')">';
		// Default icon or recipe-specific
		// output += (val.smallImageUrls[0]) ?
			// '<img src="' + val.smallImageUrls[0] + '" alt="' + val.recipeName + '">':
			// '<img src="images/QuittinTimeIcon.png" alt="'+ val.recipeName + '">';
		output += val.images.smallUrl ?
			'<img src="' + val.images.smallUrl + '" alt="' + val.recipeName + '">':
			'<img src="images/QuittinTimeIcon.png" alt="'+ val.recipeName + '">';
		output += '<h3>' + val.recipeName + "</h3>";
		output += '</a>';
		output += '</li>';
	}); // for each post
	output += "</ul>"; // close the list
	$('#recipelist').html(output).enhanceWithin();
} //listRecipes

// store information about the recipe. showDesiredRecipe() actually does the job of painting the data
function showRecipe(id) {
	var data = JSON.parse(window.sessionStorage.getItem('recipeJSON'));
	// find the recipe we want in our JSON file
	for (i = 0; i < data.matches.length; i++){
		if (data.matches[i].id == id){
			// set a cookie
			window.sessionStorage.setItem('desiredRecipe',JSON.stringify(data.matches[i]));
			return;
		}
	} // for each match
} // showRecipe

$("#recipeDetail").on("pageshow", function(){
	showDesiredRecipe();
});

function showDesiredRecipe(){
	var desiredRecipe = JSON.parse(window.sessionStorage.getItem('desiredRecipe'));
	// var output = (desiredRecipe.smallImageUrls[0]) ?
		  // '<img align="left" src="' + desiredRecipe.smallImageUrls[0] + '" alt="' + desiredRecipe.recipeName + '">':
		  // '<img src="images/QuittinTimeIcon.png" alt="' + desiredRecipe.recipeName + '">';
	var output = (desiredRecipe.images.smallUrl) ?
		  '<img align="left" src="' + desiredRecipe.images.smallUrl + '" alt="' + desiredRecipe.recipeName + '">':
		  '<img src="images/QuittinTimeIcon.png" alt="' + desiredRecipe.recipeName + '">';
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
	output += '<form> <fieldset data-role="controlgroup">';
	for (i = 0; i < desiredRecipe.ingredients.length; i++){
		output += '<input type="checkbox" name="ingredient_checkbox_' + i + '" id="ingredient_checkbox_' + i + '">';
		output += '<label for="ingredient_checkbox_' + i + '">';
		output += desiredRecipe.ingredients[i];
		output += '</label>';
	}
	output += '</fieldset> </form>';
	output += '</div>'; // ingredients
	output += '<div id="instructions">';
	output += '<h5>Intstructions</h5>';
	// figure out if we're dealing with instructions or directions
	var instructionsOrDirections = '';
	if (desiredRecipe.hasOwnProperty('instructions')){
		instructionsOrDirections = 'instructions';
	} else if (desiredRecipe.hasOwnProperty('directions')){
		instructionsOrDirections = 'directions';
	} else {
		console.log("Couldn't find instructions or directions.");
	}
	// Guard against URLs for instructions
	// NOTE: if you take this out, convert from bracket notation to dot notation
	if (typeof(desiredRecipe[instructionsOrDirections]) == "string"){
		output += '<p> Visit <a href="' + desiredRecipe[instructionsOrDirections] + '">' + 
		desiredRecipe[instructionsOrDirections] + '</a> for instructions.</p>';
		
	} else {
		// normal case: a list of instructions
		output += '<ol data-role="listview">';
		var instructionArray;
		if (typeof(desiredRecipe[instructionsOrDirections]) == "object"){
			instructionArray = desiredRecipe[instructionsOrDirections];
		} else { // just a big string to parse
			instructionArray = desiredRecipe[instructionsOrDirections].split('. ');
		}		
		for (i = 0; i < instructionArray.length; i++){
			if (instructionArray[i] != ''){
				output += '<li>';
				output += instructionArray[i];
				output += '</li>';
			} // if instruction is not empty
		} // for each instruction
		output += '</ol>';	
	}
	output += '</div>'; // instructions
	output += '</div>'; // desiredRecipeTabs
	$('#desiredRecipeContent').html(output).enhanceWithin();
} // showRecipe

 // ---------------------------------------------------------------------------------------
 // SETTINGS
 // ---------------------------------------------------------------------------------------

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
		console.log('Navigating out of settings as expected');
	}
	$.mobile.navigate( "#"+lastPage);
 }
 
 function viewSettings(){
//	g_lastAppPage = $.mobile.activePage.data('url');
	window.sessionStorage.setItem('loggedIn',$.mobile.activePage.data('url'));
	$.mobile.navigate('#settings');
 }
 
 $("#excludedFoods").on("pageshow", function(){
 	// TODO this doesn't work yet...
	$(window).unload = function(){
		var selected = []; $('#excludedFoodsContent input:checked').each(function() {
			selected.push($(this).attr('name'));
		 });
		window.sessionStorage.setItem('excludedFoods',JSON.stringify(selected));
		console.log('Storing excludedFoods');
	};
 }); 
 
 function setCuisine(cuisine){
 	window.sessionStorage.setItem('cuisine', cuisine);
 	console.log('Cuisine '+ cuisine + " chosen.");
 }
 
 var possibleExcludedFoods = ["Liver", "Lima Beans", "Mushrooms", "Eggs", "Okra", 
 						"Tuna Fish", "Beets", "Brussel Sprouts", "Olives",
 						"Raisins", "Onions", "Blue Cheese", "Peas"];

function injectExcludedFoods(){
	var output = '<form> <fieldset data-role="controlgroup">';
	for (i = 0; i < possibleExcludedFoods.length; i++){
		var foodId = possibleExcludedFoods[i].replace(' ','_');
		output += '<input type="checkbox" name="' + foodId + '" id="' + foodId + '">';
		output += '<label for="' + foodId + '">';
		output += possibleExcludedFoods[i];
		output += '</label>';
	}
	output += '</fieldset> </form>';
	$('#excludedFoodsContent').html(output).enhanceWithin();
}
 
 // ---------------------------------------------------------------------------------------
 // PICK A GROCERY STORE
 // ---------------------------------------------------------------------------------------

function getLocation() {
    if (navigator.geolocation) {
       if ($('#groceryZip').val() != ''){ // if there's something in the search box to search for...
        	var position = explicitStoreSearch();
        	showPosition(position);
       } else {
       		console.log('Nothing in the groceryZip box; using current location');
       		navigator.geolocation.getCurrentPosition(showPosition,showError);
       }
    } else { 
        $('#storeLocatorResults').innerHTML = "Geolocation is not supported by this browser.";
    }
}

/*
 * Returns the position (lat,long) of the zip code in the search bar 
 */
function explicitStoreSearch(){
	console.log('Explicit store search');
	// var groceryKeyword = $('#groceryKeyword').val();
	var groceryZip = $('#groceryZip').val();
	var jsonUrl = 'http://80.74.134.201/api/latlong?address=' + groceryZip;
	var position;
	$.getJSON( jsonUrl, function (data){
		console.log("Got the JSON file for zip code!");
		console.log("Data: " + JSON.stringify(data));
		// latLong2parse = JSON.parse(data);
		position = { coords:{
			latitude : data.results[0].geometry.location.lat,
			longitude : data.results[0].geometry.location.lng
		}};
		//position.coords.latitude = latLong2parse.results[0].geometry.location.lat;
		//position.coords.longitude = latLong2parse.results[0].geometry.location.lng;
		return position;
	})
	.fail(function(jqxhr, textStatus, error){
		console.log("failed to parse JSON for zip. Error: " + error);
	});
	console.log("Couldn't even begin to get JSON for zip");
	position = { coords:{
			latitude : 33.7700012,
			longitude : -84.3811458
		}};
	return position;
}

/*
 * Given a position, obtain the storeJSON and put it in session storage
 */
function showPosition(position) {
    var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	window.sessionStorage.setItem('lat',lat);
	window.sessionStorage.setItem('lon',lon);
	displayCoordinates();
	var jsonUrl = 'http://80.74.134.201/api/stores?location=' + lat + ',' + lon + '&radius=5000';
	// var jsonUrl = 'json/returnedStores.json';
    $.getJSON( jsonUrl, function (data){
 		console.log("Got the JSON file  for stores");
		window.sessionStorage.setItem('storeJSON',JSON.stringify(data));
	})
  .fail(function(jqxhr, textStatus, error){
  	console.log("failed to parse JSON for places. Error: " + error);
  });
}

/*
 * Put current lat,long as placeholder of search bar
 */
function displayCoordinates(){
	// if (window.sessionStorage.getItem('lat') && window.sessionStorage.getItem('lon')){
		// var lat = window.sessionStorage.getItem('lat');
		// var lon = window.sessionStorage.getItem('lon');
		// $('#groceryZip').attr('placeholder', 'Lat:' + Number(lat).toFixed(3) + ', Long:' + Number(lon).toFixed(3)); // round to 3 decimals
	// } else {
		// console.log("Couldn't find lat and lon in session storage");
	// }
}

/*
 * When you get to storeLocator, display the stores
 */
$("#storeLocator").on("pageshow", function(){
	listStores();
});

/*
 * Prepare page fore storeLocator:
 * - Display coordinates of lat,long of current location as searchbar's placeholder
 * - If we don't have the storeJSON, get it (getLocation())
 * - Actually parse the storeJSON so we can enumerate the html for each store as a list item
 */
function listStores(){
	var lat, lon;
	if (window.sessionStorage.getItem('lat') && window.sessionStorage.getItem('lon')){
		// lat = window.sessionStorage.getItem('lat');
		// lon = window.sessionStorage.getItem('lon');
		displayCoordinates();
	} else {
		console.log("Couldn't find lat and lon in session storage for listStores()");
	}
	if (!window.sessionStorage.getItem('storeJSON')){
		finishedWithGettingLocation = false;
		getLocation();/*Wrapper();*/
		// quick and dirty trick to ensure that getLocation() finishes before executing the next line
		// while (!finishedWithGettingLocation)
		setTimeout(function(){
			console.log("timed out to call parseStoreJSON!");
			parseStoreJSON();
		},1000);
		//parseStoreJSON();
	} else {
		parseStoreJSON();		
	// } else {
		// console.log("Couldn't find a JSON for stores");
		// //getLocation();
	}
}

function getLocationWrapper(){
	getLocation();
	finishedWithGettingLocation = true;
}

/*
 * Actually put the results of the store JSON in a list in the html
 */
function parseStoreJSON(){
	var data = JSON.parse(window.sessionStorage.getItem('storeJSON')); // ,JSON.stringify(data));
	if (data === null){
		console.log('tried to get store JSON, but it data was null');
		return;
	}
	var favoriteStore = JSON.parse(window.sessionStorage.getItem('favoriteStore'));
	var output = ''; // construct output
	output += '<ul data-role="listview">';
	for (i = 0; i < data.results.length; i++){
		if (data.results[i] != ''){
			output += '<li>';
			output += '<a href="#storeDetail" onclick = "setStoreDetail(\''+ data.results[i].place_id + '\')">';
			// indicate that this is a favorite store if it is
			if (favoriteStore && favoriteStore.place_id == data.results[i].place_id){
				// output += '<div id="imageWrapper">'; // could use this for overlaying images
				// output += '<img src="' + data.results[i].icon + '">';
				output += '<img src="images/favorite.png">';
				// output += '</div>';
			} else {
				output += '<img src="' + data.results[i].icon + '">';
			}
			output += '<b>' + data.results[i].name + '</b> <br/> at ' + data.results[i].vicinity;
			output += '</a>';
			output += '</li>';
		}
	} // for each instruction
	output += '</ul>';
	$('#storeLocatorResults').html(output).enhanceWithin()/*.done(function(){
		// Scroll so that you only see the results by default
		// scroll this far: position from #storeLocatorResults to the top - the height of the header
		var scrollDist = $('#storeLocatorResults').position().top - $('header').height();
		$("#storeLocatorResults").scrollTop(scrollDist);	
	})*/;
}

// store information about the store. showDesiredStore() actually does the job of painting the data
function setStoreDetail(place_id){
	// TODO issue call for place details
	var data = JSON.parse(window.sessionStorage.getItem('storeJSON'));
	// find the recipe we want in our JSON file
	for (i = 0; i < data.results.length; i++){
		if (data.results[i].place_id == place_id){
			// set a session storage item
			// NOTE: desiredStore is store to view; favoriteStore is store to use
			window.sessionStorage.setItem('storeDetail',JSON.stringify(data.results[i]));
			return;
		}
	} // for each result
}

$("#storeDetail").on("pageshow", function(){
	showStoreDetail();
});

function showStoreDetail(){
	var desiredStore = JSON.parse(window.sessionStorage.getItem('storeDetail'));
	// desiredStore has the following fields:
	// geometry->location->lat,long
	// icon (this is a URL)
	// name
	// place_id
	// vicinity (address without city/state)
	// types (array of what this counts as--might want to throw it out if entry 0 is not grocery_or_supermarket)
	var output = (desiredStore.icon) ?
		  '<img align="left" src="' + desiredStore.icon + '" alt="' + desiredStore.name + '">':
		  '<img src="images/QuittinTimeIcon.png" alt="' + desiredStore.name + '">';
	output += '<h3>' + desiredStore.name + '</h3>';
	output += '<br/><p style="text-align:center;">' + desiredStore.vicinity + '</p>';
	output += '<button class="ui-btn ui-corner-all" onclick="setFavoriteStore(\'' + desiredStore.place_id + '\')"> Set as favorite store </button>';
	output += '<div id="favoritePlaceholder">';
	var favoriteStore = JSON.parse(window.sessionStorage.getItem('favoriteStore'));
	if (favoriteStore.place_id == desiredStore.place_id){
		// indicate that this is a favorite if it is
		output += '<table><tr><img src="images/favorite.png" style="vertical-align:middle; display:inline; padding-bottom:10px"></tr><tr><h4 style="display:inline;">Favorite store</h4></tr></table>';
	}
	output += '</div>'; // favoritePlaceholder
	$('#shownStoreContent').html(output).enhanceWithin();
} // showRecipe

function setFavoriteStore(place_id){
	var data = JSON.parse(window.sessionStorage.getItem('storeJSON'));
	// find the recipe we want in our JSON file
	for (i = 0; i < data.results.length; i++){
		if (data.results[i].place_id == place_id){
			// set a session storage item
			// NOTE: desiredStore is store to view; favoriteStore is store to use
			window.sessionStorage.setItem('favoriteStore',JSON.stringify(data.results[i]));
			$('#favoritePlaceholder').html('<table><tr><img src="images/favorite.png" style="vertical-align:middle; display:inline; padding-bottom:10px"></tr><tr><h4 style="display:inline;">Favorite store</h4></tr></table>').enhanceWithin();
			//alert(data.results[i].name + ' is now your favorite store.');
			return;
		}
	} // for each result
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            $('#storeLocatorResults').innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            $('#storeLocatorResults').innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            $('#storeLocatorResults').innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            $('#storeLocatorResults').innerHTML = "An unknown error occurred."
            break;
    }
}

 // ---------------------------------------------------------------------------------------
 // NOTIFICATIONS
 // ---------------------------------------------------------------------------------------

function notifyMe(){
	 // Let's check if the browser supports notifications
	 var timeToNotify = $('#notifyTimePicker').val();
	 if (timeToNotify == ''){ // make sure there's a valid time
	 	alert('Select a time to be notified.');
	 	return;
	 }
	 window.sessionStorage.setItem('timeToNotify',timeToNotify);
	 
	 // NOTE: Below code from https://developer.mozilla.org/en-US/docs/Web/API/notification
	 if (!("Notification" in window)) {
	    alert("This browser does not support desktop notifications");
	 }
	
	  // Let's check if the user is okay to get some notification
	 else if (Notification.permission === "granted") {
	    // If it's okay let's create a notification
	    console.log('Permission for notifications granted.');
	    setNotificationTimeout();
	 }	
	  // Otherwise, we need to ask the user for permission
	  // Note, Chrome does not implement the permission static property
	  // So we have to check for NOT 'denied' instead of 'default'
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
	
	      // Whatever the user answers, we make sure we store the information
	      if(!('permission' in Notification)) {
	        Notification.permission = permission;
	      }
	
	      // If the user is okay, let's create a notification
	      if (permission === "granted") {
	        setNotificationTimeout();
	      } else {
	      	alert('You must enable notifications to be notified.');
	      }
	    });
	 } else {
	 	alert('You must enable notifications to be notified.');
	 }
}

function setNotificationTimeout(){
	var timeToNotify = window.sessionStorage.getItem('timeToNotify');
	// convert to military time format
	var endingIndex = 0;
	var addToHour = 0;
	if (endingIndex = timeToNotify.indexOf(' PM') != -1){
		addToHour = 12; // add 12 to hour if PM
	}
	var rawTimeToNotify = timeToNotify.substring(0,timeToNotify.length-3); // get hh:mm
	var timeToNotifyArray = rawTimeToNotify.split(':');
	var hourToNotify = Number(timeToNotifyArray[0]) + addToHour;
	var minToNotify = Number(timeToNotifyArray[1]);
	var curDate = new Date($.now()); // current date
	var curHour = curDate.getHours();
	var curMinute = curDate.getMinutes();
	var curTime = curHour + ":" + curMinute; // current time
	var dateToNotify = new Date($.now()); // use current date as a base to construct proper date
	dateToNotify.setHours(hourToNotify);
	dateToNotify.setMinutes(minToNotify);
	dateToNotify.setSeconds(0);
	dateToNotify.setMilliseconds(0);
	// wait time until notification
	var waitTime = dateToNotify - curDate;
	if (waitTime < 0){
		waitTime += 24*60*60*1000; // go to the next day if necessary
	}
	window.sessionStorage.setItem('dateToNotify', dateToNotify);
	// waitTime = 5000; // for testing purposes
	console.log('Will notify in ' + waitTime/1000 + ' seconds.');
	// $.notify("images/QuittinTimeIcon.ico","Quittin' Time","It's quittin' time! View your recipes <a href='fenderco.de/#recipeSelector'>here</a>");
	// var myNotification = window.webkitNotifications.createNotification('icon.png', 'Item Saved', 'My Application Name');
	// myNotification.show();
	var notificationIntervalId = setTimeout(function(){
		// $.notify("images/QuittinTimeIcon.ico","Quittin' Time","It's quittin' time! View your recipes <a href='fenderco.de/#recipeSelector'>here</a>");
		// notification = new Notification("Quittin' Time!");
		// generateNotification();
		setInterval(function(){generateNotification();}, 24*60*60*1000); // generate a notification every day at this time
	}, waitTime);
	window.sessionStorage.setItem('notificationIntervalId', notificationIntervalId);
	$('#amIsetup').html("<p>You're all set up to get notifications on weekdays at " + timeToNotify + ".</p>").enhanceWithin();
	$('#notifyTimePicker').val(timeToNotify); // set the timeToNotify in the selector
}

function generateNotification(){
	var dateNow = new Date($.now());
	var dayOfWeek = dateNow.getDay();
	var timeToNotify = window.sessionStorage.getItem('timeToNotify');
	// Make sure it's time
	if (Math.abs(dateNow - timeToNotify) > 60*1000){ // if we're more than 1 minute off,
		console.log("It's not actually time for a notification; aborting");
		return;
	}
	if (dayOfWeek === 6 || dayOfWeek ===0){ // Saturday or Sunday
		console.log("It's the weekend, so don't give a notification");
		return;
	}
	var notification = new Notification("Quittin' Time!", {
		icon : "images/QuittinTimeIcon.ico", 
		body : "It's quittin' time! View your recipes here"
	}).onClick=function(){
		console.log('Trying to navigate to #recipeSelector');
		$.mobile.navigate("#recipeSelector");
	};
}