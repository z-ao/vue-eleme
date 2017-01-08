<template>
  <div>
    <vheader :seller="seller"></vheader>
    <div class="tab">
      <ul>
        <li class="tab-item">
          <a v-link="{path: '/goods'}" class="active">商品</a>
        </li>
        <li class="tab-item">
          <a v-link="{path: '/ratings'}">评论</a>
        </li>
        <li class="tab-item">                  
          <a v-link="{path: '/seller'}">商家</a>
        </li>
      </ul>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/header/header';

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === 0) {
        this.seller = response.data;
      };
    });
  },
  components: {
    vheader: header
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import './common/style/borderone.less';

  .tab{
    .border(rgba(7,17,27,.1))
  }

  .tab > ul{
    display: flex;
    height: 40px;
    line-height: 40px;

    .tab-item{
      flex: 1;
      text-align: center;

      

      & > a{
        display: blcok;
        font-size: 14px;
        color: rgb(77,85,93);
      }

     .active{
        color: rgb(240,20,20);
      }

    }
  }

</style>