import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

import ChatList from './components/ChatList.vue';
import Cooperation from './components/Cooperation.vue';
import Data from './components/Data.vue';
import Login from './components/Login.vue';
import NavigationBar from './components/NavigationBar.vue';
import UploadModal from './components/UploadModal.vue';
import fileView from './components/fileView.vue';

const routes = [  
    { path: '/index', component: ChatList},  
    { path: '/login', component: Login},
    { path:'/' ,component: NavigationBar},
    { path:'/data' ,component: Data},
    { path:'/cooperation' ,component: Cooperation},
    { path:'/uploadmodal' ,component: UploadModal},
    { path:'/fileview' ,component: fileView},
  ];  
  
  // 创建路由实例  
  const router = createRouter({  
    history: createWebHistory(),  
    routes  
  });

const app = createApp(App);  
app.use(router); 
app.mount('#app')
