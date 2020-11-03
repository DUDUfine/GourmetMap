//index.js
//获取应用实例
const app = getApp()
//引入数据持久化js
// var record = require('../../utils/record.js');
Page({
  data: {
    map: {
      longitude: 0,
      latitude: 0,
      height: "calc(100% - 66px)",
      width: '100%',
      penHeight: "64px",
      markers: [],
    },
    // markers: [],
    maxMarkerIndex: 2,
    curRemark: {
      longitude: "",
      latitude: ""
    },
    ifShowMark: false,
    shopName: '',
    category: '',
    cost: '',
    remark: ''
    // activeTab: 'MARK' // 'MARK'——标记；'LIST'——列表；'SHARE'——分享；'MINE'——我的
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  savemark(longitude, latitude) {
    console.log('请求前');
    var _this = this;
    wx.request({
      url: 'http://dudufine.com:3000/v1/mark/add',
      method: 'POST',
      data: {
        shopName: this.data.shopName,
        category: this.data.category,
        cost: this.data.cost,
        remark: this.data.remark,
        longitude: longitude, 
        latitude: latitude
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log('请求成功：'+JSON.stringify(res)); 
        // wx.navigateTo({
        //   url: 'pages/list/list'　　// 跳到列表页
        // })
        
        // 收起弹出层显示输入框
        _this.data.ifShowMark =false;
        //修改地图大小，解决地图全屏弹出层不能显示
        if (_this.data.ifShowMark) {
          _this.data.map.height = "calc(100% - 393px)";
        }
        else {
          _this.data.map.height = "calc(100% - 66px)";
        }
        _this.setData({
          map: _this.data.map,
          ifShowMark: _this.data.ifShowMark
        });
        // _this.getMapHeight();

        wx.showToast({
          title:"成功",
          icon: 'loading...',//图标，支持"success"、"loading" 
          // image: '/images/tan.png',//自定义图标的本地路径，image 的优先级高于 icon
          duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
          mask: false,//是否显示透明蒙层，防止触摸穿透，默认：false 
          success:function(){},
          fail:function(){},
          complete:function(){}
        })
      },
      fail: function(res) {
        console.log('请求失败：'+JSON.stringify(res));
        wx.showToast({
          title:"成功",
          icon: 'success',//图标，支持"success"、"loading" 
          duration: 2000,//提示的延迟时间，单位毫秒，默认：1500 
        })
      },
    })
  },
  addMarker: function (longitude, latitude) {
    var _this = this;
    console.log('店名：'+_this.data.shopName+'；美食类型：'+_this.data.category+'；人均价格：'+_this.data.cost);
    if (longitude && latitude) {
      this.addOneMark(longitude, latitude)
      this.savemark(longitude, latitude)
    }
    else {
      this.mapcontext.getCenterLocation({
        success: function (res) {
          _this.addOneMark(res.longitude, res.latitude)
          _this.savemark(res.longitude, res.latitude)
        }
      });
    }
  },
  // 地图标记
  addOneMark: function (longitude, latitude) {
    var _this = this;
    _this.data.maxMarkerIndex++;
    _this.data.markers.push({
      id: _this.data.maxMarkerIndex,
      longitude: longitude,
      latitude: latitude,
      iconPath: '/images/noodle.png',
      width: 32,
      height: 32
    });
    _this.setData({
      markers: _this.data.markers
    });
    // record.save(_this.data.markers);
  },
  //打开/关闭标记输入框
  showMark: function () {
    var _this = this;
    var ifShowMark = _this.data.ifShowMark == false;
    _this.data.ifShowMark = ifShowMark;
    //获取当前地图中心点位置
    this.mapcontext.getCenterLocation({
      success: function (res) {
        //记录标记点
        _this.data.curRemark.longitude = res.longitude;
        _this.data.curRemark.latitude = res.latitude;
        //修改地图大小，解决地图全屏弹出层不能显示
        if (ifShowMark) {
          _this.data.map.height = "calc(100% - 393px)";
        }
        else {
          _this.data.map.height = "calc(100% - 66px)";
        }
        //显示输入框
        _this.data.ifShowMark = ifShowMark;
        //重新定位地图
        _this.data.map.longitude = res.longitude;
        _this.data.map.latitude = res.latitude;
        _this.data.map.latitude = _this.data.map.latitude;
        _this.setData({
          map: _this.data.map,
          ifShowMark: _this.data.ifShowMark
        });
        _this.getMapHeight();
      }
    });
  },
  //标记地图
  // mark: function () {
  //   addMarker()
  // },
  getShopName(e) {
    console.log('店名：'+ JSON.stringify(e.detail) );
    var _this = this;
    _this.setData({
      shopName: e.detail.value
    })
  },
  getCategory(e) {
    var _this = this;
    _this.setData({
      category: e.detail.value
    })
  },
  getCost(e) {
    var _this = this;
    _this.setData({
      cost: e.detail.value
    })
  },
  getRemark(e) {
    var _this = this;
    _this.setData({
      remark: e.detail.value
    })
  },
  bindregionchange: function () {
    var _this = this;
    if (this.mapcontext) {
      this.mapcontext.getCenterLocation({
        success: function (res) {
          if (res && res.longitude) {
            _this.setData({
              'markers[1]': {
                id: 1,
                longitude: res.longitude,
                latitude: res.latitude,
                iconPath: '/images/here.gif',
                width: 64,
                height: 64
              }
            });
          }
        }
      });
    }
  },
  getMapHeight: function () {
    var _this = this;
    this.selectQuery.select("#qqMap").fields({ size: true }, function (res) {
      _this.setData({
        'map.penHeight': (res.height / 2-64)+"px"
      });
      console.log(res.height / 2);
    }).exec();
  },
  // 获取个人标记列表
  getMarkList() {
    var _this = this;
    wx.request({
      url: 'http://dudufine.com:3000/v1/mark/list', 
      data: {
        pageSize: 10,
        pageIndex: 0
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        let data = res.data.result.data;
        if(!data){
          return;
        }
        _this.data.map.markers.push(...data) ;
      
        // _this.setData({
        //   markList: _this.data.markList,
        //   isFinish: _this.data.isFinish
        // });
      }
    })
  },
  onLoad: function () {
    var _this = this;
    this.selectQuery = wx.createSelectorQuery()
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        _this.mapcontext = wx.createMapContext("qqMap");

        if (res && res.longitude) {
          // record.get(function (markers) {
          //   if (!markers) {
          //     markers = []
          //   }
            _this.data.map.longitude = res.longitude;
            _this.data.map.latitude = res.latitude;
              //当前位置
            let tempMarkers = {
              id: 0,
              longitude: res.longitude,
              latitude: res.latitude,
              iconPath: '/images/navi_s.png',
              width: 32,
              height: 32
            };
            _this.data.map.markers.push(tempMarkers)
            _this.setData({
              map: _this.data.map,
              // markers: markers
            });

            _this.getMarkList()
          // });
        }
      }
    })
    _this.getMapHeight();
  }

})
