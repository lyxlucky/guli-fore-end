import request from '../utils/request'
export default {
    getCourseList(current, pageSize, CourseInfo) {
        return request({
            url: `http://localhost:8100/eduservice/courseFront/${current}/${pageSize}`,
            method: "get",
            data: CourseInfo
        })
    },
    getSubjectList() {
        return request({
            url: `http://localhost:8100/eduservice/subject`,
            method: "get",
        })
    },

    getCourseInfo(id) {
        return request({
            url: `http://localhost:8100/eduservice/courseFront/${id}`,
            method: "get",
        })
    },
    addCourseViewCount() {
        return request({
            url: `http://localhost:8100/eduservice/courseFront/${id}`,
            method: "put",
        })
    }
}