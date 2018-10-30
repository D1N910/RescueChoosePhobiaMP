var stillTime;
var normalTime;
// pages/bangbang/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifMove: false,
    moveTime: 255
  },

  changeMoveTime(e) {
    this.data.moveTime = e.detail.value
  },

  onTouchMove() {
    this.setData({
      ifMove: true
    })
    this.onMove()
  },

  onStopMove() {
    clearTimeout(stillTime)
    clearTimeout(normalTime)
    this.setData({
      ifMove: false
    })
  },

  onMove() {
    var _this = this
    if (this.data.ifMove){
      wx.vibrateLong({
        success() {
          normalTime = setTimeout(_this.onMove, 510 - _this.data.moveTime)
        }
      })
    }
  },

  onChangeSpeed(e) {
    this.setData({
      moveTime: e.currentTarget.dataset.speed
    })
  },

  onStopIn(e) {
    clearTimeout(stillTime)
    stillTime = setTimeout(this.onStopMove, e.currentTarget.dataset.stilltime)
    if (!this.data.ifMove) {
      this.onTouchMove()      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})