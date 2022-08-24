'use strict';

const Path = require('path');
const Pkg = require(Path.join(__dirname, '..', 'package.json'));
const express = require('express');
const helper = require('./helper.js');
const axios = require('axios')

// Helper utility for verifying and decoding the jwt sent from Salesforce Marketing Cloud.
const verifyJwt = require(Path.join(__dirname, 'lib', 'jwt.js'));

const app = express();

// Register middleware that parses the request payload.
app.use(require('body-parser').raw({
	type: 'application/jwt'
}));

// Route that is called for every contact who reaches the custom activity
app.post('/activity/execute', (req, res) => {
	verifyJwt(req.body, Pkg.options.salesforce.marketingCloud.jwtSecret, (err, decoded) => {
		// verification error -> unauthorized request
		if (err) {
			console.error(err);
			return res.status(401).end();
		}

		if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
			console.log("Requisição JB")
			console.log(decoded);
			/*
			setTimeout(function(){ 
				console.log("Ready")
			}, 1000);	
			helper.populaMensagem(decoded).then( resp =>{
				console.log("retorno da API externa")
				console.log(resp.data)
			});
			*/
			let inArguments = decoded['inArguments'][0];
			var obj = {
				"bodyParameters": [inArguments.variables]
			}
			axios({
				method: "get",
				url: `https://nodejs-express-mysql-mgalvao.herokuapp.com/customers/${obj.bodyParameters[0]}`,
			}).then(resp =>{   
				console.log("retorno da API externa")         
				console.log(resp.data);
			}).catch(error =>{
				console.error( error );
			});
			return res.status(200).end();
		} else {
			console.error('inArguments invalid.');
			return res.status(400).end();
		}
	});
});

// Routes for saving, publishing and validating the custom activity. In this case
// nothing is done except decoding the jwt and replying with a success message.
app.post(/\/activity\/(save|publish|validate)/, (req, res) => {
	verifyJwt(req.body, Pkg.options.salesforce.marketingCloud.jwtSecret, (err, decoded) => {
		// verification error -> unauthorized request
		if (err) {
			console.error(err);
			return res.status(401).end();
		}
		return res.status(200).json({success: true});
	});
});

// Serve the custom activity's interface, config, etc.
app.use(express.static(Path.join(__dirname, '..', 'public')));
// Start the server and listen on the port specified by heroku or defaulting to 12345
app.listen(process.env.PORT || 12345, () => {
	console.log('Custom Activity is now running!');
});

