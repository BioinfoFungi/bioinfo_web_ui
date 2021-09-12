import service from '@/utils/service'
const baseUrl = '/api/data_category'

const DataCategoryApi = {}

DataCategoryApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

DataCategoryApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

DataCategoryApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
DataCategoryApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}
DataCategoryApi.init = (param) => {
    return service({
        url: `${baseUrl}/init`,
        params:param,
        method: 'get',
    })
}
DataCategoryApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}

export default DataCategoryApi