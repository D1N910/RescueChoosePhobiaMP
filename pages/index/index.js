var qqmapsdk;
// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectionList:[],
    title: '',
    nearlyChoice: '',
    thisGetImgPath: '',
    showCanvas: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu();
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
      title: `${this.data.title}选择结果`,
      path: '／pages/index/index',
      imageUrl: that.data.thisGetImgPath,
      success(e){
        console.log('转发成功')
      }
    }
  },

  /**
   * 添加选项
   */
  addSelection() {
    this.data.selectionList.push('')
    this.setData({
      selectionList: this.data.selectionList
    })
  },

  /**
   * 删除选项
   */
  delateSelection(e) {
    console.log(e.currentTarget.dataset.selectionindex)
    this.data.selectionList.splice(e.currentTarget.dataset.selectionindex, 1)
    this.setData({
      selectionList: this.data.selectionList
    })
  },

  /**
   * 修改选项内容
   */
  changeSelection(e) {
    this.data.selectionList[e.currentTarget.dataset.selectionindex] = e.detail.value
  },

  /**
   * 修改标题
   */
  changeTitle(e){
    this.data.title = e.detail.value
  },
  
  /** 
   * 检测选项有没有空的
   */
  checkNul: function () {
    var haveNull = 1
    if (this.data.title.indexOf('自杀')!=-1){
      wx.showModal({
        title: "朋友你好",
        content: '这个世界虽然不完美，但我们仍然可以疗愈自己。心理咨询热线：0755-25629459',
        showCancel: false,
        confirmText: '活下去'
      })
      return 0
    }
    for (let i in this.data.selectionList) {
      if (this.data.selectionList[i] == '') {
        haveNull = 0
        wx.showModal({
          title: "提示",
          content: '有选项为空',
          showCancel: false,
          confirmText: '朕了解了'
        })
        return haveNull
      }
    }
    return haveNull
  },

  /**
   * 用户点击帮你选择
   */
  helpSelect() {
    if (this.checkNul()){
      this.PopupWowToShowSelectionResult()
    }
  },

  /** 
  * 用以显示选择结果的弹窗
  */
  PopupWowToShowSelectionResult: function () {
    wx.showLoading({
      title: '选择中'
    })
    setTimeout(()=>{
      var _that = this
      wx.hideLoading()
      wx.showShareMenu({
        withShareTicket: true
      })
      wx.showModal({
        title: `${this.data.title}选择结果`,
        content: this.data.selectionList[this.RandomNum()],
        confirmText: '朕了解了',
        showCancel: false,
        success(res) {
          wx.hideShareMenu();          
          _that.setData({
            nearlyChoice: _that.data.nearlyChoice
          })
        }
      })
    },1000)
  },

  getNearlyChoice() {
    wx.showModal({
      title: `${this.data.title}的选择结果`,
      content: this.data.nearlyChoice,
      confirmText: '朕了解了',
      showCancel: false
    })
  },
  /**
   * 获取随机数
   * @param Max 最大值
   */
  RandomNum: function (Max) {
    var that = this    
    var Range = this.data.selectionList.length - 1;
    var Rand = Math.random();
    var num = Math.round(Rand * Range);
    this.data.nearlyChoice = this.data.selectionList[num]

    this.setData({
      showCanvas: true
    },()=>{
      const shareImg = wx.createCanvasContext('shareImg')
      that.drewText(10, shareImg, that.data.selectionList[num], 60, '#fff', 0, 0, 500, 'left', 1, 10, '#000')
      shareImg.draw(false, (e) => {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 400,
          height: 500,
          destWidth: 400,
          destHeight: 500,
          canvasId: 'shareImg',
          success: function (res) {
            console.log(res.tempFilePath)
            console.log('ddd')
            that.data.thisGetImgPath = res.tempFilePath;
            that.setData({
              showCanvas: false              
            })
          }
        })
      })
    })

    return num;
  },

  /**
   * 绘制文字
   * lineNUmber 文字显示的最大行数
   * ctx canvas上下文
   * text 文字内容
   * fontSize 字体大小
   * fontFillStyle 字体填充颜色
   * x left
   * y top
   * width 所在宽度
   * setTextAlign 字对齐的位置
   * ifStroke 是否描边 0不描边，1描边
   * setLineWidthd 边框的宽度(不描边可略去)
   * strokeStyle 描边颜色(不描边可略去)
   */
  drewText(lineNUmber, ctx, text, fontSize, fontFillStyle, x, y, width, setTextAlign, ifStroke, setLineWidthd, strokeStyle) {
    ctx.beginPath();

    console.log(setLineWidthd)

    var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];

    ctx.setFontSize(fontSize)
    ctx.setFillStyle(fontFillStyle)

    for (var a = 0; a < chr.length; a++) {

      if (ctx.measureText(temp).width < width) {

        temp += chr[a];

      }
      else {

        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";

      }

    }
    row.push(temp);

    //如果数组长度大于2 则截取前两个
    if (row.length > lineNUmber) {

      var rowCut = row.slice(0, lineNUmber);
      var rowPart = rowCut[lineNUmber - 1];
      var test = "";
      var empty = [];

      for (var a = 0; a < rowPart.length; a++) {

        if (ctx.measureText(test).width < 220) {

          test += rowPart[a];

        }
        else {

          break;

        }

      }

      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(lineNUmber - 1, 1, group);
      row = rowCut;
    }
    for (var b = 0; b < row.length; b++) {

      if (ifStroke) {
        console.log(setLineWidthd);
        ctx.setLineWidth(setLineWidthd);
        ctx.strokeStyle = strokeStyle;
        ctx.strokeText(row[b], x, y + b * fontSize + 3 * b, width);

      }

      ctx.setTextAlign(setTextAlign);
      ctx.fillText(row[b], x, y + b * fontSize + 3 * b, width);
      ctx.closePath();
    }
  }
})