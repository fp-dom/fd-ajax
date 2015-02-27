"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var assert = _interopRequire(require("assert"));

var sinon = _interopRequire(require("sinon"));

var ajax = _interopRequire(require("./"));

var xhr, requests;

before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) {
        requests.push(req);
    };
});

after(function () {
    xhr.restore();
});

it("fd-ajax", function () {
    var spy = sinon.spy();

    assert.equal(typeof ajax, "function");
    ajax("test.com")(spy);
    assert.equal(requests.length, 1);
    assert(spy.called);
});