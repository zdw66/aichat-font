import BoxShow from '@/components/BoxShow.vue';
import axios from 'axios';
import { setTimeout } from 'core-js';
import { useRouter } from 'vue-router';
import Carousel from '../components/Carousel.vue';
export default {
    name: 'NavigationBar',
    components: {
        BoxShow,
        Carousel
    },
    setup() {
        const router = useRouter(); // 获取 router 实例
        return {
            router
        };
    },
    data() {
        return {
            message: '登录',
            words: ['如何使用AI', '如何实名认证', '如何获取资料', '自己猜猜'], // 你想要轮播的字  
            currentIndex: 0, // 当前显示的字的索引  
            currentWord: '', // 当前显示的字  
            userInput: '',
            isHoverinf: false,
            oldisHoverinf: false,
            imgUrl: 'static/image/shimin.png',
            ArticleList: [],
            start: 0,
            isDisabled:false,
            isStartChaeck:false,
            carouselItems: [  
                { image: 'static/image/avacit.jpg', alt: 'Image 1' },  
                { image: 'static/image/avacit.jpg', alt: 'Image 2' },  
                { image: 'static/image/avacit.jpg', alt: 'Image 3' }  
              ]
        }
    },
    created() {
        const Id = localStorage.getItem('UserId');
        if (Id !== null && Id.length >= 6) {
            const first = Id.slice(0, 3);
            const end = Id.slice(-3);
            this.message = first + "*****" + end;
        } else {
            this.message = '登录';
        }
        if(this.ArticleList.length==0)this.ArticleShow();
        
    },
    methods: {
         async ArticleView(index,id){
            console.log(this.ArticleList[index]);
            const Id = this.ArticleList[index].userid;
            const first = Id.slice(0, 3);
            const end = Id.slice(-3);
            const message = first + "*****" + end;
            const data = this.ArticleList[index].filecontent;
            localStorage.setItem('fileContent',data);
            localStorage.setItem('userid',message);
            
            const url = '/ArticleView';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                'UserId': localStorage.getItem('UserId'),
                'Id':id
            };
            console.log(body);
            
            try {
                const data = await axios.post(url, body, config);
                const success = data.data.success;
                if(!success){
                    alert(data.data.data);
                    return;
                }
                this.router.replace('/fileview');
                return true;
            } catch (error) {
                alert('网络繁忙，请稍后再试！');
            }
        },
        async OldArticleShow(){
            this.start-=5;
            const url = '/queryList';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                'start': this.start
            };
            try {
                const data = await axios.post(url, body, config);
                
                this.ArticleList = data.data.data;
                if(this.ArticleList.length<5)this.isDisabled=true;
                else this.isDisabled=false;
                if(this.start==0)this.isStartChaeck=true;
                else this.isStartChaeck=false;
                return true;
            } catch (error) {
                alert('网络繁忙，请稍后再试！');
            }
        },
        async ArticleShows(){
            this.start+=5;
            const url = '/queryList';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                'start': this.start
            };
            try {
                const data = await axios.post(url, body, config);
                
                this.ArticleList = data.data.data;
                if(this.ArticleList.length<5)this.isDisabled=true;
                else this.isDisabled=false;
                if(this.start==0)this.isStartChaeck=true;
                else this.isStartChaeck=false;
                return true;
            } catch (error) {
                alert('网络繁忙，请稍后再试！');
            }
        },
        async ArticleShow() {
            const url = '/queryList';
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body = {
                'start': this.start
            };
            try {
                const data = await axios.post(url, body, config);
                
                this.ArticleList = data.data.data;
                if(this.ArticleList.length<5)this.isDisabled=true;
                else this.isDisabled=false;
                if(this.start==0)this.isStartChaeck=true;
                else this.isStartChaeck=false;
                return true;
            } catch (error) {
                alert('网络繁忙，请稍后再试！');
            }
        },
        startCarousel() {
            this.currentWord = this.words[this.currentIndex]; // 初始化  
            this.carouselInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.words.length; // 更新索引  
                this.currentWord = this.words[this.currentIndex]; // 更新显示的字  
            }, 4000); // 2秒切换  
        },
        stopCarousel() {
            clearInterval(this.carouselInterval); // 清除定时器  
        },
        checkStart() {
            if (this.message == '登录') {
                this.router.replace('/login');
            }
        },
        Search() {
            this.userInput = '';
        },
        outLogin() {
            localStorage.setItem('UserId', '登录');
            this.message = localStorage.getItem('UserId');
        },
        openUploadModal() {
            this.showModal = true;
        }
    },
    watch: {
        isHoverinf: {
            handler(isHoverinf) {
                if (this.message != '登录') {
                    if (isHoverinf) {
                        document.querySelectorAll('.messageList').forEach(button => {
                            button.style.display = 'grid'; // 可选：修改背景颜色为浅珊瑚色 
                            this.oldisHoverinf = true;
                        });
                    } else {
                        if (this.oldisHoverinf) {
                            setTimeout(() => {
                                document.querySelectorAll('.messageList').forEach(button => {
                                    button.style.display = 'none'; // 可选：修改背景颜色为浅珊瑚色 
                                });
                            }, 3000);
                        }
                        this.oldisHoverinf = false;
                    }
                }
            }
        },
    },
    mounted() {
        this.startCarousel();
    },
    beforeUnmount() {
        this.stopCarousel();
    },
}