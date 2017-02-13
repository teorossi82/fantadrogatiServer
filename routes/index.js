var express = require('express');
var mDb = require('./../models/myMongoDb');
var response = require('./../models/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST per inserire nuovo utente */
router.post('/utente', function(req, res) {
	mDb.postUtente(req.body,res)
});
/* GET per prendere i dati generali di un utente */
router.get('/utente', function(req, res) {
	var username = req.query.username
	var password = req.query.password
	mDb.getUtente(username,password,res,response.sendResponse)
});

/* POST per inserire nuove rose */
router.post('/rose', function(req, res) {
	var rose = req.body;
	mDb.postRose(rose,res);
});
/* POST per aggiungere/modificare una rosa */
router.post('/rosa/:id', function(req, res) {
	var id_utente = parseInt(req.params.id);
	var rosa = req.body;
	mDb.postRosa(id_utente,rosa,res);
});
/* GET per prendere i dati delle rose */
router.get('/rose', function(req, res) {
	var qry = req.query.query;
	var prm = req.query.params;
	mDb.getRose(qry,prm,res,response.sendResponse);
});

/* GET per prendere i dati di tutti i teams */
router.get('/teams', function(req, res) {
	mDb.getTeams(res,response.sendResponse);
});
/* GET per prendere i dati di un team */
router.get('/team/:id', function(req, res) {
	var id = parseInt(req.params.id);
	mDb.getTeam(id,res,response.sendResponse);
});

module.exports = router;
