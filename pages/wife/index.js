// 引入数据池
import { randomPool } from 'data.js'

const PI = Math.PI;
let wifeCounter = 0;
let wifeProps = [];

// 正态分布
function normalDistribution(u, v) {
  // Box-Muller
  var x1 = Math.random();
  var x2 = Math.random();
  var nD = Math.sqrt(-2 * Math.log(x1)) * Math.sin(2 * PI * x2) * v + u;
  return nD;
}

// 得到颜色
function randomRGB() {
  var rValue = Math.round(Math.random() * 255).toString(16);
  var gValue = Math.round(Math.random() * 255).toString(16);
  var bValue = Math.round(Math.random() * 255).toString(16);
  if (rValue.length < 2)
    rValue = "0" + rValue;
  if (gValue.length < 2)
    gValue = "0" + gValue;
  if (bValue.length < 2)
    bValue = "0" + bValue;
  return "#" + rValue + gValue + bValue;
}

// pages/wife/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomPool,
    nowBody: {}
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

  },

  // 点击随机生成按钮
  startGenerator() {
    this.insertExWife();
    this.generateBody();
    this.generateHair();
    this.generateEyes();
    this.generateAttribute();
    this.generateCharacter();
    this.generateCup();
    this.generateSkin();

    // generateAge();
  },

  randomData(elementId, dataName) {
    let t1Num = Math.floor(Math.random() * dataName.length);
    let changeData = `nowBody.${elementId}`
    this.setData({
      [changeData]: this.data.randomPool[dataName][t1Num]
    })
  },

  generateCup() {
    this.randomData("cupsize", 'Cupsize_data');
  },

  generateSkin() {
    this.randomData("skin", 'Skin_data');
  },

  // 插入前妻
  insertExWife() {
  },

  generateAttribute() {
    this.randomData("attribute", 'Attribute_data');
  },

  generateCharacter() {
    this.randomData("character", 'Character_data');
  },

  // 眼睛颜色
  generateEyes() {
    this.setData({
      ['nowBody.eyes']: randomRGB()
    })
  },

  // 头发颜色
  generateHair() {
    this.randomData("hairstyle", 'Hair_data');
    var newColor = randomRGB();
    this.setData({
      ['nowBody.hairColor']: newColor
    })
  },

  // 保存前妻
  saveWives() {
    if (!storage) {
      return;
    }
    let exWivesTable = $("#exWivesTable")[0];
    let wives = [];

    for (let i = 1; i < exWivesTable.rows.length; i++) {
      let row = exWivesTable.rows[i];
      let wife = {};
      wifeProps.forEach((element, i) => {
        wife[element] = row.cells[i].innerHTML
      });
      wives.push(wife);
    }
    storage.setItem("exwives", JSON.stringify(wives));
    let currWife = getCurrentWife();
    storage.setItem("currWife", JSON.stringify(currWife));
  },

  // 生成身体
  generateBody() {
    let height = normalDistribution(165, 5)
    height = Math.round(height)
    const bmi = normalDistribution(20, 1)
    let weight = Math.round(bmi * (height / 100) * (height / 100))
    this.setData({
      ['nowBody.height']: height,
      ['nowBody.weight']: weight
    })
  }
})