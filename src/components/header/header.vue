<template>
  <div class="seller" v-if="seller">
    <header>
      <div class="backg"></div>
      <div class="logo">
        <img :src="seller.avatar">
      </div>
      <h4 class="name">
        <span class="nameIcon"></span>
        {{seller.name}}
      </h4>
      <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
      <p v-if="seller.supports" class="supports">
        <span :class="classMap[seller.supports[0].type]"></span>
        <span class="supportstxt">{{seller.supports[0].description}}</span>
      </p>
      <a v-if="seller.supports" class="supportlen" @click="shom">
        <span>{{seller.supports.length}}个</span>
        <span class="arrow"></span>
      </a>
    </header>
    <div class="bulletin" @click="shom">
      <span class="bulletinIcon"></span>
      <span class="bulletinTxt">{{seller.bulletin}}</span>
      <span class="arrow"></span>
    </div>
    <div class="sellerDown" v-show="down" transition="fade">
      <section class="detailWrapper">
        <div class="detailMain">
          <content>
            <h4>{{seller.name}}</h4>
            <star class="sellerStar" :score="seller.deliveryPrice" :size="24"></star>
          </content>
          <content class="discountMes">
            <h4>
              <span class="lTube"></span>
              <span>优惠信息</span> 
              <span class="rTube"></span>
            </h4>
            <div class="discountCon">
              <p v-for=" index in seller.supports">
                <i :class="classMap[index.type]"></i>
                {{index.description}}
              </p>
            </div>
          </content>
          <content class="sellerMes">
            <h4>
              <span class="lTube"></span>
              <span>商家公告</span>
              <span class="rTube"></span>
            </h4>
            <p>{{seller.bulletin}}</p>
          </content>
        </div>
      </section>
      <section class="sellerBtn">
        <a @click="hide" class="iconfont">&#xe906;</a>
      </section>
    </div>
  </div>
