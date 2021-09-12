import service from '@/utils/service'
const baseUrl = '/api/cancer_study'

const CancerStudyApi = {}

CancerStudyApi.page = (params,more=false) =>{
    return service({
        url: `${baseUrl}?more=${more}`,
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

CancerStudyApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

CancerStudyApi.checkFileExist = (id) => {
    return service({
        url: `${baseUrl}/checkFile/${id}`,
        method: 'get'
    })
}


CancerStudyApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
CancerStudyApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}


CancerStudyApi.init = (param) => {
    return service({
        url: `${baseUrl}/init`,
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


CancerStudyApi.createTSVFile = () => {
    return service({
        url: `${baseUrl}/createTSVFile`,
        method: 'post',
        responseType: 'blob'
    })
}
export default CancerStudyApi