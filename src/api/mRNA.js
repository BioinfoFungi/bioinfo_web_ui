import service from '@/utils/service'
const baseUrl = '/api/mRNA'

const MRNAApi = {}

MRNAApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}
MRNAApi.init = (name) =>{
    return service({
        url: `${baseUrl}/init/${name}`,
        method: 'get'
    })
}


export default MRNAApi