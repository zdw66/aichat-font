<template>
  <div class="chat-bubble-container" :class="{ 'from-me': fromMe }">  
    <img v-if="fromMe" src='static/image/avacit.jpg' alt="Avatar" class="avatar"/>  
    <img v-if="!fromMe" src='static/image/ai.jpg' alt="Avatar" class="avatar"/> 
    <div class="chat-bubble">  
      <div v-html="compiledMarkdown" style="display: none;" ref="hiddenContent"></div>
      <div class="markdown-body" v-html="compiledMarkdown" ref="markdownBody"></div>  
    </div> 
  </div>  
</template>

<script>   
import CherryEngine from 'cherry-markdown/dist/cherry-markdown.engine.core';
import 'prismjs';
export default {  
  data() {  
    return {  
      compiledMarkdown: '', // 用于存放转换后的 Markdown 内容
    };  
  },
  props: {  
    message: {  
      type: String,  
      required: true,  
    },  
    fromMe: {  
      type: Boolean,  
      default: false,  
    },  
  },
  watch: {  
    message: {  
      immediate: true, // 立即触发一次以处理初始值  
      handler(newMessage) {  
        if(this.fromMe==false){
          // 对 message 进行转义，设置转换后的 Markdown 内容  
          const cherryEngineInstance = new CherryEngine();
          this.compiledMarkdown = cherryEngineInstance.makeHtml(newMessage);
          this.$nextTick(() => {
            
            const hiddenContent = this.$refs.hiddenContent;
            // Find all <pre> tags inside the hidden div
            const preTags = hiddenContent.querySelectorAll('div.formatted-code');
            // 更新 preCount 数据属性
            this.count = preTags.length;
          });
        
        
          this.compiledMarkdown = this.compiledMarkdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g, 
          `<div class="copy">
            <button class="copy-button" v-on:click="copyCode">复制</button>
            <div class="formatted-code">  
              <code>$1</code>
            </div>
          </div>`); 
        }else{
          this.compiledMarkdown=newMessage;
        }
      }
    }
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
          event.target.textContent='已复制';
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
          event.target.textContent='已复制';
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
};  
</script>  
  
<style> 
/* 自定义样式示例 */
.token.keyword {
  color: #0033B3; /* 关键字颜色 */
}
.token.comment {
  color: #067C16; /* 注释颜色 */
}
.token.string {
  color: #067C16; /* 绿色 */
}
/* 函数名 */
.token.function {
  color: #5A7F84; /* 橙色 */
}
/* 变量名 */
.token.variable {
  color: #000; /* 紫色 */
}
/* 数字 */
.token.number {
  color: #2370E4; /* 黄色 */
}
/* HTML 标签 */
.token.tag {
  color: #800000; /* 标签颜色 */
}
/* 属性名 */
.token.attr-name {
  color: #E50000; /* 属性名颜色 */
}
/* 属性值 */
.token.attr-value {
  color: #0000FF; /* 属性值颜色 */
}
/* CSS 类名 */
.token.selector {
  color: #880000; /* CSS 选择器颜色 */
}
code {
  font-family: 'Consolas', 'Courier New','Roboto Mono', Courier, monospace;
} 
.formatted-code {  
  display: flex;
  justify-content: space-between; /* 在水平线上均匀分布 */  
  align-items: flex-start; /* 与第一行代码对齐   */
  overflow-x: auto;  
  margin-top: -32px;
  margin-bottom: -16px;
}  
.copy{
  background-color: #fff;  
  padding: 0 10px;  
  border-radius: 5px;  
  font-family: monospace;  
  white-space: pre; 
}
.copy-button {  
  display: flex;
  margin-left: auto; /* 将按钮推到最右边 */
  background-color: #fff; /* 按钮颜色 */  
  color: #919090; /* 字体颜色 */  
  border: none; /* 无边框 */  
  padding: 0px 0px; /* 内边距 */  
  cursor: pointer; /* 鼠标指针样式 */ 
  margin-top: -28px; 
}  
.copy-button:hover {  
  color: #000;
}    
.chat-bubble-container {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: flex-start; /* 垂直对齐 */
  margin: 5px 0; /* 每条消息之间的间距 */
  flex-direction: row; /* 默认方向：头像在左，气泡在右 */
  text-align: left; 
}
.code-block {  
  background-color: #fff;
  padding: 0 10px;  
  border-radius: 8px;  
  overflow-x: auto;
} 
.chat-bubble {
  max-width: 80%;
  padding: 15px 15px;
  border-radius: 15px;
  word-wrap: break-word;
}
.markdown-body {
  word-wrap: break-word; /* 自动换行 */
}

.from-me {
  flex-direction: row-reverse; /* 发送者消息为右侧：头像在右，气泡在左 */
}

.chat-bubble {
  background-color: #F6F8FA; /* 默认气泡背景色 */
}

.from-me .chat-bubble {
  background-color: #cce5ff; /* 发送者气泡背景色 */
}

.avatar {
  width: 40px; /* 定义头像宽度 */
  height: 40px; /* 定义头像高度 */
  border-radius: 50%; /* 使头像成为圆形 */
  margin: 0 3px; /* 给头像添加外边距 */
} 
</style>