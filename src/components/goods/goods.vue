<template>
  <content v-if="seller" class="cont">
  	<section class="seller-wrapper" ref="foodWrapper">
  		<ul>
  			<li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentindex === index}" @click="selectMenu(index)">
  				<span class="text">
  				  <i v-if="item.type > 0" :class="classMap[item.type]"></i>{{item.name}}
  				</span>
  			</li>
  		</ul>
  	</section>
    <section class="seller-food" ref="foodMenu">
    	<ul>
    		<li v-for="item in goods" class="food-list-hook">
    			<h4 class="title">{{item.name}}</h4>
    			<ul>
    				<li v-for="food in item.foods" @click="selectFood(food,$event)"  class="food-sec">
    					<div class="icon">
    						<img :src="food.icon">
    					</div>
    					<div class="content">
    						<h4 class="name">
    							{{food.name}}
    						</h4>
    						<p class="desc" v-if="food.description">{{food.description}}</p>
    						<p>
    						  <i class="coun">月售{{food.sellCount}}份</i>
    						  <i>好评率{{food.rating}}%</i>
    						</p>
    						<p class="price">
    							<i class="new">￥<span class="pirced">{{food.price}}</span></i>
    							<i class="old" v-if="food.oldPrice">{{food.oldPrice}}</i>
    						</p>
    						<div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartadd="cartaddEvent"></cartcontrol>
                </div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </section>
    <shop ref="shop" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shop>
    <food :food="selectedFood" ref="food" v-on:cartadd="cartaddEvent"></food>
  </content>
</template>
<script>
import Bscroll from 'better-scroll';

import shop from 'components/goods/shop';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/goods/food';

export default {
    data () {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        };
    },
    mounted () {
        this.$http.get('api/goods').then((response) => {
            response = response.body;
            if (response.errno === 0) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this.initscroll();
                    this.calculateHeight();
                });
            }
        });
    },
    props: {
        seller: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
       currentindex() {
            for (var i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    return i;
                };
            };
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                      foods.push(food);
                    };
                });
            });
            return foods;
        }
    },
    methods: {
        initscroll() {
            this.wrapperScroll = new Bscroll(this.$refs.foodWrapper, {
                click: true
            });

           this.menuScroll = new Bscroll(this.$refs.foodMenu, {
                click: true,
                probeType: 3
            });

            this.menuScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });
        },
        calculateHeight() {
            let foodList = this.$refs.foodMenu.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (var i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectFood(food, event) {
            if (!event._constructed) {
                return;
            };
            this.selectedFood = food;
            this.$refs.food.show();
        },
        selectMenu(index) {
            let foodList = this.$refs.foodMenu.getElementsByClassName('food-list-hook');
            let el = foodList[index];
            this.menuScroll.scrollToElement(el, 300);
        },
        _drop(target) {
          this.$nextTick(() => {
            this.$refs.shop.drop(target);
          });
        },
        cartaddEvent(target) {
          this._drop(target);
        }
    },
    components: {
        shop,
        cartcontrol,
        food
    }
};
</script>

<style lang="less" rel="stylesheet/less">
   @import '../../common/style/borderone.less';
   @import '../../common/style/bgpng.less';

    body{
      font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif;
    }


    .cont{
   	position: absolute;
    display: flex;
   	top: 174px;
   	bottom: 46px;
   	width: 100%;
   	overflow: hidden;

   	.seller-wrapper{
   		flex:  0 0 80px;
   		width: 80px;
   		background-color: #f3f5f7;

   		.menu-item{
   			display: table;
   			width: 100%;
   			padding: 0 12px;
        box-sizing: border-box;
        height: 54px;
   			font-size: 12px;
   			text-align: center;



  	        .decrease{
                display: inline-block;
                height: 12px;
                width: 12px;
                background-size: 100%;
               .bgimg('goods/decrease_3');
            }

              .discount{
                display: inline-block;
                height: 12px;
                width: 12px;
                background-size: 100%;
                .bgimg('goods/discount_3');
            }

              .guarantee{
                display: inline-block;
                height: 12px;
                width: 12px;
                background-size: 100%;
                .bgimg('goods/guarantee_3');
            }

              .invoice{
                display: inline-block;
                height: 12px;
                width: 12px;
                background-size: 100%;
                .bgimg('goods/invoice_3');
            }

              .special{
                display: inline-block;
                height: 12px;
                width: 12px;
                background-size: 100%;
                .bgimg('goods/special_3');
            }

   			.text{

   				display: table-cell;
   				height: 100%;
          line-height: 14px;
          .border(rgba(7,17,27,.1));
          width: 56px;
   				text-align: left;
   				font-size: 12px;
   				vertical-align: middle;

   		  }

        i{
          position: relative;
          top: 2px;
          left: -2px;
        }
   		}


    }

   	    .seller-food{
   		    flex: 1;

   		    .title{
   		    	height: 26px;
   		    	padding-left: 14px;
   		    	line-height: 26px;
   		    	border-left: 2px solid #d9dde1;
   		    	font-size: 12px;
   		    	color: rgb(147,153,159);
   		    	background-color: #f3f5f7;
            font-weight: 700;
   		    }

   		    .food-sec{
   		    	display: flex;
   		    	margin: 18px;

   		    	.border(rgba(7,17,27,.1));

            width: auto;

   		    	i{
   		    		font-style: normal;
   		    		font-size: 10px;
   		    	}


   		    	&:last-child{
   		    		.bordernone;
                margin-bottom: 10px;
   		    	}

   		    	.icon{
   		    		flex: 0 0 55px;
   		    		margin-right: 10px;

   		    		img{
   		    			height: 57px;
   		    			width: 57px;
   		    		}
   		    	}

   		    	.content{
   		    	  display: contents;
   		    		padding: 2px 18px 18px 0;
   		    		font-size: 0;


   		    		.name{
   		    			font-size: 14px;
   		    			line-height: 14px;
   		    			color: rgb(7,17,27);
                font-weight: 700;
   		    		}

   		    		.desc{
                height: 10px;
  		    			font-size: 10px;
   		    			margin: 8px 0;
   		    			line-height: 10px;
                overflow: hidden;
    		    	}

    		    	.coun{
    		    		margin-right: 12px;
    		    	}

   		    		p{
                color: rgb(147,153,159);
                margin-top: 8px;
   		    		}

   		    		.price{
   		    			font-size: 10px;
   		    			line-height: 24px;
   		    			font-weight: 700;
   		    			color: rgb(240,153,159);
                margin-top: 0;


   		    			.old{
   		    				margin-left: 8px;
   		    				color: rgb(147,153,159);
   		    				font-size: 14px;
   		    				text-decoration: line-through;
   		    			}
   		    		}

   		    		.cartcontrol-wrapper{
                position: absolute;
                right: 0;
                bottom: 12px;
              }
   		    	}
   		    }

   	    }


                .pirced{
                  font-size: 14px 700;
                  font-style: normal;
                }
   	    .current{
   	    	position: relative;
   	    	background-color: #fff;
   	    	margin-top: -10px;
   	    	z-index: 10;
   	    }
    }
</style>
