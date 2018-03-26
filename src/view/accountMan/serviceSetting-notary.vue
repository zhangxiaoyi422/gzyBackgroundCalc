<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" :active-name="getPosition.forthTab" @on-select="turnUrl">
            <MenuItem name="ServiceSettingNotaryOrg">
                按公证机构显示
            </MenuItem>
            <MenuItem name="ServiceSettingNotaryItem">
                按收费项目显示
            </MenuItem>
        </Menu>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

    export default {
        data() {
            return{
                theme1:'light'
            }
        },
        computed: {
            ...mapGetters([
                'getPosition',
             ]),  
        },
        methods: {
            turnUrl(name) {
                // 在右侧显示相应页面
                this.$router.push({
                    name: name
                });
            },
        },
    }
</script>

<style scoped>
.ivu-menu-horizontal{height:40px;line-height:40px;margin-bottom:20px}
.ivu-menu li{border-right:0}
.ivu-menu-item-selected{ background: #fff;}
</style>