// pages/map/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    routeInfo:{},
    getDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.name != 'undefined') {
      console.log(options)
      this.data.getDetail = options
      var endLat = options.location.split(',')[1]
      var endLng = options.location.split(',')[0]
      this.setData({
        routeInfo: {
          startLat: '',
          startLng: '',
          startName: "我的位置ddd",
          endLat: endLat,
          endLng: endLng,
          endName: options.name,
          mode: 'walk'
        }
      })
      return false
    }
    
    var that = this
    wx.getStorage({
      key: 'choiceEatting',
      success: function(res) {
        console.log(res)     
        that.data.getDetail = res.data
        wx.setNavigationBarTitle({
          title: `选择到${res.data.name}`
        })   
        var endLat = res.data.location.split(',')[1]
        var endLng = res.data.location.split(',')[0]
        that.setData({
          routeInfo: {
            startLat: '',
            startLng: '', 
            startName: "我的位置",
            endLat: endLat,
            endLng: endLng,
            endName: res.data.name,
            mode: 'walk'
          }
        })
      },
    })

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
    var that = this
    return {
      title: `选择到${this.data.getDetail.name}`,
      path: `/pages/map/index?name=${this.data.getDetail.name}&location=${this.data.getDetail.location}`
    }
  }
})