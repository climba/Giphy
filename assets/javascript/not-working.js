
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
      btnVal.push(newTerm);
      mkBtns(); 
     })    
    
    // Calling the function that makes the buttons to begin with
    mkBtns();


    // 
    $(".searchBtn").on("click", function(event){
        var term = $(this).attr("data-term");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            var gifZone = $("#gif-zone");
            var gifblk = $("<div>");
            
            for(var i = 0; i < results.length; i++ ) {
                var gifImg = $("<img>")
                var gifUrls = results[i].images.fixed_height.url;
                gifblk.append(gifImg);
                $(gifImg).attr("src", results[i].images.fixed_height.url);
                gifZone.append(gifblk);
                console.log(gifUrls);
                console.log(results);

            }
        })
    })