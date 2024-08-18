<template>
    <div style="width: 285px;cursor: pointer;border: 1px solid #FB5B39;border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
        <div class="image-container">
            <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" class="hover-image"/>
        </div>
        <div class="text-box">{{ filetext }}</div>
        <div style="display: flex;color: #5F606F;font-size: 14px;padding: 5px 10px;margin-top: auto;"> 
            <div>{{ articletime }}</div>
            <div  style="display: flex;margin-left: auto;">
                <img src="../../public/static/image/yuedu.png" style="width: 22px;height: 20px;">
                <div>&nbsp;{{ viewcount }}&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <img src="../../public/static/image/dainzan.png" style="width: 20px;height: 18px;">
                <div>&nbsp;{{ likecount }}</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        filetext: {
            type: String,
            required: true,
        },
        imageurl: {
            type: String,
            required: true,
        },
        likecount:{
            type: String,
            required: true,
        },
        viewcount:{
            type: String,
            required: true,
        },
        articletime:{
            type: String,
            required: true,
        }
    },
    data() {
        return {
            canvasWidth: 265, // 目标宽度  
            canvasHeight: 198, // 目标高度  
        }
    },
    created() {
        this.drawImageToCanvas();
        
    },
    methods: {
        drawImageToCanvas() {
            const img = new Image();
            img.src = this.imageurl;
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
}
</script>

<style>
.image-container{
    display: inline-block; /* 使容器为块级元素 */  
    overflow: hidden;     /* 隐藏超出部分 */  
    padding: 5px 10px;
}
.hover-image {  
  transition: transform 0.3s ease; /* 添加过渡效果 */  
}  

.image-container:hover .hover-image {  
  transform: scale(1.1); /* 鼠标悬停时放大 */  
}  
.text-box{
    display: flex;
    margin-right: auto;
    color: #5F606F;
    font-size: 15px;
    text-align: left; 
    padding: 5px 10px;
    &:hover{
        color: #000;
    }
}
</style>