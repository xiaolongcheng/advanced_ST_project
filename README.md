# advanced_ST_project
详情页导入注意事项：
1、用到了腾讯的位置导航服务，需要在app.json里面加入下列代码：
  "plugins": {
      "routePlan": {
        "version": "1.0.1",
        "provider": "wx50b5593e81dd937a"
      },
      "chooseLocation": {
        "version": "1.0.0",
        "provider": "wx76a9a06e5b4e693e"
      }
    },
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序定位"
      }
    },
    
    ！！！！需要注意的是，这部分代码一定要放在
    "sitemapLocation": "sitemap.json"
    这段代码之前
    
    2、加入detial页面并在app.json函数中注册该页面之后，只需要将onLoad（）函数里面的
    that.data.vId = "001"//options._id;//带入的参数名称如果是_id
    这一行代码按注释将“001”改成对应的景点id就可以了
