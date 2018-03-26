// 计算menu高度
function calcMenuHeight(){
    setTimeout(function(){
        let winH = $(window).height();//console.log('winH' + winH)
        let docH = $(document).height();//console.log('docH' + docH)
        let menuLeftHeight = 0;
        if(winH > docH){
            menuLeftHeight = winH - $('.headerNav').height() - $('.footerNav').height() - 2;
            $('.ivu-menu-light').eq(0).css('min-height', menuLeftHeight);//console.log(1111)
        }else{
            menuLeftHeight = docH - $('.headerNav').height() - $('.footerNav').height() - 2;
            $('.ivu-menu-light').eq(0).css('min-height', menuLeftHeight);//console.log(2222)
        }
    },0);//页面加载完在计算menuList高度
    // this.$nextTick(function(){
    //     console.log(123)
    // })
}

export function closeThisBox(){
    $(this).remove()
}

export default calcMenuHeight