import service from '@/utils/service'
const baseUrl = '/api/data_origin'

const DataOriginApi = {}

DataOriginApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

DataOriginApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


export default DataOriginApi