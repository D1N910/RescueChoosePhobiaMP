// pages/evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ecaluation:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ecaluation: '小时候读书不努力，写作文完全靠编，上了100字就靠标点符号来凑了。何况现在上了年纪，手懒了，嘴不利索了。你还叫我写100字的好评，你于心何忍啊。我从不给人差评，好评都是默认的，质量非常好，与卖家描述的完全一致，非常满意,真的很喜欢，完全超出期望值，发货速度非常快，包装非常仔细、严实，运送速度很快，很满意的一次购物。小学毕业了。'
    })
  },

  onSetCLip(){
    let _this = this
    wx.setClipboardData({
      data: _this.data.ecaluation,
      success(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
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

  }
})