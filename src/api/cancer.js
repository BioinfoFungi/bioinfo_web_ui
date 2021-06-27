import service from '@/utils/service'
const baseUrl = '/api/cancer'

const CancerApi = {}

CancerApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

CancerApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


export default CancerApi