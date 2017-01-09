<template>
  <div class="cartcontrol">
  	<section class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count > 0" transition="move">
      <span class="inner iconfont">&#xe907;</span>
  	</section>  
  	<section class="cart-count" v-show="food.count > 0">{{food.count}}</section>
  	<section class="cart-add" @click.stop.prevent="addCart">
       <span class="iconfont innerx">&#xe908;</span> 
    </section>
  </div>
</template>

<script type="text/javascript">
/* eslint-disable no-new */
import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        };
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count++;
        };
        this.$dispatch('cart.add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        };
          if (this.food.count) {
          this.food.count--;
        };
      }
    }
  };
</script>

<style type="text/less" lang="less">

@import url('../../common/style/font.less');

  .cartcontrol{
    width: 100%;
    height: 24px;
    font-size: 0;

    .cart-decrease{
    	display: inline-block;
      padding: 0 6px;
      transition: all .4s linear;

      &.move-transition{
      	opacity: 1;
      	transform: translate3d(0,0,0);
      }

      .inner{
      	display: inline-block;
      	line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
        transition: all .4s linear;
        transform: rotate(0);
      }  

      &.move-leave, &.move-enter{
        opacity: 0;
        transform:translate3d(24px,0,0) rotate(180deg);
    
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    
    .cart-count{
    	display: inline-block;
    	width: 12px;
    	vertical-align: top;
    	line-height: 24px;
    	text-align: center;
    	font-size: 10px;
    	color: rgb(147,153,159);
    }

    .cart-add{
      display: inline-block;
      line-height: 24px;
      color: rgb(0, 160, 220);  
      padding: 0 6px;  

      .innerx{
        height: 24px;
        font-size: 24px;
      } 	
    }

  }
</style>