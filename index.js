'use strict';
var errors = require('apis/lib/errors');
var isEmpty = function(something) {
  if (!something) {
    return true;
  }

  return typeof something === 'object' && !Object.keys(something).length;
};

errors.handler = function(ErrorClass, retName, cb) {
  if (typeof ErrorClass === 'string') {
    ErrorClass = errors[ErrorClass];
  }

  if (typeof retName === 'function') {
    cb = retName;
    retName = undefined;
  }

  return function(err, result) {
    if (err) {
      cb(new ErrorClass(err.message));
    } else if (retName !== undefined) {
      var ret = {};
      if (typeof retName === 'string') {
        ret[retName] = result;
      } else {
        ret = retName;
      }
      cb(null, ret);
    } if (isEmpty(result) && ErrorClass) {
      cb(new ErrorClass());
    } else {
      cb(null, result);
    }
  };
};

module.exports = errors;
