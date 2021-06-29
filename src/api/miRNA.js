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



export default MIRNAApi