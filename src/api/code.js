import service from '@/utils/service'
const baseUrl = '/api/code'

const CodeApi = {}

CodeApi.page = (params,more=false) =>{
    return service({
        url: `${baseUrl}?more=${more}`,
        params: params,
        method: 'get'
    })
}


CodeApi.findByCan = (id) => {
    return service({
        url: `${baseUrl}/findByCan/${id}`,
        method: 'get'
    })
}
CodeApi.checkFileExist = (id) => {
    return service({
        url: `${baseUrl}/checkFile/${id}`,
        method: 'get'
    })
}


CodeApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

CodeApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}

CodeApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}

CodeApi.findById = (id,params) => {
    return service({
        url: `${baseUrl}/findById/${id}`,
        params:params,
        method: 'get'
    })
}
CodeApi.listAllAnnTask = () => {
    return service({
        url: `${baseUrl}/listAllAnnTask`,
        method: 'get'
    })
}

CodeApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}

CodeApi.init = (path) => {
    return service({
        url: `${baseUrl}/init`,
        params:{path:path},
        method: 'get',
    })
}
export default CodeApi