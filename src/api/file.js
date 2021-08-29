import service from '@/utils/service'
const baseUrl = '/api/file'

const FileApi = {}



FileApi.list = (param) =>{
    return service({
        url: `${baseUrl}/list`,
        params:{path:param},
        method: 'get'
    })
}

export default FileApi
