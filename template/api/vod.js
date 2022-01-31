import request from '../utils/request'
export default {
    getPlayAuth(vid) {
        return request({
            url: `http://localhost:8100/eduvod/video/${vid}`,
            method: 'get'
        })
    }
}