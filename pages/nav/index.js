Page({
  data: {
    ifChan: 0,
    list: [
      {
        id: 'wife',
        name: '老婆生成器[最新]'
      },
      {
        id: 'index',
        name: '普通选择'
      },
      {
        id: 'eat',
        name: '吃什么'
      },
      {
        id: 'bangbang',
        name: '仙女棒'
      },
      {
        id: 'evaluation',
        name: '购物评价生成器'
      }
      // {
      //   id: 'good',
      //   name: '俾个GOOD你'
      // }
    ]
  },
  onLoad: function (options) {
    if (typeof options.share != 'undefined'){
      wx.showModal({
        title: '启禀皇上',
        content: `选择结果：“${options.share}”来自［普通选择］`,
        showCancel: false,
        confirmText: '朕知道了'
      })
    }
    this.setData({
      ifChan: wx.getStorageSync('ifChan') || 0
    })
  },
  toggleChan: function(e) {
    this.setData({
      ifChan: parseInt(e.target.dataset.type)
    })
    wx.setStorage({
      key: 'ifChan',
      data: parseInt(e.target.dataset.type)
    })
  }
});
