var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

http.createServer(function(req, res){
	var pathObj = url.parse(req.url, true)
	console.log(pathObj)

	switch(pathObj.pathname){
		case '/loadMore':
			var curIdx = pathObj.query.idx
			var len = pathObj.query.len
			var data = []

			for(var i = 0; i < len; i++){
				data.push('新闻' + (parseInt(curIdx) + i))
			}
			res.end(JSON.stringify(data))

			break;

		default:
			fs.readFile(path.join(__dirname, pathObj.pathname),function(err, data){
				if(err){
					res.statusCode = 404
					res.end('not found')
				}else{
					res.end(data)
				}
			})
	}
}).listen(8080)