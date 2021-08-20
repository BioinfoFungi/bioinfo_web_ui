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


export default AnalysisSoftwareApi