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
export default UserRoleApi