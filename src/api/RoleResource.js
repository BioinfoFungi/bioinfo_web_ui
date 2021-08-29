import service from '@/utils/service'
const baseUrl = '/api/role_resource'

const RoleResourceApi = {}


RoleResourceApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
RoleResourceApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

export default RoleResourceApi