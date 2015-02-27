"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var cond = _interopRequire(require("fj-cond"));

var always = _interopRequire(require("fj-always"));

var curry2 = require("fj-curry").curry2;



var is = function (val) {
  return function () {
    return !!val;
  };
};

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

  httpRequest.onreadystatechange = callback;
  httpRequest.open("GET", url);
  httpRequest.send();
};


module.exports = curry2(_ajax);