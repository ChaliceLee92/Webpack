import baseAPI from "./config";
import request from "./network";
import regeneratorRuntime from '@utils/runtime'

const apiUrl = baseAPI.graphQL();

const req = {
    // 获取首页配置列表
    async getHomeConfigList(data) {
        const url = `${apiUrl}`
        return request({
            url, 
            data, 
            method: 'GET', 
            header: {
                'content-type': 'application/graphql'
            },
        });
    }
}

export default req;