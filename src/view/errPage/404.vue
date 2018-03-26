<template>
    <div class="w">
        <a @click="returnHome">返回首页</a>
        <img src="./../../assets/images/404.png">
    </div>
</template>

<script>
    export default {
        methods: {
            returnHome() {
                this.$router.push({name:'Index'})
            }
        }
    }
</script>

<style scoped>
body{background: #f6f6f1;height: 100%}
.w a{margin-top: 70px;margin-bottom:20px;margin-left: 340px;background: #f6f6f1;    display: inline-block;
    width: 168px;
    height: 42px;
    line-height: 40px;
    background: #fff;
    color: #666;
    text-align: center;
    font-size: 16px;
    border: 1px solid #888888;
    border-radius: 4px;
}
.w img{margin: 0 auto;}
</style>
