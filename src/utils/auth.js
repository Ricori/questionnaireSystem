import { getRootPath , getCookie, delCookie } from './helper';

export function getAuthHeader(utoken) {
  return ({
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + utoken,
      'Content-Type': 'application/json',
    },
  });
}

export function redirectLogin() {
  localStorage.clear();
  window.location.href = getRootPath() + '/login';
}

export function authenticated() {
  const utoken = getCookie('utoken');
  if (!utoken) {
    redirectLogin();
  }
}

export function logOut() {
  delCookie({
    name: 'utoken',
    path: '/',
    domain: document.domain,
  });
  authenticated();
}