$(document).ready(function() {
    //array of button criteria
    var topics = ["Mario", "Luigi", "Yoshi", "Link", "Zelda", "Ganondorf", "Samus", "Kirby"]




    //loop to generate buttons
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons").empty();
        // Loops through the array of movies
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("newSearch", "btn", "btn-primary");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the buttons div
            $("#buttons").append(a);
        };

    };

    //ajax request to giphyapi
    function displayGif() {
        $("#gifBox").empty()
        var searchInput = $(this).attr("data-name")
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + searchInput + "&api_key=l9zU5o57KPC3Y2rjzQFsrKAxiusOn7nj&limit:50"
        console.log(searchInput)

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function(response) {
            console.log(response)
            for (var j = 0; j < response.data.length; j++) {
				var gifStill = response.data[j].images.fixed_height_still.url
                var gifAnimated = response.data[j].images.fixed_height.url
                var newGif = $("<img>")
                newGif.attr("src", gifStill)
                newGif.attr("data-still", gifStill)
                newGif.attr("data-animate", gifAnimated)
                newGif.attr("data-state", "still")
                newGif.addClass("gif")
                $("#gifBox").append(newGif)
            }
        });


    }
    $("#makebtn").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var searchVal = $("#formText").val().trim();
        console.log(searchVal)


        topics.push(searchVal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "newSearch"
    $(document).on("click", ".newSearch", displayGif);
    $(document).on("click", ".gif", changeGifState)
    function changeGifState(gifClick) {
        console.log("lol")

        var state = $(this).attr("data-state");
        console.log(gifClick)


        if (state === "still") {
            var gifAnimate = $(this).attr("data-animate")
            $(this).attr("src", gifAnimate)
            $(this).attr("data-state", "animate")
        } else if (state === "animate") {
            var gifStill = $(this).attr("data-still")
            $(this).attr("src", gifStill)
            $(this).attr("data-state", "still")

        }


    };


    renderButtons()
});