//转义字符转换成普通字符
function charTurn(str) {
    // var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
    // return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
    return str.replace(/\&/g,'&amp');
}
export default charTurn
