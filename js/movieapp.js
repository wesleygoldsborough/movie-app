(function() {

    //get NewMovieForm
    var form = document.getElementById('newMovieForm');

    //create empty array to hold movie objects
    var movieArray = [];

    //set the daily rate for movies
    var dailyRate = 3;

    //create array containing initial movie info
    var initialMovies = [
        [
            'A Beautiful Mind',
            135,
            2001,
            'drama',
            'After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish.'
        ],
        [
            'Megamind',
            95,
            2010,
            'comedy',
            'The supervillain Megamind finally defeats his nemesis, the superhero Metro Man. But without a hero, he loses all purpose and must find new meaning to his life.'
        ],
        [
            'The Patriot',
            165,
            2000,
            'drama',
            'Peaceful farmer Benjamin Martin is driven to lead the Colonial Militia during the American Revolution when a sadistic British officer murders his son.'
        ]
    ];

    //create and push initial movie objects
    initialMovies.forEach(function(movie) {

        var myMovie = new Movie(movie[0], movie[1], movie[2], movie[3], movie[4]);

        movieArray.push(myMovie);
    });

    //append array objects to the ul as list items
    movieArray.forEach(function(movie) {
        var myElement = e('li', movie.title, {
            ['data-MovieIdx']: movieArray.indexOf(movie)
        });
        document.getElementById('movie-list').appendChild(myElement);
    });

    //add an event listener to the submit button
    form.addEventListener('submit', function(evt) {
        evt.preventDefault();

        //assign form values to variables
        var title = document.getElementById('movieTitle').value;
        var runningTimeInMinutes = document.getElementById('runningTime').value;
        var year = document.getElementById('year').value;
        var desc = document.getElementById('desc').value;
        var genreInputs = document.getElementsByName("genre");
        var genre = 'None';

        //find out which radio button is checked
        for (var i = 0; i < genreInputs.length; i++) {
            var genreInput = genreInputs[i];
            if (genreInput.checked) {
                genre = genreInput.value;
            }
        }

        //check if form was filled out with acceptable information
        var validInfo = true;
        if (title == "") {
            validInfo = false;
            $("#movieTitle").addClass("alert");
        }
        if (isNaN(runningTimeInMinutes) || runningTimeInMinutes == "") {
            validInfo = false;
            $("#runningTime").addClass("alert");
        }
        if (isNaN(year) || year == "") {
            validInfo = false;
            $("#year").addClass("alert");
        }
        if (genre == "None") {
            validInfo = false;
            $("#genre").addClass("alert");
        }
        if (desc == "") {
            validInfo = false;
            $("#desc").addClass("alert");
        }
        if (validInfo == false) {
            alert("Please fill out the form with valid info.");
            return;
        }


        //create new movie object
        var myMovie = new Movie(title, runningTimeInMinutes, year, genre, desc);

        //add the new movie object to the array
        movieArray.push(myMovie);
        form.reset();

        //sort the array in alphabetical order
        movieArray.sort(function(a, b) {
            var titleA = a.title.toLowerCase();
            var titleB = b.title.toLowerCase();

            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }

            return 0;
        });

        //hide the details section and move it out of the ul so it doesn't get cleared
        $('#movieDetails').hide();
        $('#movieDetails').appendTo('body');

        //clear the ul
        document.getElementById('movie-list').innerHTML = '';

        //add the sorted array objects to the ul as list items
        movieArray.forEach(function(movie) {
            var myElement = e('li', movie.title, {
                ['data-MovieIdx']: movieArray.indexOf(movie)
            });
            document.getElementById('movie-list').appendChild(myElement);
        });

        $('newMovieForm').hide();

    });

    //display info in the movie details area when movie is clicked on
    document.getElementById('movie-list').addEventListener('click', function(ev) {
        movieIndex = ev.target.getAttribute(['data-MovieIdx']);
        movieArray.forEach(function(movie) {
            if (movieIndex == movieArray.indexOf(movie)) {
                document.getElementById('year-display').innerHTML = "<strong>Year Released: </strong>" + movie.year;
                document.getElementById('time-display').innerHTML = "<strong>Running Time: </strong>" + movie.runningTimeInHours();
                document.getElementById('description-display').innerHTML = movie.desc;

                //display the movie details area directly below the selected movie li
                $('#movieDetails').appendTo(ev.target);
                $('#movieDetails').show();

                //add movie focus class to clicked li
                $("#movie-list li").removeClass("movie-focus");
                $(ev.target).addClass("movie-focus");

                //show or hide check in/out buttons based on availability
                if (movie.available == true) {
                  $("#check-in").hide();
                  $("#check-out").show();
                }
                else {
                  $("#check-out").hide();
                  $("#check-in").show();
                }
            }

        });

    });

    //show or hide the form on button click
    $("#new-movie-btn").click(function() {
        if ($('#newMovieForm').is(":visible")) {
            $('#newMovieForm').hide();
            $('.change-width').removeClass('col-md-8 col-sm-8').addClass('col-md-12 col-sm-12');
        } else {
            form.reset();
            $("input, textarea, #genre").removeClass("alert");
            $('#newMovieForm').show();
            $('.change-width').removeClass('col-md-12 col-sm-12').addClass('col-md-8 col-sm-8');
        }
    });

    //listen for check out
    document.getElementById('check-out').addEventListener('click', function(ev) {
        var confirmCheckOut = confirm("The fee for this movie is $" + dailyRate + " per day. Is that cool?");
        if (confirmCheckOut = true) {
            movieIndex = ev.target.parentNode.parentNode.getAttribute(['data-MovieIdx']);
            movieArray.forEach(function(movie) {
                if (movieIndex == movieArray.indexOf(movie)) {
                    movie.checkOut();
                }

            });
        }
    });

    //listen for check in
    document.getElementById('check-in').addEventListener('click', function(ev) {
        movieIndex = ev.target.parentNode.parentNode.getAttribute(['data-MovieIdx']);
        movieArray.forEach(function(movie) {
            if (movieIndex == movieArray.indexOf(movie)) {
                movie.checkIn();
            }
        });
    });

    //clear alert class on field focus and radio button click
    $("input, textarea").focus(function() {
        $(this).removeClass("alert");
    });
    $("#genre input").click(function() {
        $("#genre").removeClass("alert");
    });

    //make things available globally
    window.dailyRate = dailyRate;
}());
