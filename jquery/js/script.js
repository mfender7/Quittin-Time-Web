$(document).ready(function() {
// TODO ensure that this gets changed to my navigation scheme
  $(document).on("pageshow", "[data-role='page']", function() {
		if ($($(this)).hasClass("header_default")) {
		  $('<header data-theme="b" data-role="header"><h1></h1><a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back" data-rel="back">Back</a><a href="#" class="ui-btn-right ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-info">Info</a></header>')
			.prependTo( $(this) )
			.toolbar({ position: "fixed" });
			$("[data-role='header'] h1").text($(this).jqmData("title"));
		} //if header_default
		$.mobile.resetActivePageHeight();

		if ($($(this)).hasClass("footer_default")) {
		  $('<footer data-theme="b" data-role="footer" data-position="fixed"><nav data-role="navbar"><ul><li><a href="#home" class="ui-btn ui-icon-home ui-btn-icon-top">Home</a></li><li><a href="#blog" class="ui-btn ui-icon-edit ui-btn-icon-top">Blog</a></li><li><a href="#videos" class="ui-btn ui-icon-video ui-btn-icon-top">Videos</a></li><li><a href="#photos" class="ui-btn ui-icon-camera ui-btn-icon-top">Photos</a></li><li><a href="#tweets" class="ui-btn ui-icon-comment ui-btn-icon-top">Tweets</a></li></ul></nav></footer>')
			.appendTo($(this))
			.toolbar({position: "fixed"});
		}
	// highlight current button on bottom navigation
	var current = $(".ui-page-active").attr('id');

    $("[data-role='footer'] a.ui-btn-active").removeClass("ui-btn-active");
    $("[data-role='footer'] a").each(function() {
      if ($(this).attr('href') === '#' + current) {
        $(this).addClass("ui-btn-active");
      }
    }); //each link in navbar
	// list recipes
	$.getJSON( "json/sampleJSON.json", function (data){listRecipes(data)});
  }); //show_page
}); //document.ready

function listRecipes(data) {
  var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';

  output += '<ul data-role="listview" data-filter="true" data-input="#searchposts">';
  // iterate through JSON matches
  // key = 0..10
  // val = object with all the goodies
  // smallImageUrls (list)
  // ingredients (list)
  // flavors
  // attributes
  //	course
  // totalTimeInSeconds
  // rating
  // recipeName
  // sourceDisplayName
  // id
  $.each(data.matches, function(key, val) {

    var tempDiv = document.createElement("tempDiv");
    tempDiv.innerHTML = val.excerpt;
    $("a", tempDiv).remove();
    var excerpt = tempDiv.innerHTML;

    output += '<li>';
    output += '<a href="#recipe-' + val.id + '" onclick = "showRecipe(' + val.id + ')">';
    output += (val.smallImageUrls[0]) ?
      '<img src="' + val.smallImageUrls[0] + '" alt="' + val.recipeName + '">':
	  // TODO change this to our logo
      '<img src="images/viewsourcelogo.png" alt="TODO">';
    output += '<h3>' + val.recipeName + "</h3>";
    // TODO insert description? output += '<p>' + excerpt + "</p>";
    output += '</a>';
    output += '</li>';
  }); //go through each post
  output += "</ul>"; // close the list
  $('#recipelist').html(output).enhanceWithin();
} //listRecipes

function showRecipe(id) {
	// $.getJSON('http://iviewsource.com/?json=get_post&post_id=' + id + '&callback=?', function(data) {
	var output = '<h3>' + val.recipeName + '</h3>';
	output += '<ol>';
	// val.instructions.forEach(entry){
	output += '<li>' + 'This is one of the directions.' /* entry */ + '</li>';
	// }
	output += '</ol>';
	$('#recipeDetail').html(output).enhanceWithin();
} // showRecipe