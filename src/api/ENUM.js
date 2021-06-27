import service from '@/utils/service'
const baseUrl = '/api/enum'

const ENUMApi = {}

ENUMApi.projectStatuses = () =>{
    return service({
        url: `${baseUrl}/projectStatuses`,
        method: 'get'
    })
}

export default ENUMApi