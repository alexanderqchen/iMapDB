const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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
//set static path
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {
	res.json(person);
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});