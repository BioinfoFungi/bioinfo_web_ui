import service from '@/utils/service'
const baseUrl = '/api/user_role'

const UserRoleApi = {}


UserRoleApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
UserRoleApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}
UserRoleApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

export default UserRoleApi