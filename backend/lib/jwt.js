'use strict';

module.exports = (body, secret, cb) => {
	if (!body) {
		return cb(new Error('invalid jwtdata'));
	}

	//console.log(body.toString('utf8'));
	console.log("body => ", JSON.stringify(body));
	require('jsonwebtoken').verify(body.toString('utf8'), secret, {
		algorithm: 'HS256'
	}, cb);
};
