<template>
    <p class="sellerStar">
        <img v-for="light in lights" class="ostar" :width="size" :height="size" key="index" src="../header/on.png">
    </p>
</template>

<script type="text/javascript">
	export default{
		props: {
			score: {
				type: Number,
                default: 0
			},
            size: {
                type: Number,
                default: 0
            }
		},
        computed: {
            lights() {
                return Math.floor(this.score);
            },
            flows() {
                return Math.ceil(5 - this.score);
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
