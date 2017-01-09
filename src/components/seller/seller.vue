<template>
    <div class="sellerx" v-el:seller>
        <div class="seller-content">
        	<div class="overview">
        		<h4 class="title">{{seller.name}}</h4>
        		<div class="desc">
        			<star :size="18" :score="seller.score"></star>
        			<span class="text">({{seller.ratingCount}})</span>
        			<span class="text">月售{{seller.sellCount}}单</span>
        		</div>
        		<ul class="remark">
        			<li class="block">
        				<h4>起送价</h4>
        				<div class="content">
                           <span class="stress">{{seller.minPrice}}</span> 元
        				</div>
        			</li>
        			<li class="block">
        				<h4>商家配送</h4>
        				<div class="content">
                           <span class="stress">{{seller.minPrice}}</span>  元
        				</div>
        			</li>
        			<li class="block">
        				<h4>平均配送时间</h4>
        				<div class="content">
                           <span class="stress">{{seller.minPrice}}</span> 分钟
        				</div>
        			</li>
        		</ul>
        		<div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite iconfont" :class="{'active':favorite}">&#xe904;</span>
                    <span class="text">{{favoriteText}}</span>
                </div>
         	</div>
            <split></split>
            <div class="bulletin">
            	<h4 class="title">公告与活动</h4>
            	<div class="content-wrapper">
            		<p class="content">{{seller.bulletin}}</p>
            	</div>
            	<ul v-if="seller.supports" class="supports">
        	        <li v-for="item in seller.supports" class="support-item">
        	    	    <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
        	    	    <span class="text">{{seller.supports[$index].description}}</span>
        	        </li>
        	    </ul>
            </div>
        	<split></split>
            <div class="pics">
                <h4 class="title">商家实景</h4>
                <div class="pic-wrapper" v-el:picwrap>
                    <ul class="pic-list" v-el:piclist>
                        <li class="pic-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="info">
                <h4 class="title">商家信息</h4>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
       </div>
    </div>
</template>
<script>
import Bscroll from 'better-scroll';
import star from 'components/header/star';
import {saveToLocal, loadFromLocal} from 'common/js/store';
import split from 'components/goods/split';

export default {
    data() {
        return {
            favorite: (() => {
                return loadFromLocal(this.seller.id, 'favorite', false);
            })(),
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        };
    },
    ready() {
		this.$nextTick(() => {
            if (!this.scroll) {
                this.scroll = new Bscroll(this.$els.seller, {
                    click: true
                });
            } else {
                this.scroll.refresh();
            }
            this._picScroll();
        });
	},
    props: {
		seller: {
			type: Object
		}
	},
	methods: {
		_picScroll() {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.seller.pics.length - margin;
            this.$els.piclist.style.width = width + 'px';
            this.$nextTick(() => {
                this.picScroll = new Bscroll(this.$els.picwrap, {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            });
        },
        toggleFavorite(event) {
            if (!event._constructed) {
                return false;
            }
            this.favorite = !this.favorite;
            saveToLocal(this.seller.id, 'favorite', this.favorite);
        }
	},
	computed: {
        favoriteText() {
            return this.favorite ? '已收藏' : '收藏';
        }
    },
    components: {
		star,
		split
	}
};
</script>

<style lang="less" rel="stylesheet/less">
@import '../../common/style/borderone.less';
@import '../../common/style/bgpng.less';

    .sellerx{
    	position: absolute;
        top: 174px;
        bottom: 0;
        width: 100%;
        left: 0;
        overflow: hidden;
            h4{
                font-weight: 700;
            }
        .overview{
        	position: relative;
        	padding: 18px;

        	.title{
        		margin-bottom: 8px;
        		line-height: 14px;
        		color: rgb(7,17,27);
         		font-size: 14px;
       	    }
        	.desc{
        		padding-bottom: 18px;
        		.border(rbga(7,17,27,.1));
        		font-size: 0;
        		.star{
        			display: inline-block;
        			margin-right: 8px;
        			vertical-align: top;
        		}
        		.text{
        			display: inline-block;
        			margin-right: 12px;
        		    line-height: 18px;
        			vertical-align: top;
        			font-size: 10px;
        			color: rgb(77,85,93);
        		}
        	}
        	.remark{
        		display: flex;
        		padding-top: 18px;
        		.block{
        			flex: 1;
        			text-align: center;
        			border-right: 1px solid rgba(7,17,27,.1);
        			&:last-child{
        				border: none;
        			}
        			h4{
        				margin-bottom: 4px;
        				font-size: 10px;
        				color: rgb(147,153,159);
        				line-height: 10px;
        			}
        			.content{
        				line-height: 24px;
        				font-size: 10px;
        				color: rgb(7,17,27);
        				.stress{
        					font-size: 24px;
        				}
        			}
        		}
        	}
        .favorite{
            position: absolute;
            top: 18px;
            right: 11px;
            text-align: center;
            width: 50px;
            .icon-favorite{
                display: block;
                margin-bottom: 4px;
                color: #d4d6d9;
                height: 25px;
                line-height: 24px;
                font-size: 24px;
                &.active{
                    color:rgb(240, 20, 20);
                }
            }
            .text{
                font-size: 10px;
                line-height: 10px;
                color: rgb(77, 85, 98);
            }
        }
    }

        .bulletin{
        padding: 18px 18px 0 18px;
        .title{
            margin-bottom: 8px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
       	.content-wrapper{
        		padding: 0 12px 16px;
        		.border(rgba(7,17,27,.1));

        		.content{
        			line-height: 24px;
        			font-size: 12px;
        			color: rgb(240,20,20);
        		}
        	}
        	.supports{
        		.support-item{
        			padding: 16px 12px;
        			font-size: 0;
                    .border(rgba(7,17,27,.1));
        		}

          .discount{
            display: block;
            float: left;
            height: 16px;
            width: 16px;
            margin-right: 4px;
            background-size: 100%;
            .bgimg('seller/discount_4');
          }

          .guarantee{
            display: block;
            float: left;
            height: 16px;
            width: 16px;
            margin-right: 4px;
            background-size: 100%;
            .bgimg('seller/guarantee_4');
          }

          .invoice{
            display: block;
            float: left;
            height: 16px;
            width: 16px;
            margin-right: 4px;
            background-size: 100%;
            .bgimg('seller/invoice_4');
          }

          .special{
            display: block;
            float: left;
            height: 16px;
            width: 16px;
            margin-right: 4px;
            background-size: 100%;
            .bgimg('seller/special_4');
        }

        .decrease{
            display: block;
            float: left;
            height: 16px;
            width: 16px;
            margin-right: 4px;
            background-size: 100%;
            .bgimg('seller/decrease_4');
          }

        	}	
        	.icon{
        		display: inline-block;
        		width: 16px;
        		height: 16px;
        		vertical-align: top;
        		margin-right: 6px;
        		background-size: 16px 16px;
        		background-repeat: no-repeat;



        	}
            .text{
                line-height: 16px;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
        }

    
    .pics{
        padding: 18px;
        .title{
            margin-bottom: 12px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .pic-wrapper{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list{
                font-size: 0;
                .pic-item{
                    display: inline-block;
                    margin-right: 6px;
                    width: 120px;
                    height: 90px;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
    }
    .info{
        padding: 18px 18px 0 18px;
        color: rgb(7, 17, 27);
        .title{
            padding-bottom: 12px;
            line-height: 14px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            font-size: 14px;
        }
        .info-item{
            padding: 16px 12px;
            line-height: 16px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            font-size: 12px;
            &:last-child{
                border-bottom: none;
            }
        }
    }

        	
    }
 


</style>
