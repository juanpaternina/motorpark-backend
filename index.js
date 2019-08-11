// IMPORT DEPENDENCIES
var restify = require('restify');
var corsMiddleware = require('restify-cors-middleware');
var mongoose = require('mongoose');

//CREATE GLOBAL CONNECTION TO A DATABASE
global.db = mongoose.createConnection('mongodb://juanpaternina:juanpaternina123@ds261567.mlab.com:61567/cafeto_db', {
	useNewUrlParser: true,
});

//IMPORT MODELS
require('./model/Car');

//IMPORT CONTROLLRS
var carController = require('./controllers/carController');

//CREATE SERVER
var server = restify.createServer();

//ENABLE CORS
const cors = corsMiddleware({
	origins: [ '*' ],
	allowHeaders: [ 'X-App-Version' ],
	exposeHeaders: [],
});

server.use(restify.plugins.bodyParser());

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

//CREATE ROUTES
server.get('/car', carController.getallCars);
server.get('/car/:query', carController.query);
server.post('/car', carController.save);
server.get('/car/retire/:id', carController.retire);
server.get('/car/delete/:id', carController.delete);

//START SERVER ON PORT
server.listen(5000, function () {
	console.log('%s listening at %s', server.name, server.url);
});
