import { getCookie } from './helper';
import { getAuthHeader, redirectLogin} from './auth';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response && response.status === 401) {
    redirectLogin();
  }
  if (response.status >= 200 && response.status < 500) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  const utoken = getCookie('utoken');
  const authHeader = getAuthHeader(utoken);
  return fetch(url, { ...options, ...authHeader })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }));
}