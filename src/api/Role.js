
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



export default RoleApi