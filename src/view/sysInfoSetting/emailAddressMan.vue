<template>
    <div>
        <div class="fun-tool">新增/修改地址信息：</div>
        <Form ref="form" :model="form" :rules="ruleCustom" label-position="right" :label-width="120">
            <FormItem label="收件人：" prop="name">
                <Input v-model="form.name" style="width:260px" placeholder="输入发票的快递收件人" :maxlength="20"></Input>
            </FormItem>
            <FormItem label="所在地区：" prop="provinceCode">
                <Select v-model="form.provinceCodeDefault" placeholder="请选择省份" style="width:260px" @on-change="selectChangeProvince" :label-in-value="true">
                    <Option v-for="item in form.provinceCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem prop="cityCode">
                <Select v-model="form.cityCodeDefault" placeholder="请选择城市" style="width:260px" @on-change="selectChangeCity" :label-in-value="true">
                    <Option v-for="item in form.cityCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
             <FormItem prop="areaCode">
                <Select v-model="form.areaCodeDefault" placeholder="请选择区县" style="width:260px" @on-change="selectChangeArea" :label-in-value="true">
                    <Option v-for="item in form.areaCode" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="详细地址：" prop="detailAddress">
                <Input v-model="form.detailAddress" style="width:260px" placeholder="输入收货详细地址" :maxlength="60"></Input>
            </FormItem>
            <FormItem label="邮政编码：" prop="zipCode">
                <Input v-model="form.zipCode" style="width:260px" placeholder="输入邮政编码" :maxlength="6"></Input>
            </FormItem>
            <FormItem label="电话/手机：" prop="phone">
                <Input v-model="form.phone" style="width:260px" placeholder="输入联系电话或手机号" :maxlength="20"></Input>
            </FormItem>
            <FormItem prop="setDefaultAddress">
                <Checkbox v-model="form.setDefaultAddress">设为默认地址</Checkbox>
            </FormItem>
        </Form>    
        <div class="btn-wrapper"> 
            <Button type="primary" @click="save('form')">保存</Button>
        </div>
        <div class="fun-tool border-top" v-if="resData.totalCount">
            已保存了 {{resData.totalCount}} 条地址信息
        </div>
        <Table :columns="columns1" :data="tableData1" :loading="loading"></Table>
    </div>
</template>

