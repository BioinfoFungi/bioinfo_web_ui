import service from '@/utils/service'
const baseUrl = '/api/data_import'

const DataImportApi = {}


DataImportApi.init = (pathDir) =>{
    return service({
        url: `${baseUrl}/init`,
        params:pathDir,
        method: 'get'
    })
}


export default DataImportApi