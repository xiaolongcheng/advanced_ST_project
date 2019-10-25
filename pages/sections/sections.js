const app = getApp()

// pages/sections/sections.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Loading: true, //是否加载
    scrollPage: 0,
    scrollNum: app.globalData.scrollNum, //每次加载的数据量
    sId: 0,
    col1: [],
    col2: [],
    goodsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sectionName = ["季节篇", "按预算", "按天数", "找美食", "适宜人群", "热门景点"];
    wx.setNavigationBarTitle({
      title: sectionName[options.id],
    })
    //初始化
    this.data.sId = options.id;
    this.loadGoods();

  },
  //加载商品信息

  loadGoods: function (options) {
    var scrollPage = this.data.scrollPage;
    var col1 = this.data.col1;
    var col2 = this.data.col2;
    let Loading = this.data.Loading;
    let sId = this.data.sId;
    let scrollNum = this.data.scrollNum;
    var that = this;
    if (!Loading) return;
    var db = wx.cloud.database();
    db.collection('goods').get({
      success: res => {
        let goods = res.data;
        for (let i = 0; i < goods.length; i++) {
          if (goods[i].sId == sId)
            that.data.goodsData.push(goods[i]);
        }
        let baseId = "img-" + (+new Date());
        if (that.data.goodsData.length != scrollNum) {
          Loading = false;
        }

        for (let i = 0; i < that.data.goodsData.length; i++) {
          that.data.goodsData[i].id = baseId + "-" + i;
          if (i % 2 == 0) col1.push(that.data.goodsData[i]);
          else col2.push(that.data.goodsData[i]);
        }

        that.setData({
          scrollPage: scrollPage + 1,
          Loading: Loading,
          col1: col1,
          col2: col2
        });
      },
      fail: function () {
        that.setData({
          Loading: true,
        })
      }
    });
  },

  onGoodTap: function (e) {
    let _id = e.currentTarget.id;
    wx.navigateTo({
      url: '../good/good?_id=' + _id,
    })
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    this.data.col1 = [];
    this.data.col2 = [];
    this.data.scrollPage = 0;
    this.data.Loading = true;
    this.loadGoods();
  },
  onReachBottom: function () {
    this.loadGoods();
  }

})