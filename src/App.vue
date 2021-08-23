<template>
  <div>
    
    <router-view/>
  </div>
</template>

<script>
// import Golbal from '@/api/global_variable.js'
export default {

  mounted(){
      // const wsuri = `ws:/${Golbal.baseUrl}:${Golbal.port}/websocket/socketServer.do`;
      // let websock = new WebSocket(wsuri);
      // // websock.onmessage = this.websocketonmessage;
      // // websock.onopen = this.websocketonopen;
      // // websock.onerror = this.websocketonerror;
      // // websock.onclose = this.websocketclose;
      // // return websock;
      // console.log(websock)
  }
}
</script>

<style>

</style>