import request from '../utils/request'

export default {
    //根据邮箱发送验证码
    login(userInfo) {
        return request({
            url: `http://localhost:8100/educenter/login`,
            method: "post",
            params: { "email": userInfo.email, "password": userInfo.password }
        })
    },

    getInfo() {
        return request({
            url: `http://localhost:8100/educenter/getMemberInfo`,
            method: "get"
        })
    }
}