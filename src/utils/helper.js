// Operation Cookie
export function getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}

export function setCookie(name,value,hours) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + hours*3600*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 


export function delCookie({ name, domain, path }) {
    if (getCookie(name)) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' + 
                        path + '; domain=' + 
                        domain;
    }
}

// Operation LocalStorage
export function setLocalStorage(key, vaule) {
    return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
}

export function getRootPath() {
    return window.rootPath ? window.rootPath : 'http://localhost:8000';
}