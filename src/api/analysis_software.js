import service from '@/utils/service'
const baseUrl = '/api/analysis_software'

const AnalysisSoftwareApi = {}

AnalysisSoftwareApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

AnalysisSoftwareApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

AnalysisSoftwareApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
AnalysisSoftwareApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}

export default AnalysisSoftwareApi