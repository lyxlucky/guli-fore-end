import request from '@/utils/request'
export default {
    addVideo(video) {
        return request({
            url: "http://localhost:8100/eduservice/video",
            method: "post",
            params: { chapterId: video.chapterId, courseId: video.courseId, title: video.title, sort: video.sort, free: video.free, videoSourceId: video.videoSourceId }
        })
    },

    updateVideoByVideoId(video) {
        return request({
            url: "http://localhost:8100/eduservice/video",
            method: "put",
            params: { id: video.id, title: video.title, sort: video.sort, free: video.free, }
        })
    },

    deleteVideo(id) {
        return request({
            url: `http://localhost:8100/eduservice/video/${id}`,
            method: "delete",
        })
    },

    getVideoById(id) {
        return request({
            url: `http://localhost:8100/eduservice/video/${id}`,
            method: "get",
        })
    },

    deleteAliyunVideo(id) {
        return request({
            url: `http://localhost:8100/eduvod/video/${id}`,
            method: "delete",
        })
    },
}