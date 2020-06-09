import baseAPI from "./config";
const sessionStorageKey = 'recitation_MINA_token';
const apiUrl = baseAPI.baseLogin();
let sessionId = wx.getStorageSync(sessionStorageKey);

const loginQueue = [];
let isLoginning = false;

/**
 * 配置全局Loding
 * 
 */

// loading配置，请求次数统计
function startLoading() {
	wx.showLoading({
		title: '玩命加载中...',
		icon: 'none',
		mask: true
	});
}
// 关闭
function endLoading() {
	wx.hideLoading();
}

// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		startLoading();
	}
	needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		endLoading();
	}
}



/**
 * promise请求
 * 参数：参考wx.request
 * 返回值：[promise]res
 */
function requestP(options = {}) {
    // 开启Loding
    showFullScreenLoading()

    const { success, fail } = options;
    // 统一注入约定的header
    const header = Object.assign({}, {
        Authorization: sessionId,
    }, options.header);

    return new Promise((res, rej) => {
        wx.request(Object.assign(
            {},
            options,
            {
                header,
                success(r) {
                    const isSuccess = isHttpSuccess(r.statusCode);
                    if (isSuccess) { // 成功的请求状态
                        if (success) {
                            success(r.data);
                            return;
                        }
                        res(r.data);
                    } else {
                        // 非法访问
                        if (r.statusCode === 403 || r.statusCode === 401) {
                            // 登录状态无效，则重新走一遍登录流程
                            // 销毁本地已失效的sessionId
                            sessionId = '';

                            getSessionId()
                                .then((r3) => {
                                    requestP(options)
                                        .then(res)
                                        .catch(rej);
                                });
                        } else {
                            const err = {
                                msg: `（错误代码：${r.statusCode}）`,
                                detail: r,
                            };
                            if (fail) {
                                fail(err);
                                return;
                            }
                            rej(err);
                        }
                    }
                    tryHideFullScreenLoading()
                },
                fail(err) {
                    if (fail) {
                        fail(err);
                        return;
                    }
                    rej(err);
                    tryHideFullScreenLoading()
                },
            },
        ));
    });
}




/**
 * 判断请求状态是否成功
 * 参数：http状态码
 * 返回值：[Boolen]
 */
function isHttpSuccess(status) {
    return status >= 200 && status < 300 || status === 304;
}

/**
 * 登录
 * 参数：undefined
 * 返回值：[promise]res
 */
function login() {
    return new Promise((res, rej) => {
        // 微信登录
        wx.login({
            success(r1) {
                if (r1.code) {
                    // 获取sessionId
                    requestP({
                        url: `${apiUrl}`,
                        data: {
                            app_id: baseAPI.APPID,
                            code: r1.code,
                            source_user_id: getApp() && getApp().globalData.source_user_id ? getApp().globalData.source_user_id : null
                        },
                        method: 'POST'
                    })
                        .then((r2) => {
                            if (r2) {
                                const { token } = r2;
                                // 保存sessionId
                                const newSessionId = token;
                                sessionId = newSessionId; // 更新sessionId
                                // 保存sessionId
                                wx.setStorage({
                                    key: sessionStorageKey,
                                    data: newSessionId,
                                });
                                res(r2);
                            } else {
                                rej({
                                    msg: '获取token失败',
                                    detail: r2
                                });
                            }
                        })
                        .catch((err) => {
                            rej(err);
                        });
                } else {
                    rej({
                        msg: '获取code失败',
                        detail: r1
                    });
                }
            },
            fail: rej,
        });
    });
}


/**
 * 获取sessionId
 * 参数：undefined
 * 返回值：[promise]sessionId
 */
function getSessionId() {
    return new Promise((res, rej) => {
        // 本地token缺失，重新登录
        if (!sessionId) {

            loginQueue.push({ res, rej });

            // 检测是否登录状态
            if (!isLoginning) {

                // 进行登录
                isLoginning = true;

                login()
                    .then(r1 => {
                        isLoginning = false;
                        while (loginQueue.length) {
                            loginQueue.shift().res(r1);
                        }
                    })
                    .catch(err => {
                        isLoginning = false;
                        while (loginQueue.length) {
                            loginQueue.shift().rej(err);
                        }
                    })

            }
        } else {
            res(sessionId)
        }
    })
}


/**
 * ajax高级封装
 * 参数：[Object]option = {}，参考wx.request；
 * [Boolen]keepLogin = false
 * 返回值：[promise]res
 */
function request(options = {}, keepLogin = true) {
    // 默认需要sessionId请求
    if (keepLogin) {
        return new Promise((res, rej) => {
            // 获取sessionId
            getSessionId().then((r1) => {
                // 获取sessionId成功之后，发起请求
                requestP(options)
                    .then((r2) => {
                        // 与后端协商返回指定token过期的状态码判断是否需要重新登录
                        if (r2.rcode === 403) {
                            // 登录状态无效，则重新走一遍登录流程
                            // 销毁本地已失效的sessionId
                            sessionId = '';

                            getSessionId()
                                .then((r3) => {
                                    requestP(options)
                                        .then(res)
                                        .catch(rej);
                                });
                        } else {
                            res(r2);
                        }
                    })
                    .catch(rej);
            })
                .catch(rej);
        });
    } else {
        // 不需要sessionId，直接发起请求
        return requestP(options);
    }
}

export default request;