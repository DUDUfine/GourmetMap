var app = getApp();
// 封装http请求 TODO
var host = 'http://dudufine.com:3000';

function getRequest(url, params) {
  request(url, params, 'GET')
}

function postRequest(url, params) {
  request(url, params, 'POST')
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
        debugger
        if (result.statusCode == 200 || result.statusCode == 201) {
          onSuccess(result.data.result)
        } else {
          onFailed(result.data.result)
        }
      },
      fail: (result) => {
        debugger
        onFailed(result.data.result)
      }
    })  
}

module.exports = {
  getRequest,
  postRequest,
}