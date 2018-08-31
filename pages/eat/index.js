var amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poisData:[],
    backgroundColor: ['#336699', '#6699CC', '#66CCCC', '#B45B3E', '#479AC7', '#00B271'],
    showLoading: true   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '' });
    myAmapFun.getPoiAround({
      querytypes:'餐饮服务',
      success: function (data) {
        console.log(data)
        that.setData({
          poisData: data.poisData,
          showLoading: false          
        })
      },
      fail: function (info) {
        //失败回调
        that.setData({
          showLoading: false
        })
        wx.showModal({
          title: '获取周边失败',
          content: '请检查是否授权小程序获得您的位置或者是否打开网络或者是否处于荒郊野岭。',
          showCancel: false,
          confirmText: '待朕看看'
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
   * 用户点击帮你选择
   */
  helpSelect() {
    this.PopupWowToShowSelectionResult()
  },

  /** 
  * 用以显示选择结果的弹窗
  */
  PopupWowToShowSelectionResult: function () {
    wx.showLoading({
      title: '选择中'
    })
    setTimeout(() => {
      var _that = this
      wx.hideLoading()
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.showModal({
        title: '选择享用',
        content: this.data.poisData[this.RandomNum()].name,
        cancelText: '看看别的',
        confirmText: '让朕看看',
        success(res) {
          wx.hideShareMenu();
          if(res.confirm){
            wx.navigateTo({
              url: '../eatPreview/index'
            })
          }
        }
      })
    }, 1000)
  },
  /**
   * 获取随机数
   * @param Max 最大值
   */
  RandomNum: function (Max) {
    var that = this
    var Range = this.data.poisData.length - 1;
    var Rand = Math.random();
    var num = Math.round(Rand * Range);
    wx.setStorage({
      key: 'choiceEatting',
      data: this.data.poisData[num],
    })
    return num;
  },

  /**
   * 用户点击店铺跳转
   */
  navToShop(e) {
    var that = this
    wx.setStorage({
      key: 'choiceEatting',
      data: that.data.poisData[e.currentTarget.dataset.id],
      success(){
        wx.navigateTo({
          url: '/pages/eatPreview/index'
        })
      }
    })
  }
})
