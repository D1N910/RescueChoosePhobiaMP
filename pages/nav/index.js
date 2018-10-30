Page({
  data: {
    list: [
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
      }
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
  }
});
