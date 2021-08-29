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
UserApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
UserApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
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
UserApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


export default UserApi
