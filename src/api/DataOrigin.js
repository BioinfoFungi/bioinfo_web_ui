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

DataOriginApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
DataOriginApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}


DataOriginApi.init = (param) => {
    return service({
        url: `${baseUrl}/init`,
        params:param,
        method: 'get',
    })
}
DataOriginApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}
export default DataOriginApi