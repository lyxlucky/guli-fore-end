import request from '@/utils/request'

export default {
    addChapter(chapter) {
        return request({
            url: "http://localhost:8100/eduservice/chapter",
            method: "post",
            params: { courseId: chapter.courseId, title: chapter.title, sort: chapter.sort }
        })
    },
    updateChapter(id, chapter) {
        return request({
            url: "http://localhost:8100/eduservice/chapter",
            method: "put",
            params: { id: id, title: chapter.title, sort: chapter.sort }
        })
    },
    deleteChapter(id) {
        return request({
            url: `http://localhost:8100/eduservice/chapter/${id}`,
            method: "delete",
        })
    },
    getChapterById(id) {
        return request({
            url: `http://localhost:8100/eduservice/chapter/${id}`,
            method: "get",
        })
    },
}