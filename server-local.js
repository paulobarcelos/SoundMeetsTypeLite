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


// Make sure https://localhost:7474/ is the default page when chrome opens,
// and that all tabs are closed.
var childProcess = require('child_process'); 

childProcess.exec(
	'sleep 30; '+
	'killall "Chromimum"; '+
	'sleep 10; '+
	'open -n -a "/Applications/Chromimum.app" --args --kiosk --allow-insecure-localhost; '+
	'sleep 20; '+
	'osascript ./setfocus.scpt' );
