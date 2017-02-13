var error = require('./error');
var mDb = require("./myMongoDb");
var mongoose = require('mongoose');
var response = require('./response');
var co = require('co');

var db_name = "fantadrogati"
//provide a sensible default for local development
mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + db_name;
var options = {
}
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
  mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
  options = {
	  user: 'admin',
	  pass: 'CDDSah4x1EQ7'
	}
}
mongoose.connect(mongodb_connection_string,options);

var Schema = mongoose.Schema;
var SchemaType = mongoose.Schema.Types;

var utenteSchema = new Schema(
	{
			//_id: SchemaType.ObjectId,
			id:{
				type:Number,
				required: true,
				unique: true
			},
			username: {
				type:String,
				required: true,
				unique: true
			},
			password: {
				type:String,
				required: true
			},
			nome: {
				type:String,
				required: true
			},
			eMail:{
				type:String
			}
	}
);

utenteSchema.index({ nome: 1 }); // schema level

var Utente = mongoose.model('Utente', utenteSchema);

exports.getUtente = function(username,password,res,next){
	Utente.find(
		{"username":username}
	)
	.exec(
		function(err,user){
			if (err){ 
				return error.errorMessage(res,err)
			}
			else if(user.length == 0)
				return error.errorMessage(res,"Utente non trovato")
			else if(user[0].password != password)
				return error.errorMessage(res,"Password errata")
			/*else if(user[0].confermato != 1)
				return error.errorMessage(res,"Indirizzo e-mail non confermato. Controlla la casella di posta elettronica che ci hai fornito e clicca sul link che trovi all'interno del messaggio per confermare l'iscrizione al servizio.")*/
			next(user[0]._doc,res)
		}
	)
}
exports.postUtente = function(user,res){
	Utente.create(
		user,
		function(err,utente){
			if (err){ 
				return error.errorMessage(res,err)
			}
			//res.header("Access-Control-Allow-Origin", "*")
			res.jsonp(user);
		}
	)
}

var roseSchema = new Schema(
	{
			//_id: SchemaType.ObjectId,
			id_utente:{
				type:Number,
				required: true,
				unique: true
			},
			rosa: {
				type:Array,
				required: true
			},
			anno: {
				type:Number,
				required: true
			},
			numero: {
				type:Number,
				required: true
			}
	}
);

roseSchema.index({ id_utente: 1 }); // schema level

var Rose = mongoose.model('Rose', roseSchema);

exports.getRosa = function(qry,prm,res,next){
	Rose.find(
		qry,
		prm
	)
	.exec(
		function(err,rose){
			if (err){ 
				return error.errorMessage(res,err)
			}
			next(rose);
		}
	)
}
exports.postRose = function(rose,res){
	Rose.create(
		rose,
		function(err,rosa){
			if (err){ 
				return error.errorMessage(res,err)
			}
			//res.header("Access-Control-Allow-Origin", "*")
			res.jsonp(rose);
		}
	)
}
exports.postRosa = function(id_utente,rosa,res){
	Rose.update(
		{id_utente: id_utente},
		rosa,
		{upsert: true, setDefaultsOnInsert: true},
		function(err,rosa){
			if (err){ 
				return error.errorMessage(res,err)
			}
			//res.header("Access-Control-Allow-Origin", "*")
			res.jsonp(rosa);
		}
	)
}
exports.getTeam = function(id_utente,res,next){
	co(function*() {
		var utente;
		var rosa;
		try {
			utente = yield Utente.find(
				{id:id_utente}
			)
			.exec();
			var rosa = yield Rose.find(
				{id_utente:id_utente}
			)
			.exec();
			utente[0]._doc.rosa = rosa[0].rosa;
			next(utente,res);
		}
		catch(e) {
	    	next(e,res);
	  	}
	})
}

exports.getTeams = function(res,next){
	co(function*() {
		try{
			var teams = [];
			var utenti = yield Utente.find({}).exec();
			for(var i=0;i<utenti.length;i++){
				var team = utenti[i]._doc;
				var rosa = yield Rose.find(
					{id_utente:team.id}
				)
				.exec();
				team.rosa = rosa[0].rosa;
				teams.push(team);
			}
			next(teams,res);
		}
		catch(e) {
	    	next(e,res);
	  	}
	});
}

var asteSchema = new Schema(
	{
			year:{
				type:String,
				required: true
			},
			step:{
				type:Number,
				required: true
			},
			date:{
				type:Date,
				required: true
			},
			offerts: {
				type:Array,
				required: true
			}
	}
);

asteSchema.index({ year: 1 }); // schema level

var Aste = mongoose.model('Aste', asteSchema);

exports.getAsta = function(qry,prm){
	Aste.find(
		qry,
		prm
	)
	.exec(
		function(err,aste){
			if (err){ 
				return error.errorMessage(res,err)
			}
			next(aste);
		}
	)
}


>>>>>>> Stashed changes
