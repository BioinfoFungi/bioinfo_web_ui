import service from '@/utils/service'
const baseUrl = '/api/code_term'

const CodeTermApi = {}


CodeTermApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

CodeTermApi.listByCodeId = (id) => {
    return service({
        url: `${baseUrl}/listByCodeId/${id}`,
        method: 'get'
    })
}

CodeTermApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}

export default CodeTermApi