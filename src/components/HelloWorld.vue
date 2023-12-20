<template>
  <div>
    <h2>Simple Chat</h2>
    <button @click="showMoreClicked" v-show="isShowMoreShowed">Show more</button>
    <ul>
      <li :key="chat.message" v-for="chat in showMessage">
        {{ chat.user }} : {{ chat.message }}
      </li>
    </ul>
    <input v-model="message" />
    <button id="sendBtn" @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "",
      user: "",
      chats: [],
      more: 1
    };
  },
  methods: {
    sendMessage() {
      const newMessage = {
        message: this.message,
        user: this.user
      }
      this.chats.push(newMessage)
      localStorage.chats = JSON.stringify(this.chats)
      this.message = "";
    },
    onStorageUpdate(event) {
      if (event.key === "chats") {
        this.chats = JSON.parse(event.newValue)
      }
    },
    showMoreClicked() {
      this.more++
    }
  },
  computed: {
    showMessage() {
      return this.chats.slice(-5*this.more)
    },
    isShowMoreShowed() {
      return this.more * 5 < this.chats.length
    }
  },
  mounted() {
    if (!this.user) this.user = prompt("Input your name: ");
    if (localStorage.chats) this.chats = JSON.parse(localStorage.chats)
    window.addEventListener("storage", this.onStorageUpdate);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
