(function() {

  //constructor function
  function Movie(title, runningTimeMinutes, year, genre, desc) {
      this.title = title;
      this.runningTimeMinutes = runningTimeMinutes;
      this.year = year;
      this.genre = genre;
      this.desc = desc;
  }

  //prototype functions
  Movie.prototype = {
      runningTimeInHours: function() {
          var min = this.runningTimeMinutes % 60;
          var hours = Math.floor(this.runningTimeMinutes / 60);
          return hours + " hours" + " " + min + " minutes";
      },
      preview: function() {
          if (this.desc.length > 50) {
              if (this.desc[49] == ' ') {
                  return this.desc.slice(0, 49) + '...';
              } else {
                  return this.desc.slice(0, 50) + '...';
              }
          } else {
              return this.desc;
          }
      },
      checkOut: function() {
        var checkOutDate = new Date();
      },
      checkIn: function() {
        var checkInDate = new Date();
      }
  }

window.Movie = Movie;

}());
