$(document).ready(function() {
	// set not logged in if cookie doesn't exist
	if(! window.sessionStorage.getItem('loggedIn')){
		window.sessionStorage.setItem('loggedIn', 'false');
	}
  $(document).on("pageshow", "[data-role='page']", function() {
		if ($($(this)).hasClass("header_default")) {
			var curPage = $.mobile.activePage.data('url');
			var pageUpName = '';
			var backButtonCodeNeeded = true;
			switch(curPage) {
				case "splash":
					pageUpName = "splash";
					backButtonCodeNeeded = false; // don't need a back button on the splash screen
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
			}
			// only insert back button if it's not the top directory
			var backButtonCode = backButtonCodeNeeded ? '<a href="#' + pageUpName + '" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back">'+ pageUpName + '</a>' : '';
			// data-rel="back"
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
		} //if header_default
		$.mobile.resetActivePageHeight();

	// highlight current button on bottom navigation
	//	var current = $(".ui-page-active").attr('id');
    // $("[data-role='footer'] a.ui-btn-active").removeClass("ui-btn-active");
    // $("[data-role='footer'] a").each(function() {
      // if ($(this).attr('href') === '#' + current) {
        // $(this).addClass("ui-btn-active");
      // }
    // }); //each link in navbar
	// list recipes
	// var jsonUrl = "http://80.74.134.201:3000/somerecipe?q=chicken";
	var jsonUrl =  "json/sampleJSON.json";
	// $.getJSON( jsonUrl, function (data){listRecipes(data)});
	//getData(jsonUrl);
  }); //show_page
}); //document.ready

// // Create the XHR object.
// function createCORSRequest(method, url) {
  // var xhr = new XMLHttpRequest();
  // if ("withCredentials" in xhr) {
    // // XHR for Chrome/Firefox/Opera/Safari.
    // xhr.open(method, url, true);
  // } else if (typeof XDomainRequest != "undefined") {
    // // XDomainRequest for IE.
    // xhr = new XDomainRequest();
    // xhr.open(method, url);
  // } else {
    // // CORS not supported.
    // xhr = null;
  // }
  // return xhr;
// }

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
  // return text.match('<title>(.*)?</title>')[1];
// }

// // Make the actual CORS request.
// function getData(jsonUrl)
// {

  // // All HTML5 Rocks properties support CORS.
  // var xhr = createCORSRequest('GET', jsonUrl);
  // if (!xhr) {
    // alert('CORS not supported');
    // return;
  // }

  // // Response handlers.
  // xhr.onload = function() {
    // var text = xhr.responseText;
	// listRecipes(text);
    // var title = getTitle(text);
    // alert('Response from CORS request to ' + jsonUrl + ': ' + title);
  // };

  // xhr.onerror = function() {
    // alert('Woops, there was an error making the request.');
  // };

  // xhr.send();

// // $.ajax({
  // // // The 'type' property sets the HTTP method.
  // // // A value of 'PUT' or 'DELETE' will trigger a preflight request.
  // // type: 'GET',
  // // // The URL to make the request to.
  // // url: jsonUrl,
  // // // The 'contentType' property sets the 'Content-Type' header.
  // // // The JQuery default for this property is
  // // // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
  // // // a preflight. If you set this value to anything other than
  // // // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
  // // // you will trigger a preflight request.
  // // contentType: 'text/plain',
  // // xhrFields: {
    // // // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    // // // This can be used to set the 'withCredentials' property.
    // // // Set the value to 'true' if you'd like to pass cookies to the server.
    // // // If this is enabled, your server must respond with the header
    // // // 'Access-Control-Allow-Credentials: true'.
    // // withCredentials: false
  // // },
  // // headers: {
    // // // Set any custom headers here.
    // // // If you set any non-simple headers, your server must include these
    // // // headers in the 'Access-Control-Allow-Headers' response header.
  // // },
  // // success: function(data) {
    // // // Here's where you handle a successful response.
	// // listRecipes(data);
  // // },

  // // error: function() {
    // // // Here's where you handle an error response.
    // // // Note that if the error was due to a CORS issue,
    // // // this function will still fire, but there won't be any additional
    // // // information about the error.
	// // console.log("Failed to get JSON at " + jsonUrl);
  // // }
// // });

// }
// $("#settings").on("pageshow", function() {
	// console.log("Now showing the settings");
	// var referrer =  document.referrer;
	// console.log("Referer: " + referrer);
