var app = getApp();
// 封装http请求 TODO
var host = 'http://dudufine.com:3000';

function getRequest(url, params, onSuccess, onFailed, onComplete) {
  request(url, params, 'GET', onSuccess, onFailed, onComplete)
}

function postRequest(url, params, onSuccess, onFailed, onComplete) {
  request(url, params, 'POST', onSuccess, onFailed, onComplete)
}

/**
 * 封装网络请求
 * @param {string} url 
 * @param {object} params 
 * @param {string} method
 * @param {Function} onSuccess 
 * @param {Function} onFailed 
 * @param {Function} onComplete 
 */
function request(url, params, method) {
  console.log('请求url-'+url);
  wx.showLoading({
    title: '加载中',
    duration: 2000
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${host}${url}`,
      data: params,
      dataType: 'json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: method,
      timeout: 6000,
      success: (result) => {
        debugger
        if (result.statusCode == 200) {
          resolve(result.data)
        } else {
          reject(result.data)
        }
      },
      fail: (result) => {
        reject(result.data)
      }
    })  
  })
}

module.exports = {
  getRequest,
  postRequest,
}