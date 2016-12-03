/**
 * @author Laboratorio delle Idee s.r.l.
 */
exports.errorMessage = function(res,err){
	res.status(400)
   	res.set({
   			'Access-Control-Allow-Origin' : "*"
   			});
	res.jsonp(err)
}
