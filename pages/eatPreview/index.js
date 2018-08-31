// pages/eatPreview/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    imgUrl:[],
    getDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.name != 'undefined') {
      console.log(options)
      wx.showModal({
        title: '启禀皇上',
        content: '来自转发的店铺选择结果无法显示相关图片',
        showCancel: false,
        confirmText:'朕知道了'
      })
      this.data.getDetail = options
      wx.setStorage({
        key: 'choiceEatting',
        data: options
      })
      options.type = options.type.split(';')[2]
      this.setData({
        shopDeatil: options
      })
    }
    var that = this
    wx.getStorage({
      key: 'choiceEatting',
      success: function(res) {
        console.log(res)
        that.data.getDetail = res.data
        res.data.type = res.data.type.split(';')[2]
        for(let i in res.data.photos){
          that.data.imgUrl[i]=res.data.photos[i].url
        }
        that.setData({
          shopDeatil: res.data
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
   * 预览图片
   */
  photoPreview(e){
    console.log(e.currentTarget.dataset.index)   
    var that = this
    wx.previewImage({
      current: that.data.imgUrl[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: that.data.imgUrl // 需要预览的图片http链接列表
    }) 
    var that = this
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: `选择到${this.data.getDetail.name}`,
      path: `/pages/eatPreview/index?name=${this.data.getDetail.name}&location=${this.data.getDetail.location}&type=${this.data.getDetail.type}`
    }
  },

  /**
   * 跳转到预览
   */
  helpSelect(){
    wx.navigateTo({
      url: '/pages/map/index'
    })
  }
})