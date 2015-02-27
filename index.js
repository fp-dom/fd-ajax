"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var cond = _interopRequire(require("fj-cond"));

var always = _interopRequire(require("fj-always"));

var ifElse = _interopRequire(require("fj-ifelse"));

var typeOf = _interopRequire(require("fj-typeof"));

var curry2 = require("fj-curry").curry2;



var is = function (val) {
  return function () {
    return !!val;
  };
};
var isObject = typeOf("object");

var HttpRequest = cond([[is(window.XMLHttpRequest), function () {
  return function () {
    return new XMLHttpRequest();
  };
}], [is(window.ActiveXObject), function () {
  return function () {
    return new ActiveXObject("Microsoft.XMLHTTP");
  };
}], [always(true), null]])();

var _ajax = function (url, callback) {
  var httpRequest = HttpRequest();

  var options = ifElse(isObject, function (obj) {
    return obj;
  }, function (url) {
    return { url: url, method: "GET" };
  })(url);

  httpRequest.onreadystatechange = callback;
  httpRequest.open(options.method, options.url);
  httpRequest.send();
};


module.exports = curry2(_ajax);