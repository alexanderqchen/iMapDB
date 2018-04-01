const searchBar = document.getElementById("search");
var map;
var infowindow;
var service;
var markersArray = [];

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}


function initMap() {
	//create map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 10, lng: 0},
		zoom: 2
	});

	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlacesService(map);
}

function callback(results, status) {
	//if the search works out and a location is found, it is marked on the map
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		createMarker(results[0]);
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: placeLoc
	});

	markersArray.push(marker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

//occurs when the submit button is clicked
$("#submit").on('click', (e) => {
	e.preventDefault();
	var movieTitle = searchBar.value;
	//replaces on spaces with plus signs for the request to the API 
	movieTitle = movieTitle.replace(/ /g, '+');
	console.log(movieTitle);
	//send movie name to backend, waits to obtain locations
    $.post('/', {movieTitle: movieTitle}, (locations) => {
		if(locations == []) {
			console.log("There was an error.");
		}
		else {
			console.log(locations);
			console.log(typeof locations);
			clearOverlays();
			//use google search on each location, 
			for(let i = 0; i < locations.length; i++) {
				console.log(locations[i].location);
				//callback function on each location in the array
				service.textSearch( {query: locations[i].location}, callback);
			}
		}
    });
});