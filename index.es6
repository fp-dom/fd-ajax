import cond from 'fj-cond';
import always from 'fj-always';
import ifElse from 'fj-ifelse';
import typeOf from 'fj-typeof';
import { curry2 } from 'fj-curry';


const is = (val) => () => !!val;
const isObject = typeOf('object');

const HttpRequest = cond([
    [is(window.XMLHttpRequest), () => () => new XMLHttpRequest()],
    [is(window.ActiveXObject), () => () => new ActiveXObject("Microsoft.XMLHTTP")],
    [always(true), null]
])();

const _ajax = (url, callback) => {
  const httpRequest = HttpRequest();
  
  const options = ifElse(
      isObject,
      (obj) => obj,
      (url) => { return { url: url, method: 'GET' }; }
    )(url);

  httpRequest.onreadystatechange = callback;
  httpRequest.open(options.method, options.url);
  httpRequest.send();
};


export default curry2(_ajax);
