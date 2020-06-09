//app.js
import wxp from "@/api/wxp";
import { camelCase } from 'lodash';

App({

  onLaunch: function () {
    console.log(camelCase('OnLaunch'));
    // getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     } else {
    //       // 未授权，跳转到授权页面
    //       wx.reLaunch({
    //         url: '/pages/authSetting/index',
    //       })
    //     }
    //   }
    // })
    wxp.getSetting().then(res =>{
      console.log('%c 🥗 res: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', res);
    })
  },

  globalData: {
    userInfo: null,
    is_auth: 0 //登录后返回的授权状态：0未授权，1已授权
  }

})