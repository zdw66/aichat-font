<template>
    <div style="background-color: #F5F6F7; height: 700px; overflow-y: auto;overflow-x: auto;">
        <div class="file-box">
            <div>
                <div style="margin-top: 30px;margin-bottom: 30px;width: 800px;height: 900px;word-wrap: break-word;/* 自动换行 */overflow-y: auto;background-color: #fff;" v-html="compiledMarkdown" ref="markdownBody"></div>
            </div>
        </div>
        <div style="display: flex;justify-content: center; padding: 30px 0;">
            <div style="background-color: #fff;width: 800px;height: 400px;">
                <div>
                    <div style="display: flex; justify-content: left;margin-top: 30px;margin-left: 60px;">
                        <div style="font-size: 14px; color: #606266;">添加封面</div>
                        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @click="checkFile"
                            style="cursor: pointer; margin-left: 10px;" />
                    </div>
                    <input type="file" ref="imageInput" accept="image/*" @change="handleFileUpload"
                        style="display: none;" />
                </div>
                <div>
                    <div style="display: flex; justify-content: left;margin-top: 30px;margin-left: 60px;">
                        <div style="font-size: 14px; color: #606266;">添加简介</div>
                        <textarea type="text" v-model="filetext" placeholder="请输入文章标题，可以使读者快速了解内容(字数不超过20字)" />
                    </div>

                </div>
                <div>
                    <div style="display: flex; justify-content: left;margin-top: 30px;margin-left: 60px;">
                        <div style="font-size: 14px; color: #606266;">文章类型</div>
                        <div v-for="option in options" :key="option" class="radio-container">
                            <input type="radio" :id="option" :value="option" v-model="selectedOption"
                                @click="toggleSelection(option)"
                                class="radio-input"   />
                            
                            <label :for="option">{{ option }}</label>
                            <img src="../../public/static/image/anquan.png" v-if="option==='原创'" style="width: 18px;height: 18px;">
                        </div>
                    </div>
                    <input v-if="selectedOption==='转载'||selectedOption==='翻译'" 
                    style="width: 550px;height: 30px;outline: none;"
                    placeholder="请填写原文链接"
                    v-model="fileUrl"/>
                    <div style="color: #FC5531; font-size: 14px; margin-left: -150px;" v-if="selectedOption==='转载'">注意：转载请确认原文允许转载，或者您已经获得原文作者授权。</div>
                    <div style="color: #FC5531; font-size: 14px; margin-left: -125px;" v-if="selectedOption==='翻译'">注意：翻译请确认原文允许翻译，或者您已经获得原文作者授权翻译。</div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:flex;margin-left: 70%;margin-top: 10px;">
        <div style="padding: 0 10px;"><button @click="intputfile" class="file">文件导入</button></div>
        <input type="file" ref="fileInput" accept=".md" @change="handleFileChange" style="display: none;" />
        <button class="submit" @click="Mysubmit">发布文章</button>
    </div>
</template>

<script src="../js/UploadModal.js"/>
<style src="../css/UploadModal.css"/>