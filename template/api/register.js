import request from '../utils/request'

export default {
    //根据邮箱发送验证码
    sendCode(phone) {
        return request({
            url: `http://localhost:8100/edumail/mail/${phone}`,
            method: "get"
        })
    },

    register(formItem) {
        return request({
            url: `http://localhost:8100/educenter/register`,
            data: formItem,
            method: "post"
        })
    }
}