var express = require('express'),
		http = require('http')
		parser = require('xml2json'),
		app = express();
		
	app.configure(function(){
		app.use(express.favicon());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
	});

	app.configure('development', function(){
		app.use(express.logger('dev'));
		app.use(express['static'](__dirname + '/client'));
		app.use(express.errorHandler({
			dumpExceptions: true, 
			showStack: true
		}));
	});

	app.get('/nearbystation/:lat/:lon/', function (req, res) {
			console.log('test');          

			var latitude = req.params.lat;
			var longitude = req.params.lon;

			var body = '<?xml version="1.0" encoding="UTF-8"?>' +
			              '<ft>' +
			                '<request clientId="123" apiName="api_search_location_stops_nearby" apiVersion="2.0">' +
			                  '<client clientId="123"/>' +
			                  '<requestType>api_search_location_stops_nearby</requestType>' +
			                  '<outputCoords>WGS84</outputCoords>' +
			                  '<fromCoordName>WGS84</fromCoordName>' +
			                  '<fromType>coords</fromType>' +
			                  '<fromWgs84Lat>' + latitude + '</fromWgs84Lat>' +
			                  '<fromWgs84Lon>' + longitude + '</fromWgs84Lon>' +
			                '</request>' +
			              '</ft>';

			var postRequest = {
			    host: "webservice.qando.at",
			    path: "/2.0/webservice.ft",
			    port: 80,
			    method: "POST",
			    headers: {
			        'Content-Type': 'text/xml',
			        'Content-Length': Buffer.byteLength(body)
			    }
			};

			var buffer = "";
			var output = [];

			var quandoRequest = http.request(postRequest, function(quandoRes) {

			  var buffer = "";

			  quandoRes.on("data", function(data) { buffer = buffer + data; } );

			  quandoRes.on("error",function(data){
			  	console.log(data);
			  });

			  quandoRes.on("end", function( data ) {	  	
			    var parseString = require('xml2js').parseString;
			    parseString(buffer, function (err, result) {


			      result.ft.response[0].locations[0].location.forEach(function(s) {
			        output.push({
			          id: s.$.name,
			          name: s.$.title,
			          latitude: s.$.wgs84Lat,
			          longitude: s.$.wgs84Lon,
			          lines: s.$.relatedLines.split("|"),
			          distance: s.$.distanceMeter,
			          duration: s.$.durationMinutes
			        });
			      });	      
			      res.json(200, output)
			    });
			  });
			});

			quandoRequest.write(body);
			quandoRequest.end();

  });

	app.get('/monitor/', function (req, res){
		res.json(200,{'name':'asdasd'})
	});
	

	app.get('/', function (req, res){
		res.json(200,{'name':'asdasd'})
	});


	var port = process.env.PORT || 80;
	app.listen(port);
	console.log("Http server listening on port 80");