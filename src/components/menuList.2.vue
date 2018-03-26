<template>
    <Col span="5">
        <Menu ref="menu" accordion :active-name="getPosition.name" width="auto" :open-names="[getPosition.primaryNavigation]" @on-select="turnUrl">
            <template v-for="item in getGeneratedRouters" v-if="!item.hidden">
                <Submenu :name="item.name">
                    <template slot="title" name="a">
                        <Icon type="ios-navigate"></Icon>
                        {{item.name}}
                    </template>
                    <template v-for="child in item.children" v-if="!child.hidden">
                        <MenuItem :name="child.name">{{child.nameCN}}</MenuItem>
                    </template> 
                </Submenu>
            </template>
        </Menu>
    </Col>
</template>
<script>    
import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                theme2: 'light',
            }
        },
        computed: {
            ...mapGetters([
                'getPosition',
                'getGeneratedRouters'
             ]),  
        },
        watch:{
            getPosition(){
                this.$nextTick(function(){
                    this.$refs.menu.updateOpened();
                    this.$refs.menu.updateActiveName();
                });
            }
        },
        mounted() {
            // console.log(this.getGeneratedRouters)
        },
        methods: {
            turnUrl(names) {
                // 在右侧显示相应页面
                this.$router.push({
                    name: names
                });
            },
        }
    }
</script>

<style scoped>
    
</style>