import service from '@/utils/service'
const baseUrl = '/api/miRNA'

const MIRNAApi = {}

MIRNAApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

MIRNAApi.init = (name) =>{
    return service({
        url: `${baseUrl}/init/${name}`,
        method: 'get'
    })
}

export default MIRNAApi