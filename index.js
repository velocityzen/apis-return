'use strict';
var errors = require('apis/lib/errors');
var isEmpty = function(something) {
	if(!something) {
		return true;
	}

	return typeof something === "object" && !Object.keys(something).length;
};

errors.handler = function(NoResultError, retName, cb) {
	if(typeof NoResultError === "string") {
		NoResultError = errors[NoResultError];
	}

	if(typeof retName === 'function') {
		cb = retName;
		retName = undefined;
	}

	return function(err, result) {
		if(err) {
			cb(err);
		} else if(isEmpty(result) && NoResultError) {
			cb(new NoResultError());
		} else if(retName === undefined) {
			cb(null, result);
		} else {
			var ret = {};
			if(typeof retName === 'string') {
				ret[retName] = result;
			} else {
				ret = retName;
			}
			cb(null, ret);
		}
	};
};

module.exports = errors;
