//index.js
//获取应用实例
const app = getApp()

Page({
   data: {
  //   motto: 'Hello World',
  //   userInfo: {},
  //   hasUserInfo: false,
  //   canIUse: wx.canIUse('button.open-type.getUserInfo'),
  // 轮播图的列表
     "bnrUrl": [{
       url: "/assets/images/swipers/s_1.jpg",
     }, {
         url: "/assets/images/swipers/s_2.jpg",
     }, {
         url: "/assets/images/swipers/s_3.jpeg",
     }, {
         url: "/assets/images/swipers/s_4.jpg",
     }],

    //  分类的列表
     classItems_1: [{
       url: "/assets/images/classes/s_1.png",
       title: "按季节",
       idx: 0
     },
     {
       url: "/assets/images/classes/s_2.png",
       title: "按预算",
       idx: 1
     },
     {
       url: "/assets/images/classes/s_3.png",
       title: "按天数",
       idx: 2
     },
     ],
     classItems_2: [{
       url: "/assets/images/classes/s_4.png",
       title: "美食",
       idx: 3
     },
     {
       url: "/assets/images/classes/s_5.png",
       title: "人群",
       idx: 4
     },
     {
       url: "/assets/images/classes/s_6.png",
       title: "热门打卡",
       idx: 5
     },
     ],

  viewpointItems:[
    {
      img_url:"/assets/images/swipers/s_4.jpg",
      name:"户部巷",
      short_des:"网红打卡地",
      location:"司门口",
      hotPoint:"极力推荐"//
    },
    {
      img_url: "/assets/images/swipers/s_1.jpg",
      name: "户部巷",
      short_des: "网红打卡地",
      location: "司门口",
      hotPoint: "极力推荐"//
    },
    {
      img_url: "/assets/images/swipers/s_2.jpg",
      name: "户部巷",
      short_des: "网红打卡地",
      location: "司门口",
      hotPoint: "极力推荐"//
    },
    {
      img_url: "/assets/images/swipers/s_3.jpeg",
      name: "户部巷",
      short_des: "网红打卡地",
      location: "司门口",
      hotPoint: "极力推荐"//
    },
    {
      img_url: "/assets/images/swipers/s_2.jpg",
      name: "户部巷",
      short_des: "网红打卡地",
      location: "司门口",
      hotPoint: "极力推荐"//
    },
  ],

  },
  //事件处理函数
  bindViewTap: function() {

    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  // 点击任意一个分类
  onSectionTap: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    
  }
})
