/* eslint-disable */
<template>
    <div>
        <div class="navigation-bar">
            <div class="logo">
                <img src="../../public/logo.png">
                AI智能
            </div>
            <div class="home">
                <input @keyup.enter="Search" v-model="userInput" :placeholder="currentWord">
                <router-link to="/index" class="router-link-active">
                    <div>AI体验</div>
                </router-link>
                <router-link to="/data" class="router-link-active">
                    <div>文档中心</div>
                </router-link>
                <router-link to="/cooperation" class="router-link-active">
                    <div>合作咨询</div>
                </router-link>
                <router-link to="/uploadmodal" class="router-link-active">
                    <div>文章写作<img src="../../public/static/image/xiezuo.png" style="width: 20px;height: 30px;"></div>
                </router-link>
                <button class="avacit" @mouseenter="isHoverinf = true" @mouseleave="isHoverinf = false"
                    v-if="message != '登录'">
                    <img src="../../public/static/image/avacit.jpg">
                </button>
                <button @click="checkStart" class="but" v-if="message == '登录'">登录</button>
            </div>
        </div>
        <ul class="messageList">
            <li>
                <div>{{ message }}</div>
            </li>
            <li><button>账号信息<img :src="imgUrl"></button></li>
            <li><button>账单信息</button></li>
            <li><button @click="outLogin">退出</button></li>
        </ul>
        <div style="display: flex;overflow-y: auto;height: 710px;justify-content: center;">
            <div>
                <div class="tag-box" style="justify-content: center;">最新资讯</div>
                <div style="height: 400px;margin-top: 20px;display: flex;">
                    <Carousel :items="carouselItems" style="margin-left: 20px;"/> 
                    <div style="width: 40%;margin-left: 20px;color: #5F606F;font-size: 15px;">
                        <div style="display: flex;cursor: pointer;">
                            <img src="../../public/static/image/avacit.jpg" style="height: 180px;">
                            <div style="margin-left: 20px;text-align: left;" class="view-text-box">同时随着社会经济的发展和人们对教育的重视程度不断提高，考试作为教育的重要环节，其类型和要求也在不断增加。传统的考试方式已经无法满足现代考试的需求，需要一种更加高效、便捷、客观、公正的考试方式。</div>
                        </div>
                        <div style="display: flex;margin-top: 40px;cursor: pointer;">
                            <img src="../../public/static/image/avacit.jpg" style="height: 180px;">
                            <div style="margin-left: 20px;text-align: left;" class="view-text-box">同时随着社会经济的发展和人们对教育的重视程度不断提高，考试作为教育的重要环节，其类型和要求也在不断增加。传统的考试方式已经无法满足现代考试的需求，需要一种更加高效、便捷、客观、公正的考试方式。</div>
                        </div>
                    </div>
                    <Carousel :items="carouselItems" style="margin-left: 20px;"/> 
                </div>
                <div class="tag-box" style="justify-content: space-between;margin-top: 20px;">
                    <button class="tab-view" @click="OldArticleShow" :disabled="isStartChaeck">返回</button>
                    <div style="font-size: large;display: flex;">文章推荐&nbsp;&nbsp;<img src="../../public/static/image/tuijian.png" 
                        style="width: 27px;align-items: center;"></div>
                    <button class="tab-view" @click="ArticleShows" :disabled="isDisabled">查看更多>>></button>
                </div>
                <div style="height: 400px;">
                    <div style="display: flex;flex-wrap: wrap;gap: 16px;margin-top: 20px;justify-content: center;">
                        <BoxShow v-for="(Article, index) in ArticleList" :key="index" :filetext="Article.filetext"
                            :imageurl="Article.imageurl" 
                            :likecount="String(Article.likecount)" 
                            :viewcount="String(Article.viewcount)"
                            :articletime="new Date(Article.articletime).toLocaleString().split(' ')[0]"
                            @click="ArticleView(index,Article.id)" 
                            />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../js/NavigationBar.js" />

<style scoped src="../css/NavigationBar.css" />