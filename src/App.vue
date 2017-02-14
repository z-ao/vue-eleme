<template>
  <div>
    <vheader :seller="seller"></vheader>
    <div class="tab">
      <ul>
        <li class="tab-item">
          <router-link to="/goods">商品</router-link>
        </li>
        <li class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </li>
        <li class="tab-item">                  
          <router-link to="/seller">商家</router-link>
        </li>
      </ul>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from 'components/header/header';

export default {
  mounted() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === 0) {
        this.seller = response.data;
      };
    });
  },
  data() {
    return {
      seller: {}
    };
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