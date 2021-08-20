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


export default DataCategoryApi