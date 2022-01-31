import request from '@/utils/request'

export default {

    //讲师列表
    getSubjectList() {
        return request({
            url: `http://localhost:8100/eduservice/subject`,
            method: 'get',
        })
    },

}