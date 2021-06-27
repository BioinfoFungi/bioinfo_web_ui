import service from '@/utils/service'
const baseUrl = '/api/cancer_study'

const CancerStudyApi = {}

CancerStudyApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

CancerStudyApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


export default CancerStudyApi