var app = getApp();
// 封装http请求 TODO
var host = 'http://dudufine.com:3000';

function getRequest(url, params, onSuccess, onFailed) {
  request(url, params, 'GET',onSuccess, onFailed)
}

function postRequest(url, params, onSuccess, onFailed) {
  request(url, params, 'POST', onSuccess, onFailed)
}

/**
 * 封装网络请求
 * @param {string} url 
 * @param {object} params 
 * @param {string} method
 */
function request(url, params, method, onSuccess, onFailed) {
  console.log('请求url-'+url);
  wx.showLoading({
    title: '加载中',
    duration: 2000
  })
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
        
        if (result.statusCode == 200 || result.statusCode == 201) {
          onSuccess(result.data.result)
        } else {
          onFailed(result.data.result)
        }
      },
      fail: (result) => {
        if (onFailed) {
          onFailed(result.data.result)
        }
        
      }
    })  
}

module.exports = {
  getRequest,
  postRequest,
}