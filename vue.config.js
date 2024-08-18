const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy: {  
      '/login': {  
        target: 'http://120.46.6.70:1136/aicaht/', // 目标服务器  
        changeOrigin: true, // 将主机头的来源更改为目标 URL  
      },  
      '/validate':{
        target: 'http://120.46.6.70:1136/aicaht/', // 目标服务器  
        changeOrigin: true, // 将主机头的来源更改为目标 URL  
      },
      '/submit':{
        target: 'http://120.46.6.70:1136/aicaht/', // 目标服务器  
        changeOrigin: true, // 将主机头的来源更改为目标 URL  
      },
      '/queryList':{
        target: 'http://120.46.6.70:1136/aicaht/', // 目标服务器  
        changeOrigin: true, // 将主机头的来源更改为目标 URL  
      },
      '/ArticleView':{
        target: 'http://120.46.6.70:1136/aicaht/', // 目标服务器  
        changeOrigin: true, // 将主机头的来源更改为目标 URL  
      }
    },  
  }
})
