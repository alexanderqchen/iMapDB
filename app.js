const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const http = require('http');
const MyAPIFilms = require('myapifilms-api');

const ejs = require('ejs');

const fs = require('fs');
const myCss = {
	style : fs.readFileSync('public/css/styles.css','utf8')
};

const myJs = {
	js : fs.readFileSync('public/js/script.js','utf8')
}



//middleware
var logger = function(req, res, next) {
	console.log('Reloading...');
	next();
}
app.use(logger);


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

console.log("hello");

//sets path for static files
//app.use(express.static(path.join(__dirname, 'public')));

/*
//request to myapifilms
request('http://www.myapifilms.com/imdb/idIMDB?title=The+Force+Awakens&token=192453f5-4f1d-49cb-91d4-e0cb991ab10f&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=2', (error, response, data) => {
	if(error) {
		console.log("Error when calling myapifilms api.");
	}
	else {
		data = JSON.parse(data);
		var movieTitle = data.data.movies[0].title;
		console.log(movieTitle);

		var id = data.data.movies[0].idIMDB;
		console.log(id);
	}
});
*/

//occurs when website is loaded
app.get('/', (req, res) => {
	console.log("in get / request");
	//res.send("hello");
	res.render("index.ejs", {
		myCss: myCss,
		myJs : myJs
	});
});

//defines port number the server is on
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
