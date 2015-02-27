import cond from 'fj-cond';
import always from 'fj-always';
import { curry2 } from 'fj-curry';


const is = (val) => () => !!val;

const HttpRequest = cond([
    [is(window.XMLHttpRequest), () => () => new XMLHttpRequest()],
    [is(window.ActiveXObject), () => () => new ActiveXObject("Microsoft.XMLHTTP")],
    [always(true), null]
])();

const _ajax = (url, callback) => {
  const httpRequest = HttpRequest();

  httpRequest.onreadystatechange = callback;
  httpRequest.open('GET', url);
  httpRequest.send();
};


export default curry2(_ajax);
