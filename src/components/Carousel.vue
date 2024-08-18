<template>  
    <div class="carousel">  
      <div class="carousel-inner" :style="{transform: `translateX(-${currentIndex * 100}%)` }">  
        <div class="carousel-item" v-for="(item, index) in items" :key="index">  
          <img :src="item.image" :alt="item.alt" />  
        </div>  
      </div>  
      <button @click="prev" class="carousel-control prev">❮</button>  
      <button @click="next" class="carousel-control next">❯</button>  
    </div>  
  </template>  
  
  <script>  
  export default {  
    name:'myCoo',
    props: {  
      items: {  
        type: Array,  
        required: true  
      }  
    },  
    data() {  
      return {  
        currentIndex: 0  
      };  
    },  
    methods: {  
      next() {  
        this.currentIndex = (this.currentIndex + 1) % this.items.length;  
      },  
      prev() {  
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;  
      }  
    }  
  };  
  </script>  
  
  <style scoped>  
  .carousel {  
    position: relative;  
    overflow: hidden;  
    width: 500px;  
  }  
  
  .carousel-inner {  
    display: flex;  
    transition: transform 0.5s ease;  
  }  
  
  .carousel-item {  
    display: flex;
    justify-content: center;
    min-width: 100%;  
    box-sizing: border-box;  
  }  
  
  img {   
    height: 400px;
    display: block;  
  }  
  
  .carousel-control {  
    position: absolute;  
    top: 50%;  
    transform: translateY(-50%);  
    background: rgba(255, 255, 255, 0.7);  
    border: none;  
    cursor: pointer;  
  }  
  
  .prev {  
    left: 10px;  
  }  
  
  .next {  
    right: 10px;  
  }  
  </style>