<script>
    export default {
        data() {
            const validateName = (rule, value, callback) => {
                if (this.form.name.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.name.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateProvinceCode = (rule, value, callback) => {
                if (this.form.provinceCodeDefault == '') {
                    callback(new Error('请选择'))
                }
                callback()
            };
            const validateCityCode = (rule, value, callback) => {
                if (this.form.cityCodeDefault == '') {
                    callback(new Error('请选择'))
                }
                callback()
            };
            const validateAreaCode = (rule, value, callback) => {
                if (this.form.areaCodeDefault == '') {
                    callback(new Error('请选择'))
                }
                callback()
            };
            const validateDetailAddress = (rule, value, callback) => {
                if (this.form.detailAddress.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                if (this.form.detailAddress.indexOf(' ') >= 0) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validateZipCode = (rule, value, callback) => {
                if (this.form.zipCode.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9]+$/
                if (reg.test(this.form.zipCode) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            const validatePhone = (rule, value, callback) => {
                if (this.form.phone.replace(/ /g, "") == '') {
                    callback(new Error('请输入'))
                }
                let reg = /^[0-9]+$/
                if (reg.test(this.form.phone) == false) {
                    callback(new Error('格式错误'));
                }
                callback()
            };
            return {
                ruleCustom: {
                    name: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    provinceCode: [
                        { required: true, validator: validateProvinceCode, trigger: 'change' }
                    ],
                    cityCode: [
                        { required: true, validator: validateCityCode, trigger: 'change' }
                    ],
                    areaCode: [
                        { required: true, validator: validateAreaCode, trigger: 'change' }
                    ],
                    detailAddress: [
                        { required: true, validator: validateDetailAddress, trigger: 'blur' }
                    ],
                    zipCode: [
                        { required: true, validator: validateZipCode, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                },
                loading:false,
                resData:{},
                form:{
                    name:'',
                    provinceCode: [],
                    provinceCodeDefault: '',
                    cityCode: [],
                    cityCodeDefault: '',
                    areaCode: [],
                    areaCodeDefault: '',
                    detailAddress:'',
                    zipCode:'',
                    phone:'',
                    setDefaultAddress:false,
                    regionNameProvince:'',
                    regionNameCity:'',
                    regionNameArea:'',
                    addressId:''
                },
                columns1: [
                    {
                        title: '收件人',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '所在地区',
                        key: 'regionName',
                        align: 'center',
                    },
                    {
                        title: '详细地址',
                        key: 'detailAddress',
                        align: 'center',
                    },
                    {
                        title: '邮政编码',
                        key: 'zipCode',
                        align: 'center',
                    },
                    {
                        title: '电话/手机',
                        key: 'phone',
                        align: 'center',
                    },
                    {
                        title: '操作',
                        width : 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params.row.addressId,params.row.name,params.row.provinceCode,params.row.cityCode,params.row.areaCode,params.row.detailAddress,params.row.zipCode,params.row.phone,params.row.isDefault)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.row.addressId)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    },
                    {
                        title: ' ',
                        key: 'isDefault',
                        align: 'center',
                        render: (h, params) => {
                            switch (params.row.isDefault) {
                            // case '0':
                            //     return h('span', '非默认');break
                            case '1':
                                return h('span', '默认');break
                            }
                        }
                    },
                ],
                tableData1: []
            }
        },
        methods:{
            save(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let _this = this
                        $.each(_this.form.provinceCode, function(key, val) {
                            if(_this.form.provinceCodeDefault == val.value){
                                _this.form.regionNameProvince = val.label
                            }
                        })
                        $.each(_this.form.cityCode, function(key, val) {
                            if(_this.form.cityCodeDefault == val.value){
                                _this.form.regionNameCity = val.label
                            }
                        })
                        $.each(_this.form.areaCode, function(key, val) {
                            if(_this.form.areaCodeDefault == val.value){
                                _this.form.regionNameArea = val.label
                            }
                        })
                        let regionName = this.form.regionNameProvince + this.form.regionNameCity + this.form.regionNameArea
                        if(regionName.indexOf('-') >= 0){
                            regionName = regionName.replace('-', '') 
                        }
                        this.$http.post('/express/ajax/saveOrUpdateExpressAddressManager.action', this.qs.stringify({
                            addressId: this.form.addressId,
                            name: this.form.name,
                            provinceCode: this.form.provinceCodeDefault,
                            cityCode: this.form.cityCodeDefault,
                            areaCode: this.form.areaCodeDefault,
                            regionName: regionName,
                            detailAddress: this.form.detailAddress,
                            zipCode: this.form.zipCode,
                            phone: this.form.phone,
                            isDefault: this.form.setDefaultAddress
                        })).then(response => {
                            console.log(response)
                            if (response.status == 200) { 
                                if($('.ivu-message-notice-content').length == 0){
                                    this.$Message.success({
                                        content: "保存成功",
                                        duration: 1,
                                        onClose: () => {
                                            this.$refs[name].resetFields()
                                            this.form.addressId = ''
                                            this.loadAddressData()
                                            this.getTableDate()
                                        }
                                    })
                                }
                            }
                        }).catch(error => {
                            console.log(error);
                        }) 
                    }
                })
            },
            // 修改
            modify(addressId,name,provinceCode,cityCode,areaCode,detailAddress,zipCode,phone,isDefault){
                this.form.addressId = addressId
                this.form.name = name
                this.form.provinceCodeDefault = provinceCode
                this.form.cityCodeDefault = cityCode
                this.form.areaCodeDefault = areaCode
                this.form.detailAddress = detailAddress
                this.form.zipCode = zipCode 
                this.form.phone = phone
                if(isDefault == '0'){
                    isDefault = false
                }else{
                    isDefault = true
                }
                this.form.setDefaultAddress = isDefault
                this.$refs['form'].validate()
            },
            // 删除
            delete(addressId){
                this.$Modal.confirm({
                    title: '删除提示',
                    content: '<p>确定删除该地址信息？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.$http.get('/express/ajax/delExpressAddressManager.action', {params:{
                            addressId: addressId,
                        }}).then(response => {
                            console.log(response)
                            if (response.data.code == 200) {
                                if($('.ivu-message-notice-content').length == 0){
                                    this.$Message.success({
                                        content: "删除成功",
                                        duration: 1,
                                        onClose: () => {
                                            if(addressId == this.form.addressId){
                                                this.form.addressId = ''
                                                this.form.name = ''
                                                this.form.provinceCodeDefault = ''
                                                this.form.cityCodeDefault = ''
                                                this.form.areaCodeDefault = ''
                                                this.form.detailAddress = ''
                                                this.form.zipCode = '' 
                                                this.form.phone = ''
                                                this.form.setDefaultAddress = false
                                                this.loadAddressData()
                                                this.$refs['form'].resetFields()
                                            }
                                            this.getTableDate()
                                        }
                                    })
                                }
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    },
                    onCancel: () => {}
                })
            },
            // 加载地区
            loadAddressData(){
                this.$http.get('/settlement/ajax/queryCity.action', {params:{
                    condition: '98',
                }}).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.form.provinceCode = response.data.data.provinceList
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 切换
            selectChangeProvince(value){
                this.$http.get('/settlement/ajax/queryCity.action', {params:{
                    id: this.form.provinceCodeDefault,
                }}).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.form.cityCode = response.data.data.areaList 
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 切换
            selectChangeCity(value){
                this.$http.get('/settlement/ajax/queryCity.action', {params:{
                    id: this.form.cityCodeDefault,
                }}).then(response => {
                    console.log(response)
                    if (response.status == 200) { 
                        this.form.areaCode = response.data.data.areaList      
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 切换地区
            selectChangeArea(value){
                this.form.regionNameArea = value.label 
            },
            // 获得所有邮寄地址
            getTableDate(){
                this.$http.get('/express/ajax/findAllAddressManagers.action').then(response => {
                    if (response.data.code == 200) {
                        console.log(response)
                        this.resData =  response.data.data
                        this.tableData1 = response.data.data.list
                        this.totalCount = Number(response.data.data.total)
                    }
                }).catch(error => {
                    console.log(error);
                })       
            }
        },
        mounted() {
            this.$store.commit('SET_POSITION', {
                primaryNavigation: '系统信息设置',
                subNavigation: '邮寄地址管理',
                name: 'EmailAddressMan',
                second: true,
            });
            this.getTableDate()
            this.loadAddressData()
        },
    }
</script>

<style scoped>
</style>