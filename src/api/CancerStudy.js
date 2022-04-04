import service from '@/utils/service'
const baseUrl = '/api/cancer_study'

const CancerStudyApi = {}

CancerStudyApi.page = (CRUD,params,more=false) =>{
    return service({
        url: `${baseUrl}/${CRUD}?more=${more}`,
        params: params,
        method: 'get'
    })
}

CancerStudyApi.pageByCodeId = (codeId,params,more=false) =>{
    return service({
        url: `${baseUrl}/pageByCodeId/${codeId}?more=${more}`,
        params: params,
        method: 'get'
    })
}
CancerStudyApi.list = (params,more=false) =>{
    return service({
        url: `${baseUrl}/list?more=${more}`,
        params: params,
        method: 'get'
    })
}


CancerStudyApi.listByCancerId = (id) =>{
    return service({
        url: `${baseUrl}/listByCancerId/${id}`,
        method: 'get'
    })
}



CancerStudyApi.checkFileExist = (id) => {
    return service({
        url: `${baseUrl}/checkFile/${id}`,
        method: 'get'
    })
}






CancerStudyApi.init = (CRUD,param) => {
    return service({
        url: `${baseUrl}/init/${CRUD}`,
        params:param,
        method: 'get',
    })
}

CancerStudyApi.findById = (id,params) => {
    return service({
        url: `${baseUrl}/findById/${id}`,
        params:params,
        method: 'get'
    })
}

CancerStudyApi.addTask = (CRUD,params) => {
    return service({
        url: `${baseUrl}/addTask/${CRUD}`,
        params:params,
        method: 'get'
    })
}

CancerStudyApi.runTask = (CRUD,params) => {
    return service({
        url: `${baseUrl}/runTask/${CRUD}`,
        params:params,
        method: 'get'
    })
}
CancerStudyApi.findById = (CRUD,params) => {
    return service({
        url: `${baseUrl}/${CRUD}/findById`,
        params:params,
        method: 'get'
    })
}
CancerStudyApi.getFields = (CRUD) => {
    return service({
        url: `${baseUrl}/${CRUD}/getFields`,
        method: 'get'
    })
}
CancerStudyApi.createTSVFile = (CRUD) => {
    return service({
        url: `${baseUrl}/${CRUD}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}
CancerStudyApi.delById = (CRUD,params) => {
    return service({
        url: `${baseUrl}/${CRUD}/delById`,
        params:params,
        method: 'get'
    })
}

CancerStudyApi.add = (CRUD,params) => {
    return service({
        url: `${baseUrl}/${CRUD}/add`,
        data: params,
        method: 'post'
    })
}

CancerStudyApi.update = (CRUD,id,params) => {
    return service({
        url: `${baseUrl}/${CRUD}/update?id=${id}`,
        data: params,
        method: 'post'
    })
}
export default CancerStudyApi