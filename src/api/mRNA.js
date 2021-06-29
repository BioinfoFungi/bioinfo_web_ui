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



export default MRNAApi