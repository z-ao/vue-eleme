<template>
   <div class="ratings" ref="rating">
        <div class="rating" v-if="seller">
            <div class="ratings-content">
                <div class="overview">
                    <div class="overview-left">
                        <h4 class="score">{{seller.score}}</h4>
                        <div class="title">综合评分</div>
                        <div class="rank">高于周边商家{{seller.rankRate}}</div>
                    </div>
                    <div class="overview-right">
                        <div class="score-wrapper">
                            <span class="title">服务态度</span>
                            <star :size="20" :score="seller.serviceScore" class="star"></star>
                            <span class="score">{{seller.serviceScore}}</span>
                        </div>
                        <div class="score-wrapper">
                            <span class="title">商品评分</span>
                            <star :size="20" :score="seller.serviceScore"  class="star"></star>
                            <span class="score">{{seller.foodScore}}</span>
                        </div>
                        <div class="delivery-wrapper">
                            <span class="title">送达时间</span>
                            <span class="delivery">{{seller.deliveryTime}}分钟</span>
                        </div>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type="selectType"
                :desc="desc" :ratings="ratings"
                :only-content="onlyContent"
                v-on:ratingtypetogglecontent="foodToggleContent"
                v-on:ratingtypeselect="foodSelect"
            ></ratingselect>
            <div class="rating-wrapper">
                <ul v-if="ratings.length">
                    <li v-for="rating in ratings" class="rating-item" v-show="needshow(rating.rateType, rating.text)">
                        <div class="avatar">
                            <img width="28" height="28" :src="rating.avatar">
                        </div>
                        <div class="content">
                            <h4 class="name">{{rating.username}}</h4>
                            <div class="star-wrapper">
                                <star :size="15" :score="rating.score" class="star"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliverTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-if="rating.recommend.length && rating.recommend">
                                <span v-if="rating.rateType === 0" class="arrowUp iconfont">&#xe901;</span>
                                <span v-if="rating.rateType === 1" class="arrowDown iconfont">&#xe902;</span>
                                <span v-for="item in rating.recommend" class="item">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatDate}}
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else>no commend</div>
            </div>
        </div>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';

import star from 'components/header/star';
import split from 'components/goods/split';
import ratingselect from 'components/ratings/ratingselect';

import {formatDate} from 'common/js/date';

/* eslint-disable no-unused-vars */
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    created() {
        this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.rating, {
                click: true
            });
            this.$http.get('api/ratings').then((response) => {
                response = response.body;
                if (response.errno === 0) {
                    this.ratings = response.data;
                }
            });
        });
    },
    data() {
        return {
            selectType: ALL,
            ratings: [],
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    methods: {
        needshow(type, text) {
            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        foodSelect(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        foodToggleContent(onlyContent) {
            this.onlyContent = !onlyContent;
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
        star,
        split,
        ratingselect
    }
};
</script>
<style lang="less" rel="stylesheet/less">
    .ratings{
        position: absolute;
        top: 174px;
        left: 0;
        width: 100%;
        .overview{
            display: flex;
            padding: 18px 0;
            .overview-left{
                flex: 0 0 137px;
                padding: 6px 0;
                width: 137px;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                @media only screen and (max-width:320px){
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score{
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255, 153, 0);
                }
                .title{
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .rank{
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 139);
                }
            }
            .overview-right{
                flex:1;
                padding:6px 0 6px 24px;
                @media only screen and (max-width:320px){
                    padding-left: 6px;
                }
                .score-wrapper{
                    margin-bottom: 8px;
                    font-size: 0;
                    .title{
                        display: inline-block;
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        vertical-align: middle;
                    }
                    .star{
                        display: inline-block;
                        margin: 0 12px;
                        vertical-align: middle;
                    }
                    .score{
                        display: inline-block;
                        line-height: 18px;
                        vertical-align: middle;
                        font-size: 12px;
                        color: rgb(255, 153, 0);
                    }
                }
                .delivery-wrapper{
                    font-size: 0;
                    .title{
                        line-height: 18px;
                        vertical-align: middle;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                    }
                    .delivery{
                        font-size: 12px;
                        line-height: 18px;
                        vertical-align: middle;
                        margin-left: 12px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
        .rating-wrapper{
            padding: 0 18px;
            .rating-item{
                display: flex;
                padding: 18px 0;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .avatar{
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img{
                        border-radius: 50%;
                    }
                }
                .content{
                    position: relative;
                    flex:1;
                    .name{
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                    }
                    .star-wrapper{
                        margin-bottom: 6px;
                        font-size: 0;
                        .star{
                            display: inline-block;
                            margin: 6px;
                            vertical-align: middle;
                        }
                        .delivery{
                            display: inline-block;
                            vertical-align: middle;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147 , 153, 159);
                        }
                    }
                    .text{
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7, 17, 27);
                        font-size: 12px;
                    }
                    .recommend{
                        line-height: 16px;
                        font-size: 0;
                        .icon-thumb_up, .item{
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .arrowUp{
                            color: rgb(0, 160, 220);
                        }
                        .item{
                            padding: 0 6px;
                            border: 1px solid rgba(7, 17, 27, 0.1);
                            color: rgb(147, 153, 159);
                            background: #fff;
                        }
                    }
                    .time{
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }
            }
        }
    }
</style>