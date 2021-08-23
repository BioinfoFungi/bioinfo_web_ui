import service from '@/utils/service'
const baseUrl = '/api/task'

const TaskApi = {}

TaskApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}

TaskApi.run = (params) =>{
    return service({
        url: `${baseUrl}/run`,
        params: params,
        method: 'get'
    })
}

TaskApi.runOne = (id) =>{
    return service({
        url: `${baseUrl}/run/${id}`,
        method: 'get'
    })
}

TaskApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

export default TaskApi