import service from '@/utils/service'
const baseUrl = '/api/organize_file'

const OrganizeApi = {}

OrganizeApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}



export default OrganizeApi