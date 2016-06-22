(function() {

    //constructor function
    function Movie(title, runningTimeMinutes, year, genre, desc) {
        this.title = title;
        this.runningTimeMinutes = runningTimeMinutes;
        this.year = year;
        this.genre = genre;
        this.desc = desc;
        this.checkInDate = "None";
        this.checkOutDate = "None";
        this.available = true;
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
            this.available = false;
            this.checkOutDate = new Date();

            alert("Enjoy the movie!");

            $("#check-out").hide();
            $("#check-in").show();
        },
        checkIn: function() {
            this.available = true;
            var d = new Date();
            d.setDate(d.getDate() + randomNum(10));
            this.checkInDate = d;

            //figure out how many days it was checked out for
            var checkOutTime = this.checkOutDate.getTime();
            var checkInTime = this.checkInDate.getTime();
            var daysCheckedOut = Math.abs(checkInTime - checkOutTime) / 1000 / 60 / 60 / 24;
            var fee = Math.floor(daysCheckedOut * dailyRate);

            //alert the user about the fee incurred
            alert("Thanks for returning your movie. You owe us $" + fee + ".");

            $("#check-in").hide();
            $("#check-out").show();
        }
    }

    //make things available globally
    window.Movie = Movie;
}());
