var mDb = require('./myMongoDb');

var io;
var socket;

var currentOffer = {};

var initAsta = function(data){
	mDb.initAsta();
};

var getOffer = function(data){
	console.log(data);
};

exports.init = function(io,socket){
	io=io;
	socket=socket;

	socket.on('initAsta', function () {
		initAsta();
	});

	socket.on('sendOffer', function (data) {
		getOffer(data);
	});
};