import service from '@/utils/service'
const baseUrl = '/api/lncRNA'

const LNCRNAApi = {}

LNCRNAApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}
LNCRNAApi.init = (name) =>{
    return service({
        url: `${baseUrl}/init/${name}`,
        method: 'get'
    })
}


export default LNCRNAApi