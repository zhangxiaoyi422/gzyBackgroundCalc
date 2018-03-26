//对象深拷贝
function deepClone(initalObj) {
    let obj = {};
    obj = JSON.parse(JSON.stringify(initalObj));
    return obj;
}
export default deepClone

// function getStartDate(name) {     console.log('abcdegf')     return
// this.$refs[name]._data.currentValue; }

// export default getStartDate