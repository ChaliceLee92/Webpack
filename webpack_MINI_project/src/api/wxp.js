/**
 * promise微信API方法
 */
function wxPromise(api) {
    function func(options, ...params) {
        return new Promise((resolve, reject) => {
            api(
                Object.assign({}, options, {
                    success: (res) => {
                        resolve(res)
                    },
                    fail: reject
                }),
                ...params
            )
        })
    }

    return func
}

export default {
    // 界面交互
    showToast: wxPromise(wx.showToast),
    showLoading: wxPromise(wx.showLoading),
    showModal: wxPromise(wx.showModal),
    showActionSheet: wxPromise(wx.showActionSheet),
    hideLoading: wxPromise(wx.hideLoading),
    // 导航条
    setNavigationBarTitle: wxPromise(wx.setNavigationBarTitle),
    setNavigationBarColor: wxPromise(wx.setNavigationBarColor),
    setTopBarText: wxPromise(wx.setTopBarText),
    // 导航
    navigateTo: wxPromise(wx.navigateTo),
    redirectTo: wxPromise(wx.redirectTo),
    switchTab: wxPromise(wx.switchTab),
    reLaunch: wxPromise(wx.reLaunch),

    // 用户相关
    login: wxPromise(wx.login),
    checkSession: wxPromise(wx.checkSession),
    authorize: wxPromise(wx.authorize),
    getUserInfo: wxPromise(wx.getUserInfo),

    // 支付
    requestPayment: wxPromise(wx.requestPayment),

    // 图片
    chooseImage: wxPromise(wx.chooseImage),
    previewImage: wxPromise(wx.previewImage),
    getImageInfo: wxPromise(wx.getImageInfo),
    saveImageToPhotosAlbum: wxPromise(wx.saveImageToPhotosAlbum),

    // 文件
    uploadFile: wxPromise(wx.uploadFile),
    downloadFile: wxPromise(wx.downloadFile),

    // 录音
    startRecord: wxPromise(wx.startRecord),

    // 音频播放
    playVoice: wxPromise(wx.playVoice),

    // 音乐播放
    getBackgroundAudioPlayerState: wxPromise(wx.getBackgroundAudioPlayerState),
    playBackgroundAudio: wxPromise(wx.playBackgroundAudio),
    seekBackgroundAudio: wxPromise(wx.seekBackgroundAudio),

    // 视频
    chooseVideo: wxPromise(wx.chooseVideo),
    saveVideoToPhotosAlbum: wxPromise(wx.saveVideoToPhotosAlbum),

    // 文件
    saveFile: wxPromise(wx.saveFile),
    getFileInfo: wxPromise(wx.getFileInfo),
    getSavedFileList: wxPromise(wx.getSavedFileList),
    getSavedFileInfo: wxPromise(wx.getSavedFileInfo),
    removeSavedFile: wxPromise(wx.removeSavedFile),
    openDocument: wxPromise(wx.openDocument),

    // 数据缓存
    setStorage: wxPromise(wx.setStorage),
    getStorage: wxPromise(wx.getStorage),
    getStorageInfo: wxPromise(wx.getStorageInfo),
    removeStorage: wxPromise(wx.removeStorage),

    // 位置
    getLocation: wxPromise(wx.getLocation),
    chooseLocation: wxPromise(wx.chooseLocation),
    openLocation: wxPromise(wx.openLocation),

    // 设备
    getSystemInfo: wxPromise(wx.getSystemInfo),
    getNetworkType: wxPromise(wx.getNetworkType),
    startAccelerometer: wxPromise(wx.startAccelerometer),
    stopAccelerometer: wxPromise(wx.stopAccelerometer),
    startCompass: wxPromise(wx.startCompass),
    stopCompass: wxPromise(wx.stopCompass),
    // 打电话
    makePhoneCall: wxPromise(wx.makePhoneCall),
    // 扫码
    scanCode: wxPromise(wx.scanCode),
    // 剪切板
    setClipboardData: wxPromise(wx.setClipboardData),
    getClipboardData: wxPromise(wx.getClipboardData),
    // 蓝牙
    openBluetoothAdapter: wxPromise(wx.openBluetoothAdapter),
    closeBluetoothAdapter: wxPromise(wx.closeBluetoothAdapter),
    getBluetoothAdapterState: wxPromise(wx.getBluetoothAdapterState),
    startBluetoothDevicesDiscovery: wxPromise(wx.startBluetoothDevicesDiscovery),
    stopBluetoothDevicesDiscovery: wxPromise(wx.stopBluetoothDevicesDiscovery),
    getBluetoothDevices: wxPromise(wx.getBluetoothDevices),
    getConnectedBluetoothDevices: wxPromise(wx.getConnectedBluetoothDevices),
    createBLEConnection: wxPromise(wx.createBLEConnection),
    closeBLEConnection: wxPromise(wx.closeBLEConnection),
    getBLEDeviceServices: wxPromise(wx.getBLEDeviceServices),
    // iBeacon
    startBeaconDiscovery: wxPromise(wx.startBeaconDiscovery),
    stopBeaconDiscovery: wxPromise(wx.stopBeaconDiscovery),
    getBeacons: wxPromise(wx.getBeacons),
    // 屏幕亮度
    setScreenBrightness: wxPromise(wx.setScreenBrightness),
    getScreenBrightness: wxPromise(wx.getScreenBrightness),
    setKeepScreenOn: wxPromise(wx.setKeepScreenOn),
    // 振动
    vibrateLong: wxPromise(wx.vibrateLong),
    vibrateShort: wxPromise(wx.vibrateShort),
    // 联系人
    addPhoneContact: wxPromise(wx.addPhoneContact),
    // NFC
    getHCEState: wxPromise(wx.getHCEState),
    startHCE: wxPromise(wx.startHCE),
    stopHCE: wxPromise(wx.stopHCE),
    sendHCEMessage: wxPromise(wx.sendHCEMessage),
    // Wi-Fi
    startWifi: wxPromise(wx.startWifi),
    stopWifi: wxPromise(wx.stopWifi),
    connectWifi: wxPromise(wx.connectWifi),
    getWifiList: wxPromise(wx.getWifiList),
    setWifiList: wxPromise(wx.setWifiList),
    getConnectedWifi: wxPromise(wx.getConnectedWifi),

    // 第三方平台
    getExtConfig: wxPromise(wx.getExtConfig),

    // 转发
    showShareMenu: wxPromise(wx.showShareMenu),
    hideShareMenu: wxPromise(wx.hideShareMenu),
    updateShareMenu: wxPromise(wx.updateShareMenu),
    getShareInfo: wxPromise(wx.getShareInfo),

    // 收货地址
    chooseAddress: wxPromise(wx.chooseAddress),

    // 卡券
    addCard: wxPromise(wx.addCard),
    openCard: wxPromise(wx.openCard),

    // 设置
    openSetting: wxPromise(wx.openSetting),
    getSetting: wxPromise(wx.getSetting),

    // 微信运动
    getWeRunData: wxPromise(wx.getWeRunData),

    // 打开小程序
    navigateToMiniProgram: wxPromise(wx.navigateToMiniProgram),
    navigateBackMiniProgram: wxPromise(wx.navigateBackMiniProgram),

    // 获取发票抬头
    chooseInvoiceTitle: wxPromise(wx.chooseInvoiceTitle),

    // 生物认证
    checkIsSupportSoterAuthentication: wxPromise(wx.checkIsSupportSoterAuthentication),
    startSoterAuthentication: wxPromise(wx.startSoterAuthentication),
    checkIsSoterEnrolledInDevice: wxPromise(wx.checkIsSoterEnrolledInDevice)



}

