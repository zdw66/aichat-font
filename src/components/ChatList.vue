<template>
  <div class="container" ref="container">
    <div class="chat-list">
      <ChatBubble v-for="(msg, index) in messages" :key="index" :message="msg.text"
        :fromMe="msg.sender_type == 'USER'" />
    </div>
  </div>
  <div class="input-container">
    <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button :disabled="isDisabled" @click="sendMessage" class="ChatListButton">
      <img :src="imgUrl" :class="{ 'rotate': isRotating }" />
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import ChatBubble from './ChatBubble.vue';

export default {
  name: 'ChatList',
  components: {
    ChatBubble,
  },
  setup() {
    const router = useRouter(); // 获取 router 实例
    return {
      router
    };
  },
  data() {
    return {
      isMobile: false,
      isRotating: false,
      imgUrl: 'static/image/send.png',
      displayedText: "",
      index: 0,
      typingInterval: null,
      newmessage: '',
      butText: 'Send',
      isDisabled: false,
      userInput: '',
      oldInput: '',
      messages: [],
      error: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
    });
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // 检测手机设备的常见 User-Agent
    this.isMobile = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    if (this.isMobile == false) {
      document.querySelectorAll('.container').forEach(s => {
        s.style.maxWidth = '700px';
        s.style.height = '630px';
      });
      document.querySelectorAll('.input-container').forEach(s => {
        s.style.maxWidth = '730px';
      });
    } else {
      document.querySelectorAll('.container').forEach(s => {
        s.style.height = '490px';
      });
      document.querySelectorAll('.container').forEach(s => {
        s.style.maxWidth = '340px';
      });
    }
  },
  methods: {
    async sendMessage() {
      if (this.imgUrl == 'static/image/stop.png') {
        this.displayedText = "";
        this.index = 0;
        clearInterval(this.typingInterval);
        this.imgUrl = 'static/image/send.png';
        document.querySelectorAll('.ChatListButton').forEach(button => {
          button.style.backgroundColor = '#007bff'; // 可选：修改背景颜色为浅珊瑚色 
        });
        return;
      }
      if (!this.userInput.trim()) return;
      this.isDisabled = true;
      this.imgUrl = 'static/image/await.png';
      this.isRotating = true;
      document.querySelectorAll('.ChatListButton').forEach(button => {
        button.style.backgroundColor = '#add8e6'; // 可选：修改背景颜色为浅珊瑚色 
        button.style.color = '#666';
      });
      this.addMessage('USER', this.userInput);
      this.$nextTick(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      });
      this.oldInput = this.userInput;
      this.userInput = '';
      const response = await this.callChatAPI(this.oldInput);
      if (this.error) {
        this.imgUrl = 'static/image/send.png';
        this.isRotating = false;
        document.querySelectorAll('.ChatListButton').forEach(button => {
          button.style.backgroundColor = '#007bff'; // 可选：修改背景颜色为浅珊瑚色  
        });
        return;
      }

      const reply = response.data.data;
      const check = response.data.success;
      if (!check) {
        this.router.replace('/login');
        alert('请先登录！');
        return;
      }
      this.displayedText = "";
      this.index = 0;
      this.addMessage('BOT', '');
      this.isDisabled = false;
      this.imgUrl = 'static/image/stop.png';
      this.isRotating = false;
      document.querySelectorAll('.ChatListButton').forEach(button => {
        button.style.backgroundColor = 'red'; // 可选：修改背景颜色为浅珊瑚色  
      });
      // 清除之前的间隔  
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
      }
      this.typingInterval = setInterval(() => {
        if (this.index < reply.length) {
          this.displayedText += reply[this.index];
          this.index++;
          this.messages[this.messages.length - 1].text = this.displayedText;
          this.$nextTick(() => {
            this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
          });
        } else {
          clearInterval(this.typingInterval);
          this.imgUrl = 'static/image/send.png';
          this.isRotating = false;
          document.querySelectorAll('.ChatListButton').forEach(button => {
            button.style.backgroundColor = '#007bff'; // 可选：修改背景颜色为浅珊瑚色  
          });
        }
      }, 10); // 调整这个值来设置打印速度，单位是毫秒
      this.$nextTick(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      });
    },
    addMessage(sender, text) {
      this.messages.push({ sender_type: sender, sender_name: sender == 'USER' ? '小明' : '智能聊天助手', text: text });
    },
    async callChatAPI(message) {
      const url = '/validate';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const Id = localStorage.getItem('UserId');
      const body = {
        'message': message,
        'UserId': Id
      };
      try {
        const data = await axios.post(url, body, config);
        this.error = false;
        return data;
      } catch (error) {
        alert('网络繁忙，请稍后再试！');
        this.error = true;
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 30px;
  /* 调整图片宽度 */
  height: 30px;
  /* 调整图片高度 */
}

.rotate {
  animation: rotation 3.5s infinite linear;
  /* 旋转动画 */
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 700px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 630px;
  overflow-y: auto;
}

.chat-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  max-width: 730px;
  margin: 0 auto;
  margin-top: 10px;
}

input {
  flex-grow: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
}

.ChatListButton {
  margin-left: 10px;
  padding: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.ChatListButton:disabled {
  background-color: #add8e6;
  color: #666;
  cursor: not-allowed;
}
</style>