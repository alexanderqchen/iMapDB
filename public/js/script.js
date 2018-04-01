const searchBar = document.getElementById("search");
var map;
var infowindow;
var service;

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
	if (status === google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
}

$("#submit").on('click', (e) => {
	e.preventDefault();
	var movieTitle = searchBar.value;
	movieTitle = movieTitle.replace(/ /g, '+');
	console.log(movieTitle);


	//send movie name to backend


	//get locations from backend

	//for each location
	service.textSearch({
		query: "Los Angeles"
	}, callback);
});