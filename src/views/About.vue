<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a href="http://localhost:8080/websocket/login?username=12345">login</a>
    <a v-on:click="websocketsend">ssssss w</a>
  </div>
</template>
<script>
  export default {
    name : 'test',
    data() {
      return {
        websock: null,
      }
    },
    created() {
      this.initWebSocket();
      // fetch("http://localhost:8080/websocket/login?username=12345").then(x=>{console.log(x)})
    },
    destroyed() {
      // this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
      // console.log("init")
        const wsuri = "ws://127.0.0.1:8080/websocket/socketServer.do";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
      // console.log("websocketonopen")
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
      // console.log("error-----------")
        // this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        // const redata = JSON.parse(e.data);
        // console.log(e)
      },
      websocketsend(Data){//数据发送
      // console.log(Data)
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        // console.log('断开连接',e);
      },
    },
  }
</script>