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
TaskApi.listAll = (CRUD,params) =>{
    return service({
        url: `${baseUrl}/listAll/${CRUD}`,
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

TaskApi.log = (params) =>{
    return service({
        url: `${baseUrl}/log`,
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

TaskApi.shutdown = (id) =>{
    return service({
        url: `${baseUrl}/shutdown/${id}`,
        method: 'get'
    })
}

TaskApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}


TaskApi.findById = (id) => {
    return service({
        url: `${baseUrl}/findById/${id}`,
        method: 'get'
    })
}
TaskApi.runCodes = (params) => {
    return service({
        url: `${baseUrl}/runCodes`,
        data: params,
        method: 'post'
    })
}
TaskApi.runByCodeId = (id) => {
    return service({
        url: `${baseUrl}/runByCodeId/${id}`,
        method: 'get',
    })
}
TaskApi.removeALlTask = () => {
    return service({
        url: `${baseUrl}/removeALlTask`,
        method: 'get',
    })
}

TaskApi.getObjMap = (id) => {
    return service({
        url: `${baseUrl}/getObjMap/${id}`,
        method: 'get'
    })
}
export default TaskApi