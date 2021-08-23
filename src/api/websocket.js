import Golbal from '@/api/global_variable.js'
const websocket = {}


websocket.initWebSocket = ()=>{ //初始化weosocket
    // console.log("init")
      const wsuri = `ws:/${Golbal.baseUrl}:${Golbal.port}/websocket/socketServer.do`;
      let websock = new WebSocket(wsuri);
      websock.onmessage = this.websocketonmessage;
      websock.onopen = this.websocketonopen;
      websock.onerror = this.websocketonerror;
      websock.onclose = this.websocketclose;
      return websock;
}

export default websocket
