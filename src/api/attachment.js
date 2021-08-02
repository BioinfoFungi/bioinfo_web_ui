import service from '@/utils/service'
const baseUrl = '/api/attachment'

const AttachmentApi = {}
AttachmentApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}



AttachmentApi.pageByPId = (id,params) =>{
    return service({
        url: `${baseUrl}/page/${id}`,
        params: params,
        method: 'get'
    })
}
AttachmentApi.listByPId = (id) =>{
    return service({
        url: `${baseUrl}/list/${id}`,
        method: 'get'
    })
}

AttachmentApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}

AttachmentApi.upload = (params) => {
    return service({
        url: `${baseUrl}/upload`,
        data: params,
        method: 'post'
    })
}


AttachmentApi.uploadFiles = (id,params) => {
    return service({
        url: `${baseUrl}/uploadFiles/${id}`,
        data: params,
        method: 'post'
    })
}
AttachmentApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}
// ProjectApi.update = (id,params) => {
//     return service({
//         url: `${baseUrl}/update/${id}`,
//         data: params,
//         method: 'post'
//     })
// }

// ProjectApi.findById = id => {
//     return service({
//         url: `${baseUrl}/find/${id}`,
//         method: 'get'
//     })
// }





export default AttachmentApi