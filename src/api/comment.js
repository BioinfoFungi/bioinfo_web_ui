import service from '@/utils/service'
const baseUrl = '/api/comment'

const CommentApi = {}

CommentApi.pageByPId = (id,params) =>{
    return service({
        url: `${baseUrl}/projectId/${id}`,
        params: params,
        method: 'get'
    })
}
CommentApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
CommentApi.del = (id) => {
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





export default CommentApi