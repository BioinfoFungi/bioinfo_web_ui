import url_port from '../../config.js'
// const baseUrl = "8.140.164.151"
// const baseUrl = "bioinfo.online"
// const baseUrl = "localhost"
// const port = 8080
let local_url_port = localStorage.getItem("url_port");
if(local_url_port!=null){
    local_url_port = JSON.parse(local_url_port)
    url_port.baseUrl=local_url_port.url
    url_port.port=local_url_port.port
    url_port.protocol = local_url_port.protocol
    // console.log(local_url_port)
}

const baseUrl = url_port.baseUrl
const port = url_port.port
const protocol = url_port.protocol
// const port = 9090
export default{
    baseUrl,
    port,
    protocol
}