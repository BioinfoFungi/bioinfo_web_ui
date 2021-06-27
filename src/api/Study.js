import service from '@/utils/service'
const baseUrl = '/api/study'

const StudyApi = {}

StudyApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

StudyApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


export default StudyApi