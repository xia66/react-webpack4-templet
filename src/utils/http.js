import {message} from 'antd';
//将参数对象转化为参数字符串
export function parseQueryParams(data) {
    let queryStr = '';
    if(data) {
        queryStr += '?';
    }
    for(key in data) {
        queryStr += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
    }
    queryStr = queryStr.slice(0, queryStr.length - 1)
}

export async function handleResponse(response, customHandler) {
  // start to process response info
    let isHandled = false,
        code = response.code,
        result = null;
    if(typeof customHandler === 'function') {
        isHandled = customHandler(response);
    }
    //如果没有处理函数且请求正确，则直接返回数据，
    if(!isHandled){
        if(response.code == 0) {
            return response.data;
        } else{
            message.error(response.msg);
            return response.data;
        }
    }else {
        return isHandled;
    }
    return result;
}

async function commonHandler(options) {
    let data = null;
    try {
        let response = await fetch(options.url, options);
        if(response.ok) {
            data = await response.json();
        } else {
            data = await response.text();
        }
    }catch(error) {
        message.error(error.message);
    }
    return data;
}

async function wsGET(options) {
    options.method = "GET";
    options.credentials = "include";    //要不要携带 cookie 默认不携带 omit、same-origin 或者 include
    options.mode = 'cors';
    options.headers = _.assign({
        "Content-Type": "application/json"
    }, options.headers);
    if(options.data) {
        options.url = options.url + parseQueryParams(options.data);
    }
    return await commonHandler(options);
}

async function wsPOST(options) {
    options.method = "POST";
    options.credentials = "include";
    options.mode = 'cors';
    options.headers = _.assign({
        "Content-Type": "application/json"
    }, options.headers);
    if(options.data) {
        switch(options.headers["Content-Type"]) {
            case 'application/x-www-form-urlencoded;charset=UTF-8':
                options.body = Object.keys(options.data).map((key) => {
                    if(options.data[key] instanceof Object) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(options.data[key]));
                    }else {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(options.data[key]);
                    }
                }).join('&')
                break;
            default: 
                options.body = JSON.stringify(options.data);    //一般是'application/json'
        }
    }
    return await commonHandler(options);
}

async function wsDelete(options) {
  options.method = "DELETE";
  options.credentials = "include";  //设置携带cookie
  options.mode = 'cors';
  options.headers = _.assign({
    "Content-Type": "application/json"
  }, options.headers);
  return await commonHandler(options);
}

export async function ws(method, options) {
    let result = null;
    method = method ? method.toUpperCase() : '';
    switch(method) {
        case 'GET':
            result = wsGET(options)
            break;
        case 'POST':
            result = wsPOST(options)
            break;
        case 'DELETE':
            result = wsDELETE(options)
            break;
        default:
            result = null;
    }
    if(result) {
        if(options.handler) {
            result = await handleResponse(result, options.handler);
        } else {
            result = await handleResponse(result);
        }
    }
    return result;
}