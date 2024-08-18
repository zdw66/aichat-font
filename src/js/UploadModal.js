import axios from 'axios';
import CherryEngine from 'cherry-markdown/dist/cherry-markdown.engine.core';
import 'prismjs';
import { ref } from 'vue';
export default {
    setup() {
        const selectedOption = ref(''); // 用于存储选中的选项  
        const options = ['原创', '转载', '翻译']; // 可供选择的选项  
        const toggleSelection = (option) => {
            if (selectedOption.value === option) {
                // 如果当前的选项已经被选中，则取消选择  
                selectedOption.value = '';
            } else {
                // 选择当前选项  
                selectedOption.value = option;
            }
        };

        return {
            selectedOption,
            options,
            toggleSelection,
        };
    },
    data() {
        return {
            fileContent: '',
            imageUrl: require('@/components/avacit.jpg'),
            canvasWidth: 132, // 目标宽度  
            canvasHeight: 99, // 目标高度  
            compiledMarkdown: '',
            fileUrl: '',
            filetext: '',
        };
    },
    created() {
        this.drawImageToCanvas();
        const cherryEngineInstance = new CherryEngine();
        this.compiledMarkdown = cherryEngineInstance.makeHtml('#请上传MD文件');
    },
    methods: {
        async Mysubmit() {     
            if (this.fileContent !== '' && this.imageUrl !== '' && this.selectedOption !== '' && this.filetext !== '') {
                if (this.selectedOption === '转载' || this.selectedOption === '翻译') {
                    if (this.fileUrl === '') {
                        alert('请补充文章信息！');
                        return;
                    }
                }
                const url = "/submit";
                const body = {
                    'UserId':localStorage.getItem('UserId'),
                    'fileContent': this.fileContent,//文章内容
                    'imageUrl':this.imageUrl,//封面信息
                    'fileUrl':this.fileUrl,//文章转载链接
                    'filetext':this.filetext,//文章简介
                    'filetype':this.selectedOption//文章类型
                };
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                try {
                    const response = await axios.post(url, body, config);
                    const success = response.data.success;
                    if(success){
                        this.compiledMarkdown='';
                        this.fileUrl='';
                        this.filetext='';
                        this.selectedOption='';
                        this.imageUrl=require('@/components/avacit.jpg');
                        alert('上传成功！');
                    }
                } catch (error) {
                    console.log(error);
                    alert('网络繁忙，请稍后再试！');
                }
            } else {
                alert('请补充文章信息！');
            }
        },
        checkFile() {
            this.$refs.imageInput.click();
        },
        intputfile() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.fileContent = e.target.result; // 读取文件内容
                    console.log(e.target);

                    // 对 message 进行转义，设置转换后的 Markdown 内容  
                    const cherryEngineInstance = new CherryEngine();
                    this.compiledMarkdown = cherryEngineInstance.makeHtml(this.fileContent);
                    this.compiledMarkdown = this.compiledMarkdown.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/g,
                        `<div class="copy">
                            <div class="formatted-code">  
                                <code>$1</code>
                            </div>
                        </div>`);
                };
                reader.readAsText(file); // 以文本形式读取文件 
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrl = e.target.result; // 读取文件内容并转换为 Base64 URL  
                    this.drawImageToCanvas();
                };
                reader.readAsDataURL(file); // 以数据URL形式读取文件  
            }
        },
        drawImageToCanvas() {
            const img = new Image();
            img.src = this.imageUrl;
            img.onload = () => {
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext('2d');

                // 计算裁剪区域  
                const targetAspectRatio = this.canvasWidth / this.canvasHeight;
                const imgAspectRatio = img.width / img.height;

                let drawWidth, drawHeight;

                if (imgAspectRatio > targetAspectRatio) {
                    // 图片更宽，调整宽度  
                    drawWidth = this.canvasWidth;
                    drawHeight = drawWidth / imgAspectRatio;
                } else {
                    // 图片更高，调整高度  
                    drawHeight = this.canvasHeight;
                    drawWidth = drawHeight * imgAspectRatio;
                }

                // 计算位置  
                const offsetX = (this.canvasWidth - drawWidth) / 2;
                const offsetY = (this.canvasHeight - drawHeight) / 2;

                // 清空画布  
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // 绘制裁剪后的图片  
                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            };
        }
    }
};