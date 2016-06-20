(function() {

  //get NewMovieForm
  var form = document.getElementById('newMovieForm');

  //create array for movies
  var movieArray = [];

  //add an event listener to the submit button
  form.addEventListener('submit', function(evt) {
      evt.preventDefault();

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
      if (title == "" || runningTimeInMinutes == "" || isNaN(runningTimeInMinutes) || year == "" || isNaN(year) || desc == "" || genre == "None") {
        alert("Please complete the entire form with correct information.");
        form.reset();
        return;
      }

      var myMovie = new Movie(title, runningTimeInMinutes, year, genre, desc);

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

      //clear the ul
      document.getElementById('movie-list').innerHTML = '';

      //add the new sorted array objects to the ul as list items
      movieArray.forEach(function (movie) {
        var myElement = e('li', movie.title, {['data-MovieIdx']: movieArray.indexOf(movie)});
        document.getElementById('movie-list').appendChild(myElement);
      });

      document.getElementById('newMovieForm').classList.toggle('hide');
  });

  //display info in the movie details area
  document.getElementById('movie-list').addEventListener('click', function(ev) {
      movieIndex = ev.target.getAttribute(['data-MovieIdx']);
      movieArray.forEach(function (movie) {
        if (movieIndex == movieArray.indexOf(movie)) {
          document.getElementById('movie-title').innerHTML = movie.title;
          document.getElementById('time-year').innerHTML = "Running Time: " + movie.runningTimeInHours() + " " + " | " + " " + "Year Released: " + movie.year;
          document.getElementById('description').innerHTML = movie.desc;
        }
      });

      var hideCheck = document.getElementsByClassName('hide');
      for (i=0; i<hideCheck.length; i++) {
        if (document.getElementById('movieDetails')) {
        document.getElementById('movieDetails').classList.toggle('hide');
        }
      }
  });

  //show the form on button click
  document.getElementById('new-movie-btn').addEventListener('click', function() {
      document.getElementById('newMovieForm').classList.toggle('hide');
      form.reset();
  });

}());
