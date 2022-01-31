import request from '../utils/request'
export default {
    getIndexData() {
        return request({
            url: "http://localhost:8100/eduservice/front",
            method: "get"
        })
    }
}