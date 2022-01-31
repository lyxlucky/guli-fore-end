import request from '../utils/request'
export default {
    getList() {
        return request({
            url: "http://localhost:8100/educms/front/banner",
            method: "get"
        })
    }
}