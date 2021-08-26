import service from '@/utils/service'
const baseUrl = '/api/role'

const RoleApi = {}

RoleApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

RoleApi.listAll = () =>{
    return service({
        url: `${baseUrl}/listAll`,
        method: 'get'
    })
}
RoleApi.findByRoleId = (id) =>{
    return service({
        url: `${baseUrl}/findByRoleId/${id}`,
        method: 'get'
    })
}

export default RoleApi
