import request from '@/utils/request'

export default {

    //TODO 整合Swagger
    getSwaggerList() {
        return request({
            url: `http://localhost:8100/swagger-ui.html`,
            method: 'get',
        })
    },
}