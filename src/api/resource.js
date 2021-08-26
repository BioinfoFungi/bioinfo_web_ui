import service from '@/utils/service'
const baseUrl = '/api/resource'

const ResourceApi = {}

ResourceApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}
ResourceApi.listAll = () =>{
    return service({
        url: `${baseUrl}/listAll`,
        method: 'get'
    })
}

ResourceApi.findByRoleId = (id) =>{
    return service({
        url: `${baseUrl}/findByRoleId/${id}`,
        method: 'get'
    })
}
export default ResourceApi
