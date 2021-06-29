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



export default LNCRNAApi