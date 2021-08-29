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
RoleApi.findByWithoutRoleId = (id) =>{
    return service({
        url: `${baseUrl}/findByWithoutRoleId/${id}`,
        method: 'get'
    })
}

RoleApi.findByUserId = (id) =>{
    return service({
        url: `${baseUrl}/findByUserId/${id}`,
        method: 'get'
    })
}
RoleApi.findByWithoutUserId = (id) =>{
    return service({
        url: `${baseUrl}/findByWithoutUserId/${id}`,
        method: 'get'
    })
}
RoleApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
RoleApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}
RoleApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}
export default RoleApi
