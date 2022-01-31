import request from '@/utils/request'

export default {
    //添加课程信息
    addCourse(courseInfo) {
        return request({
            url: "http://localhost:8100/eduservice/course",
            method: "post",
            params: { title: courseInfo.title, subjectId: courseInfo.subjectId, subjectParentId: courseInfo.subjectParentId, teacherId: courseInfo.teacherId, lessonNum: courseInfo.lessonNum, description: courseInfo.description, cover: courseInfo.cover, price: courseInfo.price }
        })
    },
    getTeacherList() {
        return request({
            url: "http://localhost:8100/eduservice/teacher",
            method: "get",
        })
    },
    getChapterList(courseId) {
        return request({
            url: `http://localhost:8100/eduservice/chapter`,
            method: "get",
            params: { id: courseId }
        })
    },
    //根据课程Id回显
    getCourseById(courseId) {
        return request({
            url: `http://localhost:8100/eduservice/course/${courseId}`,
            method: "get",
        })
    },
    //修改课程信息
    updateCourseById(courseDto) {
        return request({
            url: `http://localhost:8100/eduservice/course`,
            method: "put",
            data: courseDto
        })
    },

    getPublishCourseById(id) {
        return request({
            url: `http://localhost:8100/eduservice/course`,
            method: "get",
            params: { id: id }
        })
    },
    publishCourse(id) {
        return request({
            url: `http://localhost:8100/eduservice/course/${id}`,
            method: "put",
        })
    },
    getCourseList(current, pageSize, courseDto) {
        return request({
            url: `http://localhost:8100/eduservice/course/${current}/${pageSize}`,
            method: "get",
            params: { title: courseDto.title, status: courseDto.status, begin: courseDto.begin, end: courseDto.end }
        })
    },
    deleteCourseById(id) {
        return request({
            url: `http://localhost:8100/eduservice/course/${id}`,
            method: "delete",
        })
    },
}