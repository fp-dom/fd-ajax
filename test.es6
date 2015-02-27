import assert from 'assert';
import sinon from 'sinon';
import ajax from './';

var xhr, requests;

before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) { requests.push(req); };
});

after(function () {
    xhr.restore();
});

it('fd-ajax', () => {
  var spy = sinon.spy();

  assert.equal(typeof ajax, 'function');
  ajax('test.com')(spy);
  assert.equal(requests.length, 1);
  assert(spy.called);
});
