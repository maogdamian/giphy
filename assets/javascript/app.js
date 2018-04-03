// Initial array of tvshows
var tvshows = ["Ru Paul's Drag Race", "Big Bang Theory", "The Magicians", "Schitt's Creek", "Silicon Valley", "Game of Thrones"];

// Display the still images and setup the proper tags for later use
function displayGIFs() {

  var apiKey = "1qaYUje3YApPRqDUMngeqlma07jrXqDq";
  var searchInfo = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInfo + "&api_key=" + apiKey + "&limit=10";

  // Creates AJAX call for the specific tvshow button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response.data);

    // Empty any existing images
    $("#images-view").empty();

    // Loop for each of the returned images
    for (var i = 0; i < response.data.length; i++) {        
      // Create a var to hold the jQuery data
      var gifDiv = $("<div>", {
        class: "col-lg-4 col-md-4 col-sm-4 col-xs-12"
      });

      var gifImg = $("<img>", {
        "class": "img img-responsive gifImg",
        "src": response.data[i].images.downsized_still.url,
        "data-still": response.data[i].images.fixed_height_still.url,
        "data-animate": response.data[i].images.fixed_height.url,
        "data-state": "still"        
      });

      gifDiv.append("Rating: " + response.data[i].rating + "<br>");
      gifDiv.append(gifImg);
      $("#images-view").append(gifDiv);
    }
  });
}

// Draw the buttons at the top of the screen
function renderButtons() {
  // Delete the buttons that exist to avoid duplicates
  $("#buttons-view").empty();
  // Go through the array of buttons
  for (var i = 0; i < tvshows
  .length; i++) {
    // Create a button type
    var a = $("<button>");
    // Add a class of "tvshow"
    a.addClass("tvshow btn btn-primary btn-xs");
    // Include the data-name attribute
    a.attr("data-name", tvshows
    [i]);
    // Label the button
    a.text(tvshows
    [i]);
    // Draw the button in the div
    // buttonDiv.html(a);
    $("#buttons-view").append(a);
  }
}

// Change the animation state of each image
function animateGIF(myGIF) {
  // Store the jQuery of myGIF
  var myImg = $(myGIF);

  // Store the current data-state of the image
  var state = myImg.attr("data-state");

  // If the image is still
  if(state == "still") {
    // Change the image to the animated GIF
    myImg.attr("src", myImg.attr("data-animate"));
    // Change the data-state to animate
    myImg.attr("data-state", "animate");
  }
  // If the image is animated
  else {
    // Change teh image to the still GIF
    myImg.attr("src", myImg.attr("data-still"));
    // Change the data-state to still
    myImg.attr("data-state", "still");
  }
}

// Searches the document for a click, since .gifImg is dynamically generated
$(document).on("click", ".gifImg", function() {
  animateGIF(this);
  console.log(this);
});