import request from '@/utils/request'

export default {

    //讲师列表
    getTeacherList(current, pageSize, teacherDto) {
        return request({
            url: `http://localhost:8100/eduservice/teacher/${current}/${pageSize}`,
            method: 'get',
            params: { name: teacherDto.name, level: teacherDto.level, begin: teacherDto.begin, end: teacherDto.end },
        })
    },

    removeById(teacherId) {
        return request({
            url: `http://localhost:8100/eduservice/teacher/${teacherId}`,
            method: 'delete'
        })
    },
    save(teacher) {
        return request({
            url: `http://localhost:8100/eduservice/teacher/`,
            method: 'post',
            params: { name: teacher.name, intro: teacher.intro, career: teacher.career, level: teacher.level, avatar: teacher.avatar, sort: teacher.sort }
        })
    },
    getTeacherInfo(id) {
        return request({
            url: `http://localhost:8100/eduservice/teacher/${id}`,
            method: 'get',
        })
    },

    updateById(teacher) {
        return request({
            url: `http://localhost:8100/eduservice/teacher/${teacher.id}`,
            method: 'put',
            params: { name: teacher.name, intro: teacher.intro, career: teacher.career, avatar: teacher.avatar, level: teacher.level, sort: teacher.sort }
        })
    }



}