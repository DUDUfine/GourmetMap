/**存储标记记录 */

const remarkKey = "userRemarks";

//存储到本地
function saveAtLocaltion(remarks) {
    wx.setStorage({
        key: remarkKey,
        data: remarks
    });
}
//从本地获取
function getFromLocaltion(callback) {
    try {
        var value = wx.getStorageSync(remarkKey)
        if (value) {
            console.log(1)
            callback(value)
        }
        else{
            callback()
        }
      } catch (e) {
        callback()
      }
}
//存储到网络
//从网络获取

function save(remarks){
    saveAtLocaltion(remarks);
}
function get(callback){
    getFromLocaltion(callback);
}

module.exports = {
    save: save,
    get: get
}