<template>  
    <div class="login-container">  
      <h2>扫码登录</h2>  
      <div class="qrcode">  
        <!-- 这里可以放置实际的二维码图像 -->  
        <img :src="qrcodeSrc" alt="二维码" />  
        <p>请使用微信扫描二维码，回复验证码后回填下方输入框中</p>  
      </div>  
      <div class="verification-code">  
        <input  
          type="text"  
          v-model="verificationCode"  
          placeholder="请输入验证码"  
          @keyup.enter="handleLogin"  
        />
      <button @click="handleLogin">登录</button>
      </div>  
    </div>  
  </template>  
  
  <script>  
  let timeout = null;  
  import axios from 'axios';
import { useRouter } from 'vue-router';
    export default {  
    name: 'LogIn',  
    data() {  
      return {  
        verificationCode: '', // 存储验证码  
        qrcodeSrc: 'static/image/qrcode.jpg', // 替换为你的二维码图片地址 
        isLohin:false
      };  
    },  
    methods: {  
      handleLogin() {  
        // 防抖逻辑  
        clearTimeout(timeout);  
          timeout = setTimeout(async () => {  
            // 执行你的逻辑，比如提交数据或请求 API
            if (this.verificationCode) { 
              const url = "/login";
              const body ={
                'numKey':this.verificationCode
              };
              const config = {  
                headers: {  
                  'Content-Type': 'multipart/form-data'  
                }  
              };
              try{
                const response = await axios.post(url, body,config);
                this.isLohin =  response.data.success;
                this.UserId = response.data.data; 
                localStorage.setItem('UserId',this.UserId);
                  if(this.isLohin){
                    this.router.replace('/');
                  }else{
                    this.router.replace('/login');
                    alert(this.UserId);
                  } 
              }catch(error){
                console.log(error);
                alert('网络繁忙，请稍后再试！');
                this.router.replace('/login');
              }
            } else {  
              alert('请输入验证码！');  
              this.router.replace('/login');
            }  
          }, 300); // 延迟300毫秒 
      },  
    },  
    setup() {
      const router = useRouter(); // 获取 router 实例
      return {
        router
      };
    },
  };  
  </script>  
  
  <style scoped>  
  .login-container {  
    max-width: 300px;  
    margin: 0 auto;  
    text-align: center;  
  }  
  
  .qrcode img {  
    width: 100%;  
    height: auto;  
  }  
  
  .verification-code input {  
    margin-top: 20px;  
    padding: 10px;  
    width: 80%;  
  }  
  
  .verification-code button {  
    padding: 10px 15px;  
    margin-top: 10px;  
  }  
  </style>