// });

$("#recipeDetail").on("pageshow", function(){
	showDesiredRecipe();
});

$("#login").on("pageshow", function(){
	showLogin();
});
// var g_recipeJSON;
function listRecipes(data) {
	// g_recipeJSON = data;
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
		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a", tempDiv).remove();
		var excerpt = tempDiv.innerHTML;

		output += '<li>';
		output += '<a href="#recipeDetail" onclick = "showRecipe(\''+ val.id + '\')">';
		// Default icon or recipe-specific
		output += (val.smallImageUrls[0]) ?
		  '<img src="' + val.smallImageUrls[0] + '" alt="' + val.recipeName + '">':
		  '<img src="images/viewsourcelogo.png" alt="TODO">';
		output += '<h3>' + val.recipeName + "</h3>";
		output += '</a>';
		output += '</li>';
	}); //go through each post
	output += "</ul>"; // close the list
  $('#recipelist').html(output).enhanceWithin();
} //listRecipes


function showRecipe(id) {
	// var data = g_recipeJSON;
	var data = JSON.parse(window.sessionStorage.getItem('recipeJSON'));
	// find the recipe we want in our JSON file
	for (i = 0; i < data.matches.length; i++){
		if (data.matches[i].id == id){
			// set a cookie
			window.sessionStorage.setItem('desiredRecipe',JSON.stringify(data.matches[i]));
			//$.cookie("desiredRecipe", JSON.stringify(data.matches[i]));
			break;
		}		
	}
	//showDesiredRecipe();
}

function showDesiredRecipe(){
	// desiredRecipe = JSON.parse($.cookie('desiredRecipe'));
	var desiredRecipe = JSON.parse(window.sessionStorage.getItem('desiredRecipe'));
	var output = (desiredRecipe.smallImageUrls[0]) ?
		  '<img align="left" src="' + desiredRecipe.smallImageUrls[0] + '" alt="' + desiredRecipe.recipeName + '">':
		  '<img src="images/viewsourcelogo.png" alt="' + desiredRecipe.recipeName + '">';
	output += '<h3>' + desiredRecipe.recipeName + '</h3>';
	//output += '<div data-role="content" id="desiredRecipeContent">';
	output += '<div data-role="tabs" id="desiredRecipeTabs">';
	output += '<div data-role="navbar" id="desiredRecipeNavbar">';
	output += '<ul>';
	output += '<li><a href="#ingredients" data-ajax="false">Ingredients</a></li>';
	output += '<li><a href="#instructions" data-ajax="false">Instructions</a></li>';
	output += '</ul>';
	output += '</div>'; // desiredRecipeNavbar
	output += '<div id="ingredients">';
	output += '<h5>Ingredients</h5>';
	output += '<ul data-role="listview">'
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
	}
	output += '</ol>';
	output += '</div>'; // instructions
	output += '</div>'; // desiredRecipeTabs
	//output += '</div>'; // desiredRecipeContent
	$('#recipeInstructions').html(output).enhanceWithin();
} // showRecipe

var g_cuisine;
function setCuisine(cuisine){
	g_cuisine = cuisine;
	$.cookie("cuisine", JSON.stringify(g_cuisine));
	// get cookie: g_cuisine = JSON.parse($.cookie("cuisine"));
}

// $('#loginForm').submit(function(){
 // // e.preventDefault();
 // // jQuery.support.cors = true; 
 // // $.ajax({ 
     // // url: 'http://',
     // // crossDomain: true,
     // // type: 'post',
     // // data: $("#loginForm").serialize(), 
     // // success: function(data){
         // // if(data.status == 'success'){
             // // window.location.href = '#loggedIn'; 
         // // }else if(data.status == 'error'){
             // // alert("Authentication Invalid. Please try again!");
             // // return false;        
        // // }

     // // }
 // // }); 
 
 // });
 
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
	} else {
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
 //$("#exitSettings").click(function(){
	exitSettings();
 });
 
 //$("#viewSettings").click(function(){
 $(document).on('click', '#viewSettings', function(){
	viewSettings();
 });
 
 function exitSettings(){
	if (g_lastAppPage == undefined){
		console.log('g_lastAppPage is not defined');
		return;
	}
	$.mobile.navigate( "#"+g_lastAppPage);
 }
 
 function viewSettings(){
	g_lastAppPage = $.mobile.activePage.data('url');
	$.mobile.navigate('#settings');
 }