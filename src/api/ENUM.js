import service from '@/utils/service'
const baseUrl = '/api/enum'

const ENUMApi = {}

ENUMApi.projectStatuses = () =>{
    return service({
        url: `${baseUrl}/projectStatuses`,
        method: 'get'
    })
}

ENUMApi.codeType = () =>{
    return service({
        url: `${baseUrl}/codeType`,
        method: 'get'
    })
}
ENUMApi.crudType = () =>{
    return service({
        url: `${baseUrl}/crudType`,
        method: 'get'
    })
}

export default ENUMApi