</template>
<script>
import star from 'components/header/star';
export default {
  data() {
    return {
      down: false
    };
  },
  ready() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    hide() {
      this.down = false;
    },
    shom() {
      this.down = true;
    }
  },
  components: {
    star
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/style/bgpng.less";
  
  @import "../../common/style/font.less";


  .seller{
    display: block;
    color: #fff;


    .backg{
      position: absolute;
      width: 100%;
      height: 105px;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px);
      background: url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg') 0 0 no-repeat ~'/' 100%  ;
    }


    .decrease{
      display: block;
      float: left;
      height: 12px;
      width: 12px;
      margin-right: 4px;
      background-size: 100%;
      .bgimg('header/decrease_1');
    }

    .discount{
      display: block;
      float: left;
      height: 12px;
      width: 12px;
      margin-right: 4px;
      background-size: 100%;
      .bgimg('header/discount_1');
    }

    .guarantee{
      display: block;
      float: left;
      height: 12px;
      width: 12px;
      margin-right: 4px;
      background-size: 100%;
      .bgimg('header/guarantee_1');
    }

    .invoice{
      display: block;
      float: left;
      height: 12px;
      width: 12px;
      margin-right: 4px;
      background-size: 100%;
      .bgimg('header/invoice_1');
    }

    .special{
      display: block;
      float: left;
      height: 12px;
      width: 12px;
      margin-right: 4px;
      background-size: 100%;
      .bgimg('header/special_1');
    }





    header{
      position: relative;
      display: block;
      height: 106px;
      padding: 24px 12px 18px 24px;
      background-color: rgba(7,17,27,.5);
      font-size: 0;

      .logo{
        float: left;
        margin-right:  16px;
        height: 64px;
        width: 64px;
        border-radius: 2px;

        img{
          display: block;
          height: 64px;
          width: 64px;
        }
      }

      .name{
        height: 18px;
        line-height: 18px;
        margin: 2px 0;
        font-weight: 700;
        font-size: 16px;

        .nameIcon{
          display: block;
          float: left;
          height: 18px;
          width: 30px;
          margin-right: 6px;
          .bgimg('header/brand');
          background-size: 30px 18px;
        }
      }

      .description{
        margin: 8px 0;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
      }

      .supports{
        height: 12px;
        margin-top: 10px;
        line-height: 12px;
        font-size: 10px;            

        .supportstxt{
          display: inline-block;
        }

      }      

      .supportlen{
        position: absolute;
        width: 42px;
        bottom: 17px;
        right: 12px;
        line-height: 30px;
        padding-left: 8px;
        border-radius: 14px;
        font-size: 10px;
        color: rgb(255,255,255);
        background: rgba(0,0,0,.2);
        cursor: pointer;
      }
    }

    .arrow{
      display: inline-block;
      height: 5px;
      width: 5px;
      border: 1px solid;
      border-color:transparent transparent #fff #fff;
      transform: rotateZ(225deg);
    }

    .bulletin{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 12px;
      font-size: 0;
      background-color: rgba(7,17,27,.7);

      .bulletinIcon{
        position: absolute;
        top: 9px;
        display: inline-block;
        height: 12px;
        width: 22px;
        background-size: 100% 100%;
        .bgimg('header/bulletin');
      }

      .bulletinTxt{
        float: left;
        width: 100%;
        display: inline-block;
        padding: 0 4px 0 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 10px;
      }

      .arrow{
        position: absolute;
        top: 10px;
        right: 12px;
        cursor: pointer;
      }

    }

    .sellerDown{
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      text-align: center;
      color: #fff;
      background-color: rgba(7,17,27,.8);
      z-index: 99;
      overflow: auto;
      transition: all .5s;

      &.fade-transition{
        opacity: 1;
        background-color: rgba(7,17,27,.8);
      }

      &.fade-enter, &.fade-leave{
        opacity: 0;
        background-color: rgba(7,17,27,.1);
      }


      .detailWrapper{
        min-height: 100%;

        .detailMain{
          padding: 64px 0;
        }
      }




      h4{
        line-height: 16px;
        font-size: 16px;
        font-weight: 700;
      }


      span{
        display: block;
        flex: 0 0 auto;
        margin: 8px;
      }

      .lTube{
        float: left;
        flex: 1;
        margin: 10px 0;
        display: block;
        height: 1px;
        background-color: rgba(255,255,255,.2);
      }

      .rTube{
        float: right;
        flex: 1;
        margin: 10px 0;
        display: block;
        height: 1px;
        background-color: rgba(255,255,255,.2);
      }


      .sellerStar{
        display: flex;
        margin: 16px auto;
        justify-content: center;

        img{
          margin: 0 10px;
        }
      }    

      .discountMes{
        text-align: center;
        line-height: 12px;
        margin: 28px 0;
        font-size: 12px;

        h4{
          display: flex;
          align-content: center;
        }

        .discountCon{
          display: block;
          margin-top: 24px;

          p{
            line-height: 16px;
            margin: 12px 0;
            text-align: left;

            i{
              display: block;
              height: 16px;
              width: 16px;
              margin: 0 6px;
            }
          }
        }
      }

      .sellerMes{
        display: block;
        width: 100%;
        margin-top: 28px;
        text-align: center;

        h4{
          display: flex;
        }

        p{
          display: inline-block;
          line-height: 24px;
          margin: 24px 12px;
          font-size: 12px;
          text-align: left;
          color: rgb(255,255,255);
        }
      }

      .sellerBtn{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0;
        clear: both;




        a{
          display: block;
          height: 32px;
          width: 32px;
          font-size: 34px;
          cursor: pointer;
        }
      }
    }
  }

  .ostar{
    background-size: 100%;
    margin: 0 6px;
    .bgimg('header/star24_on');
  }

  .fsat{
    background-size: 100%;
    margin: 0 6px;
    .bgimg('header/star24_off');
  }
 html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
    margin: 0;
    box-sizing: border-box;
}

</style>