//index.js
console.log(`环境：${process.env.NODE_ENV} 构建类型：${process.env.BUILD_TYPE}`)
import regeneratorRuntime from '@utils/runtime'
import req from "./../../api/request";
import { showErr } from "./../../api/error";

//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: async function () {
    // wx.showNavigationBarLoading()
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffdd51',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })


    let res =  await req.getHomeConfigList({
      query: `query{getHomeConfig{
        type
        path
        cover
        title
        sub_title
        appid
        icon
      }
    }`
    }).catch(showErr)
    console.log('%c 🍏 res: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', res);
  },
})
