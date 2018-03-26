<template>
    <div class="headerNav">
        <div class="logo">
            <a href="javascript:;">公证云后台</a>
        </div>
        <div class="messageList" @click='jumpTo'>
            <Icon type="ios-chatboxes"></Icon>
            <span>{{unReadMessage}}</span>
        </div>
        <div class="user">
            <Avatar size="small" icon="person" />
            {{userAccount}}
            <Button type="primary" @click='logOut'>退出</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            };
        },
        computed: {
            userAccount(){
                return this.$store.state.userInfo.userAccount
            },
            unReadMessage(){
                return this.$store.state.unReadMessage                
            },
            basePath(){
                return this.$store.state.basePath
            }
        },
        methods: {
            // 跳转到消息列表
            jumpTo(){
                this.$router.push({name:'MessageList'}); 
            },
            // 登出
            logOut(){
                this.$store.dispatch('LoginOut').then(() => {
                    
                    console.log('退出成功')
                    // this.$router.push({name:'Login'}); 
                    let basePath = this.basePath + 'alliance/logout.aspx'
                    window.location.href = basePath                    
                    
                }).catch(err => {
                    // this.$Message.error(err);
                });
            },     
        },
        mounted(){
        }
    }
</script>

<style scoped>

</style>
