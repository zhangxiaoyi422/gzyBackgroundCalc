<template>
    <div class="menuList">
        <Menu ref="menu" :active-name="getPosition.secondName?getPosition.secondName:getPosition.name" width="auto" :open-names="[(getPosition.primaryNavigation=='消息列表')?'':getPosition.primaryNavigation]" @on-select="turnUrl">
            <template v-for="item in getGeneratedRouters" v-if="!item.hidden">
                <template v-if="item.children && item.children.length">
                    <Submenu :name="item.name">
                        <template slot="title" name="a">
                            <Icon type="ios-navigate"></Icon>
                            {{item.name}}
                        </template>
                        <template v-for="child in item.children" v-if="child.children && child.children.length">
                            <Submenu :name="child.name">
                                <template slot="title" name="b">
                                    <Icon type="ios-navigate"></Icon>
                                    {{child.nameCN}}
                                </template>
                                <template v-for="child_child in child.children" v-if="!child_child.hidden">
                                
                                    <MenuItem :name="child_child.name">{{child_child.nameCN}}</MenuItem>
                                </template> 
                            </Submenu>
                        </template> 
                        <template v-else>
                            <MenuItem :name="child.name" v-if="!child.hidden">{{child.nameCN}}</MenuItem>
                        </template>
                    </Submenu>
                </template>
            </template>
        </Menu>
    </div>
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
            turnUrl(name) {
                // 在右侧显示相应页面
                this.$router.push({
                    name: name
                });
            },
        }
    }
</script>

<style scoped>
    
</style>