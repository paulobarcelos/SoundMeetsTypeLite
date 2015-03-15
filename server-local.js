var static = require('node-static');
var file = new static.Server('./dist');

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8')
};


https.createServer(options, function (request, response) {

	if(request.url == '/'){
		response.writeHead(302,	{Location: '/app/index.html'});
		response.end();
		return;
	}

	request.addListener('end', function () {
		file.serve(request, response);
	});

	request.resume();
	
}).listen(process.env.VCAP_APP_PORT || process.env.PORT || 7474);


var childProcess = require('child_process'); 
childProcess.exec('open -a "/Applications/Google Chrome.app" https://localhost:7474/ --args --kiosk');
