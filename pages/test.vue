<script setup lang="ts">
import { io, Socket } from "socket.io-client";
let socket: Socket;
const recieverId = ref("");
const messageText = ref("");
const messages = ref<Blob[]>([]);
onMounted(() => {
  socket = io("ws://localhost:3100", {});
  socket.on("connect", () => console.log(socket.id));
  socket.on("message", (data: Blob) => {
    messages.value.push(data);
    messages.value = messages.value;
  });
});
function sendRecieverId() {
  socket.emit("connect_to_reciever", recieverId.value, (response: any) => {
    console.log(response.status);
  });
}
function sendMessage(message: Blob) {
  socket.emit("send_message", message);
}

function sliceFile() {
  var file = (document.getElementById("chunk-upload") as HTMLInputElement)
    .files;
  if (file === null) {
    return;
  }
  var chunkSize = 1024 * 1024;
  var fileSize = file[0].size;
  var chunks = Math.ceil(file[0].size / chunkSize);
  var chunk = 0;

  console.log("file size..", fileSize);
  console.log("chunks...", chunks);

  while (chunk <= chunks) {
    var offset = chunk * chunkSize;
    console.log("current chunk..", chunk);
    console.log("offset...", chunk * chunkSize);
    console.log("file blob from offset...", offset);
    const sliced = file[0].slice(offset, offset + chunkSize);
    console.log(sliced);
    sendMessage(sliced);
    chunk++;
  }
}
</script>
<template>
  <button>Get Clients</button>
  <input type="text" v-model="recieverId" />
  <button @click="sendRecieverId">Connect to Reciever</button>
  <input type="message" v-model="messageText" />
  <button>Send Message</button>
  <div>
    Messages <br />
    {{ messages }}
  </div>
  <input type="file" name="chunk-upload" id="chunk-upload" />
  <button @click="sliceFile">Split File</button>
</template>
