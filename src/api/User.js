import service from '@/utils/service'
const baseUrl = '/api/user'

const UserApi = {}

UserApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

UserApi.login = (data)=>{
    return service({
        url:`${baseUrl}/login`,
        data:data,
        method: 'post'
    })
}

UserApi.listAll = () =>{
    return service({
        url: `${baseUrl}/listAll`,
        method: 'get'
    })
}

export default UserApi
