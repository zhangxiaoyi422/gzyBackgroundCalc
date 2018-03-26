<template>
    <div class="index">
        <div class="viewport">
            <HeaderNav></HeaderNav>
            <div class="main-wrapper clearfix">
                <MenuList></MenuList>
                <BreadCrumb></BreadCrumb>
                <div class="main-right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <FooterNav></FooterNav>
    </div>
</template>

<script>
    import HeaderNav from "../components/header";
    import FooterNav from "../components/footer"
    import MenuList from "../components/menuList"
    import BreadCrumb from "../components/breadCrumb"
    export default {
        name: 'index',
        components: {
            FooterNav,
            HeaderNav,
            MenuList,
            BreadCrumb
        },
    }
</script>

<style>
    .index {
        height: 100%
    }
</style>