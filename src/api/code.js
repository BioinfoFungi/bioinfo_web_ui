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
CodeApi.listAll = () => {
    return service({
        url: `${baseUrl}/listAll`,
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
CodeApi.listByCrudType = (CRUD) => {
    return service({
        url: `${baseUrl}/${CRUD}/listAll`,
        method: 'get'
    })
}

CodeApi.init = (param) => {
    return service({
        url: `${baseUrl}/init`,
        params:param,
        method: 'get',
    })
}
CodeApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}

CodeApi.files = (path) => {
    return service({
        url: `${baseUrl}/file`,
        params:{path:path},
        method: 'get',
    })
}
CodeApi.getFileContent = (params) => {
    return service({
        url: `${baseUrl}/getFileContent`,
        params:params,
        method: 'get',
    })
}

CodeApi.saveFileContent = (id,params) => {
    return service({
        url: `${baseUrl}/saveFileContent?id=${id}`,
        data: params,
        method: 'post',
    })
}
export default CodeApi