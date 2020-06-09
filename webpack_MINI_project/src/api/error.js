/**
 * 提炼错误信息
 * 参数：err
 * 返回值：[string]errMsg
 */
function errPicker(err) {
    if (typeof err === 'string') {
        return err;
    }

    return err.msg || err.errMsg || (err.detail && err.detail.errMsg) || '未知错误';
}

/**
 * 错误弹窗
 */
export function showErr(err) {
    const msg = errPicker(err);

    console.log(err);
    wx.showModal({
        showCancel: false,
        content: msg
    });
}