function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}


const searchBar = document.getElementById("movie_name");

var movieTitle = "";

$("#submit").on('click', (e) => {
    e.preventDefault();
    var movieTitle = searchBar.value;
    movieTitle = movieTitle.replace(/ /g, "+");
    console.log(movieTitle);
});

