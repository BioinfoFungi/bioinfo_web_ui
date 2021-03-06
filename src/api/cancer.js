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

CancerApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
CancerApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}


CancerApi.init = (param) => {
    return service({
        url: `${baseUrl}/init`,
        params:param,
        method: 'get',
    })
}
CancerApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}
export default CancerApi