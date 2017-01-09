<template>
<p class="sellerStar">
    <img v-for="star in score - 1" class="ostar" :width="size"  :height="size" src="../header/star24_on@2x.png">
    <img v-for="star in (5 - score)" class="fsat" :width="size" :height="size"  src="../header/star24_off@2x.png">
</p>
</template>

<script type="text/javascript">
	export default{
		props: {
			score: {
				type: Number
			},
            size: {
                type: Number
            }
		}
	};
</script>

<style type="text/less" lang="less">
	.sellerStar{
        display: inline-block;
        justify-content: center;

        img{
            display: inline-block;
        }
    }
</style>
