//detail.js
const app=getApp();

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),




    cmtData: {},//评论数据
    cmtAtName:"",
    cmtPlaceholder: '在这里输入你的留言',
    cmt: "",
    vId: null,//景点id
    vData: {},//景点数据
    college: app.globalData.college,
    swiperCurrent: 0,
    hasFavor: false,//当前用户是否已经收藏商品
    favor: 0,

  },

  onLoad: function (options) {
    var that=this;
    that.data.vId = "001"//options._id;//带入的参数名称是_id
    that.loadTravelData(that.data.vId);
    that.loadComment();
  },

  //滑块视图切换事件
  swiperChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: this.data.vData.detail_img[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: this.data.vData.detail_img // 需要预览的图片http链接列表
    })
  },
// 存在输入时
  inputChange: function (e) {
    this.data.cmt = e.detail.value;
  },

  //留言“发送”在获取用户授权前后的两个绑定函数
  bindGetUserInfo(e) {
    this.setData({
      hasUserInfo: true,
     userInfo: e.detail.userInfo
    });
    console.log(this.data.userInfo)
  },
  submitComment: function () {
    let that = this;
    if (that.data.cmt==""){
      wx.showToast({
        title: '不允许空输入！',
        icon: 'none',
        mask: true,
        duration: 2000
      });
    }
    else {
      var date = that.getNowTime();//评论时间
      // console.log("在提交评论的时候打印用户头像url", that.data.userInfo.avatarUrl);

      var db = wx.cloud.database();
      // if (that.data.cmtAtName){
      //   console.log('打印被评论者的用户名', that.data.cmtAtName)
      
      // }
      db.collection('comments').add({//向user数据库添加用户记录
        // data 字段表示需新增的 JSON 数据
        data: {
          cmt: that.data.cmt,//评论的内容
          cmtAtName: that.data.cmtAtName,
          createAt: date,//日期
          uAva: that.data.userInfo.avatarUrl,
          uName: that.data.userInfo.nickName,
          viewId: that.data.vId,

        },
        success: res => {
          //评论成功就将刷新留言
          that.loadComment();
          taht.setData({
            cmtAtName: "",
          });
          wx.showToast({
            title: '留言成功！',
            icon: 'none',
            mask: true,
            duration: 2000
          });
        },
      });

      }
    
  },
  //点击某一条评论，指定回复
  commentAt: function (e) {
    console.log(e.currentTarget.dataset.uname, this.data.userInfo.nickName)
    this.setData({
      cmtAt: '回复@' + e.currentTarget.dataset.uname,
      cmtAtName: e.currentTarget.dataset.uname,
    })
  },
//加载景区信息，描述以及图片等
loadTravelData: function(vId){
  var that= this;
  var db = wx.cloud.database();
  db.collection('site').where({
    _id: vId//"001"
  }).get({
    // 成功
    success: res => {
      that.setData({
        vData: res.data[0],
        favor:res.data[0].like,
      })

        console.log('[数据库] [查询景点] 成功 ', that.data.vData.coordinate.latitude)
    },
    //  出错
    fail: function (res) {
      conso.log("[数据库] [查询景点] 失败");
    }
  });
},

// 加载评论
  loadComment: function () {
    let that = this;
    var db = wx.cloud.database();
    db.collection('comments')
     .where({
       viewId: that.data.vId // 填入当前景点的id:that.data.vId
     })
    .get({
      // 成功
      success: res => {
        // wx.hideLoading();
        let comments = res.data;
        let commentsData = comments;
        that.setData({
          cmtData: res.data,
          cmt: "",
        })
      },
      //  出错
      fail: function (res) {
        conso.log("[数据库] [查询评论] 失败");
      }
    });
  },


  // 底部导航栏的三个响应事件
  //点赞状态改变
  changeFavor: function () {
    let that = this;
    let hf = that.data.hasFavor;
    let fnum = 0;
    if (hf == false) { //未点赞，在缓存中添加id键，数据库中favor增量置1
      wx.setStorageSync(that.data.vId, true);
      hf = true;
      fnum = 1;
    } else { //已点赞，，数据库like增量置-1
      wx.removeStorageSync(that.data.vId);
      hf = false;
      fnum = -1;
    }
    that.setData({
      hasFavor: hf,
      favor: that.data.favor + fnum
    });
    var db = wx.cloud.database();
    db.collection('site').
    doc('that.data.vId').update({
      data: {
        like: that.data.favor
      },
      success: (res) => {
        if (fnum == -1){
          wx.showToast({
            title: "已取消点赞",
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
        else if (fnum == 1){
          wx.showToast({
            title: "已点赞",
            icon: 'none',
            mask: true,
            duration: 2000
          })
        }
        
      }
    });

  },
onNavigateTo: function (e) {
    var that=this;
    //获取当前位置和目的地位置
    let plugin = requirePlugin('routePlan');
    let key = 'AF2BZ-RF7RU-YOHVX-BT5QG-WXLMQ-SBB7D';  //使用在腾讯位置服务申请的key
    let referer = '江城秀-用户导航端';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': that.data.vData.title,
      'latitude': that.data.vData.coordinate.latitude,
        'longitude': that.data.vData.coordinate.longitude,
    });
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },

    onShareAppMessage:function(res){
      if(res.from==="image"){
          console.log(res.target,res)
      }
      return{
        title:'我在“江城·美拍”小程序里找到了好玩儿的地方，一起来看看吧',
        path:'pages/detail/detail',
        imageUrl:'/assets/images/headImage.jpg'
      }
    },
//获取时间的函数
  getNowTime: function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
      month = '0' + month;
    };
    if (day < 10) {
      day = '0' + day;
    };
    //  如果需要时分秒，就放开
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var formatDate = year + '-' + month + '-' + day;
    return formatDate;
  }
})
