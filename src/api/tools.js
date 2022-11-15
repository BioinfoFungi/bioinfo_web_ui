import service from '@/utils/service'
const baseUrl = '/api/tools'

const ToolsApi = {}

ToolsApi.page = (params) =>{
    return service({
        url: `${baseUrl}`,
        params: params,
        method: 'get'
    })
}
ToolsApi.add = (params) => {
    return service({
        url: baseUrl,
        data: params,
        method: 'post'
    })
}
ToolsApi.updateContent = (id,params) => {
    return service({
        url: `${baseUrl}/updateContent/${id}`,
        data: params,
        method: 'post'
    })
}

ToolsApi.update = (id,params) => {
    return service({
        url: `${baseUrl}/update/${id}`,
        data: params,
        method: 'post'
    })
}

ToolsApi.findById = id => {
    return service({
        url: `${baseUrl}/find/${id}`,
        method: 'get'
    })
}

ToolsApi.del = (id) => {
    return service({
        url: `${baseUrl}/del/${id}`,
        method: 'get'
    })
}

// articleApi.updateAll = (params) => {
//     return service({
//         url: `${baseUrl}/updateAll`,
//         params: params,
//         method: 'get'
//     })
// }

// articleApi.query = (params) => {
//     return service({
//         url: baseUrl,
//         params: params,
//         method: 'get'
//     })
// }
// articleApi.updateCategory = (articleId,baseCategoryId) => {
//     return service({
//         url: `${baseUrl}/updateCategory/${articleId}`,
//         params: {baseCategoryId:baseCategoryId},
//         method: 'get'
//     })
// }
// articleApi.addArticleToChannel = (articleId,channelId) => {
//     return service({
//         url: `${baseUrl}/addArticleToChannel/${articleId}`,
//         params: {channelId:channelId},
//         method: 'get'
//     })
// }

// articleApi.queryTitle = (title) => {
//     return service({
//         url: `${baseUrl}/query`,
//         params: {title:title},
//         method: 'get'
//     })
// }

// articleApi.listByComponentsId = (id) => {
//     return service({
//         url: `${baseUrl}/listByComponentsId/${id}`,
//         method: 'get'
//     })
// }

// articleApi.updateOrderBy = (articleId,order) => {
//     return service({
//         url: `${baseUrl}/updateOrderBy/${articleId}`,
//         params: {order:order},
//         method: 'get'
//     })
// }

// articleApi.pageByTagId = (tagId,params) => {
//     return service({
//         url: `${baseUrl}/pageByTagId/${tagId}`,
//         params: params,
//         method: 'get'
//     })
// }


// articleApi.pageDtoBy = (articleId,params) => {
//     return service({
//         url: `${baseUrl}/pageDtoBy/${articleId}`,
//         params:params,
//         method: 'get'
//     })
// }

// articleApi.findById = articleId => {
//     return service({
//         url: `${baseUrl}/find/${articleId}`,
//         method: 'get'
//     })
// }
// articleApi.openOrCloseComment = articleId => {
//     return service({
//         url: `${baseUrl}/openOrCloseComment/${articleId}`,
//         method: 'get'
//     })
// }
// articleApi.haveHtml = articleId => {
//     return service({
//         url: `${baseUrl}/haveHtml/${articleId}`,
//         method: 'get'
//     })
// }

// articleApi.sendOrCancelTop = articleId => {
//     return service({
//         url: `${baseUrl}/sendOrCancelTop/${articleId}`,
//         method: 'get'
//     })
// }

// articleApi.create = (params) => {
//     return service({
//         url: baseUrl,
//         data: params,
//         method: 'post'
//     })
// }
// articleApi.saveArticle = (params) => {
//     return service({
//         url: `${baseUrl}/save`,
//         data: params,
//         method: 'post'
//     })
// }
// articleApi.updateArticle = (id,params) => {
//     return service({
//         url: `${baseUrl}/save/${id}`,
//         data: params,
//         method: 'post'
//     })
// }


// articleApi.update = (id,params) => {
//     return service({
//         url: `${baseUrl}/update/${id}`,
//         data: params,
//         method: 'post'
//     })
// }

// articleApi.generateHtml=(id) => {
//     return service({
//         url: `${baseUrl}/generateHtml/${id}`,
//         method: 'get'
//     })
// }


export default ToolsApi