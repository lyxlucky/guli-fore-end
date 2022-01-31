import request from '../utils/request'

export default {
    getList(current, pageSize) {
        return request({
            url: `http://localhost:8100/eduservice/teacherFront/${current}/${pageSize}`,
            method: "get"
        })
    },

    getTeacherInfo(id) {
        return request({
            url: `http://localhost:8100/eduservice/teacherFront/${id}`,
            method: "get"
        })
    }
}