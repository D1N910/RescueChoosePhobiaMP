// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectionList:[],
    title: '',
    nearlyChoice: '',
    feedingUrl: ['https://wx4.sinaimg.cn/mw690/006ES7aSgy1fuquqc91f5j30u00u00th.jpg']
  },

  Feeding(e) {
    var _that = this
    var content
    var getFeeding = wx.getStorageSync('getFeeding')
    if (getFeeding){
      content = `皇上，这是您第${getFeeding}次准备要恩宠老臣～老臣真的是太害羞了,长按保存图片再扫一扫，麻烦皇上了orz`
    }else{
      content = '皇上，恩宠使用赞赏码，可以不让中间商赚俺的差价。但您需要长按保存图片再扫一扫，麻烦皇上了orz'
    }
    wx.showModal({
      title: '启禀皇上',
      content: content,
      cancelText: '下次吧',
      confirmText: '朕就要赏',
      success(res) {
        if (getFeeding){
          getFeeding ++
          wx.setStorage({
            key: 'getFeeding',
            data: getFeeding,
          })
        }else{
          wx.setStorage({
            key: 'getFeeding',
            data: 2,
          })
        }

        if (res.confirm) {
          wx.previewImage({
            urls: _that.data.feedingUrl
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '老臣等待下一次皇上的恩宠',
            icon:'none'
          })
        }
      }
    })
  }
})