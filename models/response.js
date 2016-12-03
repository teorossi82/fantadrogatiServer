
exports.sendResponse = function(data,res){
	res.header("Access-Control-Allow-Origin", "*")
	res.jsonp(data)
}
