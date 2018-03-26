<template>
    <div class="login">
        <div><label>用户名：</label><input type="text" v-model="userAccount" /></div><br>
        <div><label>密码：</label><input type="password" v-model="userPassword" /></div><br>
        <div>
            <Button type="primary" @click="login">登录</Button>
        </div>
    </div>
</template>

<script>
    import router from './../router/index.js'
    export default {
        data() {
            return {
                userAccount: '',
                userPassword: ''
            }
        },
        methods: {
            login() {
                this.$store.dispatch('Login', [this.userAccount, this.userPassword]).then((resolve) => {
                    if(resolve == true){
                        console.log('登录成功')
                        this.$router.push({
                            name: 'Index'
                        });
                        // router.go(0)
                    }else{
                        console.log('登录失败，账号被冻结或禁用')
                    }
                }).catch(err => {
                    this.$Message.error(err);
                });
            }
        }
    };
</script>

<style scoped>
    .login {
        width: 300px;
        margin: 100px auto;
    }
</style>