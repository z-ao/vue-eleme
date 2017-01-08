<template>
<transition name="move">
  <div class="food" v-show="showFlage" v-el:food transition="move">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow iconfont">&#xe906;</i>
        </div>
      </div>
      <div class="content">
        <h4 class="title">{{food.name}}</h4>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="new">￥<i class="pirced">{{food.price}}</i>
          </span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count == 0" transition="fade">加入购物车</div>     
      </div>
      <split></split>
      <div class="info" v-show="food.info">
        <h4 class="title">商品介绍</h4>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h4 class="title">商品评价</h4>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-for="rating in food.ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                <span v-if="rating.rateType === 0" class="arrowUp iconfont">&#xe901;</span>
                <span v-if="rating.rateType === 1" class="arrowDown iconfont">&#xe902;</span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script type="text/javascript">
import Bscroll from 'better-scroll';
import Vue from 'vue';

import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/goods/split';
import ratingselect from 'components/ratings/ratingselect';

import {formatDate} from 'common/js/date';

/* eslint-disable no-unused-vars */
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

export default {
  data() {
    return {
      showFlage: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFlage = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$els.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        };
      });
    },
    hide() {
      this.showFlage = false;
    },
    addFirst(event) {
      if (!event._constructed) {
        return;
      };
      Vue.set(this.food, 'count', 1);
      this.food.count = 1;
      this.$dispatch('cart.add', event.target);
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  events: {
    'ratingtype.select'(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    'ratingtype.toggleContent'(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
};
</script>

<style type="text/less" lang="less">
@import '../../common/style/font.less';

    .food{
      position: fixed;
      top: 0;
      width: 100%;
      left: 0;
      bottom: 48px;
      z-index: 30px;
      background-color: #fff;
      &.move-transition{
        transition: all .2s linear;
        transform: translate3d(0,0,0);
      }
      &.move-enter, &.move-leave{
        transform: translate3d(100%,0,0);
      }
      .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back{
          position: absolute;
          top: 10px;
          left: 0;

          .icon-arrow{
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }
      }
      .content{
        position: relative;
        margin: 18px;
        .title{
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        .detail{
          margin-bottom: 18px;
          height: 10px;
          line-height: 10px;
          font-size: 0;

          span{
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .sell-count{
            margin-right: 6px;
          }
        }
        .price{
          font-size: 10px;
          line-height: 24px;
          font-weight: 700;
          color: rgb(240,20,20);
            .pirced{
              font-size: 14px;
              line-height: 24px;
              font-style: normal;
            }

            .old{
              margin-left: 8px;
              color: rgb(147,153,159);
              font-size: 14px;
              text-decoration: line-through;
            }
          }
      }
      .cartcontrol-wrapper{
        position: absolute;
        right: 5px;
        bottom: 10px;
      }
      .buy{
        position: absolute;
        right: 10px;
        bottom: 10px;
        height: 24px;
        width: 85px;
        z-index: 10;
        line-height: 24px;
        padding:0 12px;
        border-radius: 12px;
        font-size: 10px;
        color: #fff;
        background-color: rgb(0,160,220);
        &.fade-transition{
          transition: all .2s;
          opacity: 1;
        }
        &.fade-enter, &.fade-leave{
          opacity: 0;
        }
      }
      .info{
        padding: 18px;
        .title{
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        .text{
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77,85,93);
        }
      }
      .rating{
        padding-top: 18px;
        .title{
          line-height: 14px;
          margin: 0 0 6px 18px;
          font-size: 14px;
          color: rgb(7,17,27);
          font-weight: 700;
        }
        .rating-wrapper{
          padding: 0 18px;
          .rating-item{
            position: relative;
            padding: 16px 0;

            .user{
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 0;
              .name{
                display: inline-block;
                margin-right: 6px;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147,153,159);
              }
              .avatar{
                border-radius: 50%;
              }
            }
            .time{
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147,153,159);
            }
            .text{
              line-height: 1;
              font-size: 12px;
              color: rgb(7,17,27);
              .iconfont{
                margin-right: 4px;
                line-height: 24px;
                font-size: 12px;
              }
              .arrowUp{
                color: rgb(0,160,220);
              }
              .arrowDown{
                color: rgb(147,153,159);
              }
            }
          }
        }
      }
    }
</style>