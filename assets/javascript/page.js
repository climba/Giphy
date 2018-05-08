// This section creates the buttons and adds new buttons when the user enters a new term
    
// Variable with an array of button values
var btnVal = [ "random", "cats", "puppies", "baby elephants" ];
// Loops through btnVal array items and makes buttons
var mkBtns = function(butnAdder) {
    console.log(btnVal);
    $("#btn-row").empty(); 
    for (var i = 0; i < btnVal.length; i++) {
        console.log(btnVal[i]);
            var btnCreate = $("<button>");
                $("#btn-row").append(btnCreate);
                btnCreate.attr("data-term", btnVal[i]);
                btnCreate.attr("class", "searchBtn");
                btnCreate.text(btnVal[i]);
        }
    }
    // Takes the value from the input and adds it into the array
     $("#search-term").on("click", function(event){
      event.preventDefault();
      var newTerm = $("#new-term").val().trim();
      if(newTerm === "") {
          return;
      } else {
        btnVal.push(newTerm);
        mkBtns();
      }
 
     })    
    
    // Calling the function that makes the buttons to begin with
    mkBtns();

    $(document).on("click", ".searchBtn", function(event){
        // Assign the search sting that is in the button that was added to a variable
        var term = $(this).attr("data-term");
        // Builds the search query sting with the search term and the API key
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Perfoms the Ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Assigns the response data to variable
            var results = response.data;
            // Convert the HTML id gif zone to a variable
            var gifZone = $("#gif-zone");
            // Convert the HTML div element to a variable
            var gifblk = $("<div>");
            // Loop through the array of results
            for(var i = 0; i < results.length; i++ ) {
                // Assign a HTML image tag to he variable gifImg
                var gifImg = $("<img>");
                // Create a variable that points to the animated URL of our Gif
                var gifAnimUrls = results[i].images.fixed_height.url;
                // Creates a variable that points to the still URL of our Gif
                var gifStillUrls = results[i].images.fixed_height_still.url;
                // Add the gigImg tags to the div gifBlk
                gifblk.append(gifImg);
                // Add the attribute of the animated URL into the data-animate value
                gifImg.attr("data-animate", gifAnimUrls)
                // Add the attribute of the still URL into the data-still value
                gifImg.attr("data-still", gifStillUrls)
                // Add the source URL of the still image into the src value of the image tag
                gifImg.attr("src", gifStillUrls);
                // Give the image the data-state still value
                gifImg.attr("data-state", "still");
                // Give the image the a class with the value of gifs
                gifImg.attr("class", "gifs");
                // Add the gifBlk div into the gifZone divs
                gifZone.append(gifblk);
                // console.log(gifStillUrls);
                // console.log(results);

            }
        });
    });

    $(document).on("click", ".gifs", function(){
        // Check the data state on the image and swap it on each click
        var state = $(this).attr("data-state")
        // console.log(state);
        // If its animated assign the animated URL
        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', "animate");
        // If its still assign the still URL
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
        }

    });