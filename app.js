const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const http = require('http');
const MyAPIFilms = require('myapifilms-api');
const app = express();



//middleware
var logger = function(req, res, next) {
	console.log('Reloading...');
	next();
}
app.use(logger);

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

console.log("hello");

//sets path for static files
app.use(express.static(path.join(__dirname, 'public')));


//request to myapifilms directly

function getMovieLocations(movieTitle, callBack) {
	var locations = [];
	request('http://www.myapifilms.com/imdb/idIMDB?title=' + movieTitle + '&token=192453f5-4f1d-49cb-91d4-e0cb991ab10f&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=2', (error, response, data) => {
		if(error) {
			console.log("Error when calling myapifilms api.");
			callBack([]);
		}
		else {
			data = JSON.parse(data);
			locations = data.data.movies[0].filmingLocations;
			callBack(locations);
		}
	});
}

//occurs when website is loaded
app.get('/', (req, res) => {
	console.log("in get / request");
	res.send("hello");
	res.sendfile("index.html");
});

app.post('/', (req,res) => {
  var movieTitle = req.body.movieTitle;
  console.log("Movie title is = "+ movieTitle);
  getMovieLocations(movieTitle, (locations) => {
  	console.log(locations);
	//response ends by sending the locations back to the front end
  	res.json(locations);
  });
});

//defines port number the server is on
app.listen(3000, () => {
	console.log('Server started on port 3000');
});