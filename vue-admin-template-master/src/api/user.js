import request from '@/utils/request'

export function login(data) {
    return request({
        url: 'http://localhost:8100/eduacl/user',
        method: 'post',
        data: data
    })
}

export function getInfo(token) {
    return request({
        url: 'http://localhost:8100/eduservice/user',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}

export function getSwaggerInfo() {
    return request({
        url: 'http://localhost:8100/swagger-ui.html',
        method: 'get'
    })
}