<template>
  <div class="ratingselect">
    <div class="rating-type">
    	<span @click="select(2, $event)" class="block positive" :class="{'active':selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    	<span  @click="select(0, $event)" class="block positive" :class="{'active':selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
    	<span @click="select(1, $event)" class="block negative" :class="{'active':selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on':onlyContent}">
    	<span class="iconfont arre">&#xe905;</span>
    	<span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  const POSITIVE = 0;
  const NEGATIVES = 1;
  const ALL = 2;

  export default{
  	props: {
  		ratings: {
  			type: Array,
  			default() {
  				return [];
  			}
  		},
  		selectType: {
        type: Number,
        default: ALL
  		},
  		onlyContent: {
  			type: Boolean,
  			default: true
  		},
  		desc: {
  			type: Object,
  			default() {
  				return {
  					all: '全部',
  					positive: '满意',
  					negative: '不满意'
  				};
  			}
  		}
  	},
  	methods: {
  		select(type, event) {
  			if (!event._constructed) {
  				return;
  			}
  			this.$emit('ratingtypeselect', type);
  		},
  		toggleContent(event) {
  			if (!event._constructed) {
  				return;
  			}
  			this.$emit('ratingtypetogglecontent', this.onlyContent);
  		}
  	},
  	computed: {
  		positives() {
  			return this.ratings.filter((rating) => {
  				return rating.rateType === POSITIVE;
  			});
  		},
  		negatives() {
  			return this.ratings.filter((rating) => {
  				return rating.rateType === NEGATIVES;
  			});
  		}
  	}
  };
</script>
<style type="text/less" lang="less">
	@import '../../common/style/font.less';
	@import '../../common/style/borderone.less';

	.ratingselect{
		.rating-type{
			margin: 0 18px;
      padding: 12px 0 18px;
			font-size: 0;
      .border(rgba(7,17,27,.1));

      width: auto;
			.block{
				display: inline-block;
				padding: 8px 12px;
				margin-right: 8px;
				border-radius: 1px;
				line-height: 16px;
				font-size: 12px;
				color: rgb(77,85,93);
				&.active{
					color: #fff;
				}
				.count{
					margin-left: 2px;
					font-size: 8px;
				}
				&.positive{
					background-color: rgba(0,160,220, .2);
					&.active{
						background-color: rgb(0,160,220);
					}
				}
				&.negative{
					background: rgba(77,85,93,.2);
					&.active{
						background-color: rgb(77,85,93);
					}
				}
			}
		}

    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7,17,27,.1);
        color: rgb(147,153,159);
        font-size: 0;
        .arre{
          display: inline-block;
          vertical-align: top;
          margin-right: 4px;
          font-size: 24px;
          color: rgb(147,153,159);
          }

        .text{
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
        }
      }

      .on{
        font-size: 24px;
          .arre{
          color: #00C850;
          } 
      }
	}
</style>