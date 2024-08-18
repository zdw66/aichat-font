<template>
    <div style="background-image:url('static/image/beijing.png');display: flex;justify-content: space-between;">
        <div class="UserInfo" style="margin-left: 40px;overflow-y: auto;">
            没有
        </div>
        <div>
            <div style="margin-top: 30px;margin-bottom: 30px;width: 700px;height: 710px;word-wrap: break-word;/* 自动换行 */overflow-y: auto;background-color: #fff;"
                v-html="compiledMarkdown" ref="markdownBody"></div>
        </div>
        <div class="UserInfo">
            <div
                style="display: flex;align-items: center;margin-top: 20px;width: 300px;height: 80px;justify-content: center;">
                <img src="../../public/static/image/avacit.jpg" style="width: 70px; height: 70px;border-radius: 50%;">
                <div style="margin-left: 20px;">
                    用户名：{{ UserId }}
                    <div style="display: flex;font-size: 13px;color: #5F606F;">粉丝:0&nbsp;&nbsp;&nbsp;&nbsp;关注:0&nbsp;&nbsp;&nbsp;&nbsp;等级:L1</div>
                </div>
            </div>
            <hr>
            <div style="display: flex;font-size: 13px;color: #5F606F;justify-content: center;">
                积分:0&nbsp;&nbsp;&nbsp;&nbsp;获赞:0&nbsp;&nbsp;&nbsp;&nbsp;收藏:0
            </div>
            <hr>
            <div style="color: #FC5531;">
                荣誉墙
            </div>
            <div style="display: flex;justify-content: center;margin-top: 40px;">
                <button class="but">私信</button>
                <button class="but">关注</button>
            </div>
        </div>
    </div>
</template>

<script>
import CherryEngine from 'cherry-markdown/dist/cherry-markdown.engine.core';
import 'prismjs';
export default {
    data() {
        return {
            compiledMarkdown: '',
            fileUrl: '',
            fileContent: '',
            UserId: ''
        };
    },
    created() {
        this.fileContent = localStorage.getItem('fileContent');
        this.UserId = localStorage.getItem('userid');
        const cherryEngineInstance = new CherryEngine();
        this.compiledMarkdown = cherryEngineInstance.makeHtml(this.fileContent);
        this.compiledMarkdown = this.compiledMarkdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g,
            `<div class="copy">
            <button class="copy-button" v-on:click="copyCode">复制</button>
            <div class="formatted-code">  
              <code>$1</code>
            </div>
          </div>`);
    },
    methods: {
        async copyCode(event) {
            // 查找按钮所在的代码块
            const codeElement = event.target.nextElementSibling;
            const codeText = codeElement.textContent || codeElement.innerText;
            try {
                if (navigator.clipboard) {
                    // 使用 Clipboard API 进行复制
                    await navigator.clipboard.writeText(codeText);
                    event.target.textContent = '已复制';
                    setTimeout(() => {
                        event.target.textContent = '复制';  // 延时 3 秒后更新按钮文字
                    }, 3000);
                } else {
                    // 旧版浏览器的备用方案
                    const range = document.createRange();
                    range.selectNode(codeElement);
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);

                    document.execCommand('copy');
                    event.target.textContent = '已复制';
                    setTimeout(() => {
                        event.target.textContent = '复制';  // 延时 3 秒后更新按钮文字
                    }, 3000);
                }
            } catch (err) {
                alert('复制失败');
                console.error(err);
            } finally {
                window.getSelection().removeAllRanges(); // 清除选区
            }
        }
    },
    mounted() {
    this.$refs.markdownBody.addEventListener('click', (event) => {
      if (event.target && event.target.matches('.copy-button')) {
        this.copyCode(event);
      }
    });
  }
}
</script>

<style src="../css/UploadModal.css" />
<style>
.UserInfo {
    float: right;
    margin-top: 30px;
    /* margin-left: 180px; */
    margin-right: 40px;
    margin-bottom: 30px;
    width: 400px;
    background-color: #fff;
}
.copy{
  background-color: #FAFAFA;  
  padding: 0 10px;  
  border-radius: 5px;  
  font-family: monospace;  
  white-space: pre; 
}
.but{
    border: none;
    margin-left: 30px;
    margin-right: 30px;
    width: 80px;
    height: 45px;
    border: 1px solid #E7E7ED;
    border-radius: 30px;
    background-color: #fff;
}
.but:hover{
    border: 1px solid #000;
}
</style>