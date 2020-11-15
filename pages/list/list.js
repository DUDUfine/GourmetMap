// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '', // 搜索关键词
    markList: [], // 标记列表
    pageIndex:0,
    isFinish: false,
    pageSize: 10
  },
  // 获取个人标记列表
  getMarkList() {
    var _this = this;
    wx.request({
      url: 'http://dudufine.com:3000/v1/mark/list', 
      data: {
        pageSize: _this.data.pageSize,
        pageIndex: _this.data.pageIndex
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let data = res.data.result.data;
        if(!data){
          return;
        }
        _this.data.markList.push(...data) ;
        _this.data.isFinish = data.length == 0 || data.length < _this.data.pageSize;
       
        _this.setData({
          markList: _this.data.markList,
          isFinish: _this.data.isFinish
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.getMarkList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageIndex:this.data.pageIndex+1
    });
    this.getMarkList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})