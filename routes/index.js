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
/* GET per prendere i dati generali di un utente */
router.get('/rose', function(req, res) {
	var qry = req.body.query;
	var prm = req.body.params;
	mDb.getRose(qry,prm,response.sendResponse);
});

module.exports = router;
