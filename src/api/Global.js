import service from '@/utils/service'
const baseUrl = '/api'

const GlobalApi = {}

GlobalApi.globalConfig = () =>{
    return service({
        url: `${baseUrl}/global`,
        method: 'get'
    })
}

export default GlobalApi