var app = getApp();
// 封装http请求 TODO
var host = 'http://localhost:3000/v1/ ';


function request(url, ) {
wx.request({
  url: 'url',
  data: data,
  dataType: dataType,
  enableCache: true,
  enableHttp2: true,
  enableQuic: true,
  header: header,
  method: method,
  responseType: responseType,
  timeout: 0,
  success: (result) => {},
  fail: (res) => {},
  complete: (res) => {},
})
}
