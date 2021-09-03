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