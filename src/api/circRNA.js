import service from '@/utils/service'
const baseUrl = '/api/circRNA'

const circRNAApi = {}

circRNAApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}
circRNAApi.init = (name) =>{
    return service({
        url: `${baseUrl}/init/${name}`,
        method: 'get'
    })
}


export default circRNAApi