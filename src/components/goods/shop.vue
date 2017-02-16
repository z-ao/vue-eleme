<template>
<div class="shopcart">
  <div class="content" @click="toggleList()">
    <section class="contentLeft">
      <div class="logoWrapper">
        <content class="logo" :class="{'hightlight':totalCount > 0}">
          <i class="iconfont iconShop" :class="{'hightlight': totalCount > 0}">&#xe903;</i>
        </content>
        <aside class="num" v-show="totalCount > 0">{{totalCount}}</aside>
      </div>
      <div class="price" :class="{'hightlight': totalCount > 0}" >￥{{totalPrice}}</div>
      <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
    </section>
    <section class="contentRight" :class="payClass" @click.stop.prevent="pay(totalPrice)">
      <div class="pay">{{payDesc}}</div>
    </section>
    <section class="ball-container">
        <div v-for="(ball, index) in balls">
            <transition name="drop"
                v-on:before-enter="dropBeforeEnter"
                v-on:enter="dropEnter"
                v-on:after-enter="dropafterEnter">
                <div v-show="ball.show" class="ball" :key="index">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
         </div>
    </section>
    <transition name="fold">
        <section class="shopcart-list" v-show="listshow">
            <div class="list-header">
                <h4 class="title">购物车</h4>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="food in selectFoods">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥<i class="pirced">{{food.price * food.count}}</i>
                            </span> 
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food" v-on:cartadd="drop"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </transition>
  </div> 
    <transition name="fade">
        <div class="list-mask" v-show="listshow" @click="hideList()"></div>
    </transition>
</div>
</template>

<script type="text/javascript">
import cartcontrol from 'components/cartcontrol/cartcontrol';
import Bscroll from 'better-scroll';

  export default {
    data() {
      return {
        balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }],
        dropBalls: [],
        fold: true
      };
    },
    props: {
        selectFoods: {
            default() {
                return [{
                    price: 10,
                    count: 1
                }];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    methods: {
        drop(el) {
            for (var i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                };
            };
        },
        hideList() {
            this.fold = true;
        },
        toggleList(show) {
            this.fold = !this.fold;
        },
        pay(pays) {
            console.log(`pay of ${pays}`);
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        dropBeforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                /* eslint-disable no-unused-vars */
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropEnter(el) {
            /* eslint-disable no-unused-vars */
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
            });
        },
        dropafterEnter(el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          };
        }
    },
     computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差¥${diff}起送`;
            } else {
                return '去结算';
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listshow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new Bscroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="less" type="text/less">
@import '../../common/style/font.less';

.shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content{
        display: flex;
        background:#141d27;
        font-size: 0;
        z-index: 31;
        color: rgba(255, 255, 255, 0.4);


        .contentLeft{
            flex:1;
            .logoWrapper{
                display: inline-block;
                position: relative;
                top: -10px;
                margin: 0 12px;
                padding: 6px;
                width: 56px;
                height: 56px;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo{
                    position: absolute;
                    left: 5px;
                    top: 6px;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #80858a;
                    text-align: center;
                    line-height: 44px;
                    .iconShop{
                        width: 24px;
                        height: 24px;
                        margin: 18px auto;
                        font-size: 24px;
                        color: #fff;


                        &.hightlight{
                            color: #fff;
                        }
                    }
                    &.hightlight{
                        background: rgb(0, 160, 220);
                    }
                }
                .num{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 24px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 16px;
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    background:rgb(240, 20, 20);
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                }
            }
            .price{
                display: inline-block;
                vertical-align: top;
                line-height: 24px;
                margin-top: 12px;
                box-sizing: border-box;
                padding-right: 12px;
                border-right: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 16px;
                font-weight: 700;
                &.hightlight{
                    color: #fff;
                }
            }
            .desc{
                display: inline-block;
                vertical-align: top;
                margin: 12px 0 0 12px;
                line-height: 24px;
                font-size: 10px;
            }
        }
        .contentRight{
            flex: 0 0 105px;
            width: 105px;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            background: #2b343c;
            &.not-enough{
                background: #2b343c;
            }
            &.enough{
                background: #00b43c;
                color: #fff;
            }
        }

      .ball-container{
        .ball{
            position: fixed;
            left: 32px;
            bottom: 22px;
            z-index: 200;
            transition: all .4s;

            &.drop-transition{
                transition: all .4s cubic-bezier(0.49,-0.29,0.75,0.41);
            }
            
            .inner{
                display: block;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all .3s;
            }
        }
      }  

      .shopcart-list{
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 100%;
        transition: all 0.5s;
        transform: translate3d(0, -100%, 0);
        &.fold-enter, &.fold-leave{
            transform: translate3d(0, 0, 0);
        }

        .enough{
           background-color: rgb(0, 160, 220);
           color: #fff;
        }
        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background: #f3f5f7;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title{
                float: left;
                font-size: 14px;
                color: rgb(7, 17, 27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color: rgb(0, 160, 220);
            }
        }
        .list-content{
            padding: 0 18px;
            max-height: 217px;
            overflow: hidden;
            background: #fff;
            .food{
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                    font-weight: 700;
                }
                .price{
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 10px;
                }
            }
        }
      }

    }


    .list-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        backdrop-filter: blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
        &.fade-enter-active, &.fade-leave-actiev{
            transition: all 0.5s;
        }
        &.fade-enter, &.fade-leave{
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
    }
}
</style>