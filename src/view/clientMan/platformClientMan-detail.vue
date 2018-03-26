<template>
    <div class="detail-page">
        <form action="" method="post" id="form"></form>
        <div class="panel-title">
            用户信息
        </div>
        <div class="panel-word" v-if="resData.userType == '2'">
            <table>
                <tr>
                    <td width="10%">用户类型：</td>
                    <td width="30%">个人</td>
                    <td width="10%">&nbsp;</td>
                    <td width="30%">&nbsp;</td>
                </tr>
                <tr>
                    <td width="10%" style="vertical-align:top">头像：</td>
                    <td width="30%" class="user-img">
                        <img :src="resPhoto"/>
                        <span v-if="resData.audiState == '0'">未实名认证</span>
                        <span v-if="resData.audiState == '1'">已实名认证</span>
                    </td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td width="10%">用户名：</td>
                    <td width="30%">{{resData.userAccount}}</td>
                    <td width="10%">出生日期：</td>
                    <td width="30%">{{resData.birthdays}}</td>
                </tr>
                <tr>
                    <td>绑定手机号：</td>
                    <td>{{resData.userMobile}}</td>
                    <td>性别：</td>
                    <td>
                        <span v-if="resData.gender == '0'">女</span>
                        <span v-if="resData.gender == '1'">男</span>
                    </td>
                </tr>
                <tr>
                    <td>真实姓名：</td>
                    <td>{{resData.userRealName}}</td>
                    <td>电子邮箱：</td>
                    <td>{{resData.email}}</td>
                </tr>
                <tr>
                    <td>证件类型：</td>
                    <td>
                        <span v-if="resData.userIDType == '111'">身份证</span>
                        <span v-if="resData.userIDType == '122'">组织机构代码证</span>
                    </td>
                    <td>个人地址：</td>
                    <td>{{resData.userAddress}}</td>
                </tr>
                <tr>
                    <td>证件号码：</td>
                    <td>{{resData.userCard}}</td>
                    <td>详细地址：</td>
                    <td>{{resData.AddrDetail}}</td>
                </tr>
                <tr>
                    <td>注册来源：</td>
                    <td>
                        <span v-if="resData.registerResource == '1'">公证云网站</span>
                        <span v-if="resData.registerResource == '2'">公证云APP</span>
                        <span v-if="resData.registerResource == '3'">第三方网站</span>
                        <span v-if="resData.registerResource == '4'">微信城市服务</span>
                        <span v-if="resData.registerResource == '5'">weui版微信</span>
                        <span v-if="resData.registerResource == '6'">建行城市服务</span>
                        <span v-if="resData.registerResource == '7'">H5版本在线受理</span>
                        <span v-if="resData.registerResource == '8'">支付宝城市服务</span>
                        <span v-if="resData.registerResource == '9'">公证录音</span>
                        <span v-if="resData.registerResource == '10'">公证签约</span>
                        <span v-if="resData.registerResource == '11'">知识产权</span>
                        <span v-if="resData.registerResource == '12'">新浪</span>
                        <span v-if="resData.registerResource == '13'">旗舰店注册</span>
                        <span v-if="resData.registerResource == '-'">-</span>
                    </td>
                    <td>是否注销：</td>
                    <td>
                        <span v-if="resData.isDelete == '0'">未注销</span>
                        <span v-if="resData.isDelete == '1'">已注销</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="panel-word" v-if="resData.userType == '4'">
            <table>
                <tr>
                    <td width="10%">用户类型：</td>
                    <td width="30%">机构</td>
                    <td width="10%">&nbsp;</td>
                    <td width="30%">&nbsp;</td>
                </tr>
                <tr>
                    <td width="10%" style="vertical-align:top">头像：</td>
                    <td width="30%" class="user-img">
                        <img :src="resPhoto"/>                        
                        <span v-if="resData.audiState == '0'">未实名认证</span>
                        <span v-if="resData.audiState == '1'">已实名认证</span>
                    </td>
                    <td width="10%">&nbsp;</td>
                    <td width="30%">&nbsp;</td>
                </tr>
                <tr>
                    <td width="10%">用户名：</td>
                    <td width="30%">{{resData.userAccount}}</td>
                    <td width="10%">机构联系人：</td>
                    <td width="30%">{{resData.contact}}</td>
                </tr>
                <tr>
                    <td>机构名称：</td>
                    <td>{{resData.unitName}}</td>
                    <td>座机号：</td>
                    <td>{{resData.landlineTelephone}}</td>
                </tr>
                <tr>
                    <td>证件类型：</td>
                    <td>
                        <span v-if="resData.licenseType == '001'">营业执照</span>
                        <span v-if="resData.licenseType == '002'">生产执照</span>
                    </td>
                    <td>电子邮箱：</td>
                    <td>{{resData.email}}</td>
                </tr>
                <tr>
                    <td>证件号码：</td>
                    <td>{{resData.bussinessNum}}</td>
                    <td>机构地址：</td>
                    <td>{{resData.userAddress}}</td>
                </tr>
                <tr>
                    <td>注册来源：</td>
                    <td>
                        <span v-if="resData.registerResource == '1'">公证云网站</span>
                        <span v-if="resData.registerResource == '2'">公证云APP</span>
                        <span v-if="resData.registerResource == '3'">第三方网站</span>
                        <span v-if="resData.registerResource == '4'">微信城市服务</span>
                        <span v-if="resData.registerResource == '5'">weui版微信</span>
                        <span v-if="resData.registerResource == '6'">建行城市服务</span>
                        <span v-if="resData.registerResource == '7'">H5版本在线受理</span>
                        <span v-if="resData.registerResource == '8'">支付宝城市服务</span>
                        <span v-if="resData.registerResource == '9'">公证录音</span>
                        <span v-if="resData.registerResource == '10'">公证签约</span>
                        <span v-if="resData.registerResource == '11'">知识产权</span>
                        <span v-if="resData.registerResource == '12'">新浪</span>
                        <span v-if="resData.registerResource == '13'">旗舰店注册</span>
                        <span v-if="resData.registerResource == '-'">-</span>
                    </td>
                    <td>详细地址：</td>
                    <td>{{resData.AddrDetail}}</td>
                </tr>
                <tr>
                    <!-- 政府6和机构主账号0不显示账号状态 -->
                    <td v-if="resData.userType != '6' && resData.accountFlag != '0'">账号状态：</td>
                    <td v-if="resData.userType != '6' && resData.accountFlag != '0'">
                        <span v-if="resData.isDisable == '0'">启用</span>
                        <span v-if="resData.isDisable == '1'">冻结</span>
                        <span v-if="resData.isDisable == '2'">未激活</span>
                        <span v-if="resData.isDisable == '3'">禁用</span>
                    </td>
                    <td>是否注销：</td>
                    <td>
                        <span v-if="resData.isDelete == '0'">未注销</span>
                        <span v-if="resData.isDelete == '1'">已注销</span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="btn-wrapper" v-if="resData.audiState == '0' && resData.userType == '2' && this.$store.state.limitList.indexOf('6_1') >= 0 && resData.isDelete == '0'">
            <Button type="primary" @click="modifyPhone">修改手机号</Button>
            <Button type="primary" @click="cancelAccount">注销此账号</Button>
            <Button type="primary" @click="modifyRealName">修改真实姓名</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="resData.audiState == '1' && resData.userType == '2' && this.$store.state.limitList.indexOf('6_1') >= 0 && resData.isDelete == '0'">
            <Button type="primary" @click="cancelAccount('form')">注销此账号</Button>
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div class="btn-wrapper" v-if="resData.userType == '4' || this.$store.state.limitList.indexOf('6_1') < 0 || resData.isDelete == '1'">
            <Button type="primary" @click="returnToList">返回</Button>
        </div>
        <div>
            <div class="panel-title">
                日志
            </div>
            <div class="panel-word" v-if="!resData.operationArray">
                未有相关内容
            </div>
            <div class="panel-word clearfix" v-if="resData.operationArray">
                <ul v-for="item in resData.operationArray" style="margin-bottom:20px;border-bottom:1px dashed #ccc" class="clearfix">
                    <label style="float:left;width:20%">{{item.createDate}}</label>
                    <ul style="float:left;width:80%">
                        <template v-for="item2 in item.operation">
                            <li>{{item2}}</li>
                        </template>
                        <template v-for="item3 in item.filePath">
                            <li @click="showImg2(item3.name,item3.path)" style="cursor:pointer;margin-left:75px;position:relative;top:-30px">{{item3.name}}</li>
                        </template>
                    </ul>
                </ul>
            </div>
        </div>
        <Modal v-model="modifyPhoneBox" class-name="vertical-center-modal" title="修改手机号" @on-cancel="modifyPhoneBox_cancel('formModifyPhone')">
            <Form ref="formModifyPhone" :model="formModifyPhone" :rules="formRuleModifyPhone" class="clearfix" :label-width="180">
                <FormItem prop="mobileNum" label="新绑定手机号：">
                    <Input v-model="formModifyPhone.mobileNum" type="text" :maxlength="11" style="width:200px"></Input>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="modifyPhoneBox_ok('formModifyPhone')">确定</Button>
                <Button type="primary" @click="modifyPhoneBox_cancel('formModifyPhone')">取消</Button>
            </div>
        </Modal>
        <Modal v-model="modifyPhoneBox2" class-name="vertical-center-modal" title="修改手机号" @on-cancel="modifyPhoneBox2_cancel">
            <Form class="clearfix" :label-width="180">
                <FormItem label="新绑定手机号：">
                    {{mobileNum}}
                </FormItem> 
                <FormItem label="上传凭证：" required>
                    <Upload 
                        ref="upload"
                        multiple
                        :format="['bmp','jpg','jpeg','png','tiff','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','pdf','txt','docx','doc']"
                        :on-format-error="handleFormatError"
                        :max-size="5120"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        :on-preview="showImg"
                        :on-remove="removeImg"
                        action="/api/file/upload.action">
                        <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
                    </Upload>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="modifyPhoneBox2_ok">确定</Button>
                <Button type="primary" @click="modifyPhoneBox2_cancel">取消</Button>
            </div>
        </Modal>
        <Modal v-model="modifyNameBox" class-name="vertical-center-modal" title="修改真实姓名" @on-cancel="modifyNameBox_cancel('formModifyName')">
            <Form ref="formModifyName" :model="formModifyName" :rules="formRuleModifyName" class="clearfix" :label-width="180">
                <FormItem label="原真实姓名：">
                    {{resData.userRealName}}
                </FormItem> 
                <FormItem label="真实姓名：" prop="name" required>
                    <Input v-model="formModifyName.name" type="text" :maxlength="10" style="width:200px"></Input>                    
                </FormItem> 
                <FormItem label="上传凭证：" required>
                    <Upload 
                        ref="upload_name"
                        multiple
                        :format="['bmp','jpg','jpeg','png','tiff','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','pdf','txt','docx','doc']"
                        :on-format-error="handleFormatError"
                        :max-size="5120"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload2"
                        :on-preview="showImg"
                        :on-remove="removeImg"
                        action="/api/file/upload.action">
                        <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
                    </Upload>
                </FormItem>                
            </Form>
            <div slot="footer">
                <Button type="primary" @click="modifyNameBox_ok('formModifyName')">确定</Button>
                <Button type="primary" @click="modifyNameBox_cancel('formModifyName')">取消</Button>
            </div>
        </Modal>
        <Modal v-model="showImgBox" title="图片预览"  class-name="vertical-center-modal">
            <!-- <iframe :src="'/api/file/viewArchive.action?filePath=' + filePath " style="width: 100%"></iframe> -->
            <img :src="'/api/file/viewArchive.action?filePath=' + filePath " style="width: 100%"/>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  computed: {
    basePath() {
      return this.$store.state.basePath;
    },
    resPhoto() {
      return (
        this.basePath +
        "customer/ajax/checkUserPhoto.action?id=" +
        this.$route.params.id
      );
      // return this.basePath + 'customer/ajax/checkUserPhoto.action?id=' + '402882456035521a01603554e2240003'
    },
    basePath_download(){
        return this.$store.state.basePath + 'file/download.action'
    },
    basePath_preview(){
        return this.$store.state.basePath + 'file/viewArchive.action'
    },
  },
  data() {
    const validateFormRuleModifyPhone = (rule, value, callback) => {
      if (this.formModifyPhone.mobileNum.replace(/ /g, "") == "") {
        callback(new Error("请输入"));
      }
      if (this.formModifyPhone.mobileNum.indexOf(" ") >= 0) {
        callback(new Error("格式错误"));
      }
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/; 
    //   let reg = /^1\d{10}$/;
      if (reg.test(this.formModifyPhone.mobileNum) == false) {
        callback(new Error("格式错误"));
      }
      callback();
    };
    const validateFormRuleModifyName = (rule, value, callback) => {
      if (this.formModifyName.name.replace(/ /g, "") == "") {
        callback(new Error("请输入"));
      }
      if (this.formModifyName.name.indexOf(" ") >= 0) {
        callback(new Error("格式错误"));
      }
      callback();
    };
    return {
      modifyPhoneBox: false,
      formModifyPhone: {
        mobileNum: ""
      },
      formRuleModifyPhone: {
        mobileNum: [{ validator: validateFormRuleModifyPhone, trigger: "blur" }]
      },
      mobileNum: "",
      modifyPhoneBox2: false,
      showImgBox: false,
      filePath: "",
      uploadList: [],
      resData: {},
      modifyNameBox: false,
      formModifyName: {
        name: ""
      },
      formRuleModifyName: {
        name: [{ validator: validateFormRuleModifyName, trigger: "blur" }]
      },
      uploadList_name: []
    };
  },
  methods: {
    // 获取表格数据
    getData() {
      console.log(this.$route.params.id);
      this.$http
        .post(
          "/customer/ajax/detail.action",
          this.qs.stringify({
            id: this.$route.params.id
          })
        )
        .then(response => {
            console.log(response);
          if (response.data.code == 200) {
            this.resData = response.data.data;
            // this.resData.operationArray.replace('br的原串','')
            // this.resData.operationArray = '</br>'
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 修改手机号
    modifyPhone(name) {
      this.modifyPhoneBox = true;
    },
    // 修改手机号-确定按钮
    modifyPhoneBox_ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.mobileNum = this.formModifyPhone.mobileNum;
          this.modifyPhoneBox = false;
          console.log(this.resData.userType);
          console.log(this.formModifyPhone.mobileNum);
          this.$http
            .post(
              "/customer/ajax/checkMobileOld.action",
              this.qs.stringify({
                userType: this.resData.userType,
                mobileNum: this.formModifyPhone.mobileNum
              })
            )
            .then(response => {
              console.log(response);
              // 手机号码已被注册
              if (response.data.code == 10001) {
                this.$Modal.warning({
                  // className:'vertical-center-modal',居中的方法还没找到
                  title: "修改手机号",
                  content:
                    "<p>新绑定手机号：" +
                    this.formModifyPhone.mobileNum +
                    "</br>已被其他用户绑定，无法修改！</p>",
                  okText: "确定",
                  cancelText: "",
                  onOk: () => {},
                  onCancel: () => {}
                });
                // 手机号码未注册
              } else if (response.data.code == 200) {
                this.modifyPhoneBox2 = true;
              }
              this.$refs[name].resetFields();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    // 修改手机号-取消按钮
    modifyPhoneBox_cancel(name) {
      this.modifyPhoneBox = false;
      this.$refs[name].resetFields();
    },
    // 修改手机号2-确定按钮
    modifyPhoneBox2_ok() {
      if (this.uploadList.length == 0) {
        if ($(".ivu-message-notice-content").length == 0) {
          this.$Message.error({
            content: "请上传凭证",
            duration: 1
          });
        }
      } else {
        console.log(this.uploadList);
        let fileName = [];
        let path = [];
        for (let i = 0; i < this.uploadList.length; i++) {
          fileName.push(this.uploadList[i].name + "?|");
          path.push(this.uploadList[i].response.filePath[0] + ";");
        }
        console.log(String(fileName).replace(/,/g, ""));
        fileName = String(fileName).replace(/,/g, "");
        console.log(String(path).replace(/,/g, ""));
        path = String(path).replace(/,/g, "");
        this.$http
          .post(
            "/customer/ajax/updateMobile.action",
            this.qs.stringify({
              id: this.$route.params.id,
              mobileNum: this.mobileNum,
              fileName: fileName,
              path: path
            })
          )
          .then(response => {
            console.log(response);
            if (response.data.code == 200) {
              this.modifyPhoneBox2 = false;
              this.$refs["upload"].clearFiles();
              this.uploadList = this.$refs.upload.fileList;
              this.getData();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 修改手机号2-取消按钮
    modifyPhoneBox2_cancel() {
      this.modifyPhoneBox2 = false;
      for (let i = 0; i < this.uploadList.length; i++) {
        this.$http
          .get("/file/delFile.action", {
            params: {
              path: String(this.uploadList[i].response.filePath[0])
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.$refs["upload"].clearFiles();
      this.uploadList = this.$refs.upload.fileList;
    },
    // 格式错误处理
    handleFormatError() {
      this.$Message.error({
        content:
          "文件格式错误，只支持所有图片格式、PDF文件、Word文档、TXT文本文件",
        duration: 3
      });
    },
    // 文件太大处理
    handleMaxSize() {
      if ($(".ivu-message-notice-content").length == 0) {
        this.$Message.error({
          content: "文件太大，不能超过5M",
          duration: 3
        });
      }
    },
    // 最多只能上传10个文件
    handleBeforeUpload() {
      console.log(this.uploadList);
      const check = this.uploadList.length < 10;
      if (!check) {
        if ($(".ivu-message-notice-content").length == 0) {
          this.$Message.error({
            content: "最多只能上传10个文件",
            duration: 1
          });
        } else {
          return;
        }
      }
      return check;
    },
    // 最多只能上传10个文件
    handleBeforeUpload2() {
      console.log(this.uploadList_name);
      const check = this.uploadList_name.length < 10;
      if (!check) {
        if ($(".ivu-message-notice-content").length == 0) {
          this.$Message.error({
            content: "最多只能上传10个文件",
            duration: 1
          });
        } else {
          return;
        }
      }
      return check;
    },
    // 图片预览
    showImg(file) {
      let imgExt = new Array(
        ".bmp",
        ".jpg",
        ".jpeg",
        ".png",
        ".tiff",
        ".gif",
        ".pcx",
        ".tga",
        ".exif",
        ".fpx",
        ".svg",
        ".psd",
        ".cdr",
        ".pcd",
        ".dxf",
        ".ufo",
        ".eps",
        ".ai",
        ".raw"
      ); //图片文件的后缀名
      let fileName = file.name.toLowerCase();
      let i = fileName.lastIndexOf(".");
      let ext = "";
      if (i > -1) {
        ext = fileName.substring(i);
      }
      if (imgExt.indexOf(ext) >= 0) {
        console.log("是图片");
        console.log(String(file.response.filePath));
        this.filePath = file.response.filePath;
        this.showImgBox = true;
      } else {
        console.log("不是图片");
      }
    },
    // // 图片预览
    // showImg2(name, path) {
    //   let imgExt = new Array(
    //     ".bmp",
    //     ".jpg",
    //     ".jpeg",
    //     ".png",
    //     ".tiff",
    //     ".gif",
    //     ".pcx",
    //     ".tga",
    //     ".exif",
    //     ".fpx",
    //     ".svg",
    //     ".psd",
    //     ".cdr",
    //     ".pcd",
    //     ".dxf",
    //     ".ufo",
    //     ".eps",
    //     ".ai",
    //     ".raw"
    //   ); //图片文件的后缀名
    //   let fileName = name.toLowerCase();
    //   let i = fileName.lastIndexOf(".");
    //   let ext = "";
    //   if (i > -1) {
    //     ext = fileName.substring(i);
    //   }
    //   if (imgExt.indexOf(ext) >= 0) {
    //     console.log("是图片");
    //     this.filePath = path;
    //     this.showImgBox = true;
    //   } else {
    //     console.log("不是图片");
    //   }
    // },
    // 图片预览
    showImg2(name,path){
        let imgExt = new Array('.bmp','.jpg','.jpeg','.png','.tiff','.gif','.pcx','.tga','.exif','.fpx','.svg','.psd','.cdr','.pcd','.dxf','.ufo','.eps','.ai','.raw');//图片文件的后缀名
        let fileName = name.toLowerCase();
        let i = fileName.lastIndexOf(".");
        let ext = ''
        if(i > -1){
            ext = fileName.substring(i);
        }
        // 是图片则预览
        if(imgExt.indexOf(ext) >= 0){
            console.log('是图片')
            console.log(path)
            this.filePath = path
            this.showImgBox = true
            // 不是图片则下载查看
        }else{
            console.log('不是图片')
            name = this.charTurn(name)         
            if(ext == '.docx' || ext == '.doc'){
                console.log('是word ，下载')
                this.$http.get('/file/download.action', {params:{
                    filePath: path,
                    fileName: name
                }}).then(response => {
                    console.log(response)
                    this.url =  this.basePath_download + '?filePath=' + path + '&fileName=' + name
                    $('#form').attr({'action':this.url})
                    $('#form').submit()          
                }).catch(error => {
                    console.log(error)
                })
            }else{console.log('预览')
                this.$http.get('/file/viewArchive.action', {params:{
                    filePath: path,
                }}).then(response => {
                    console.log(response)
                    this.url =  this.basePath_preview + '?filePath=' + path 
                    $('#form').attr({'action':this.url})
                    $('#form').submit()          
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    },
    // 删除上传文件
    removeImg(file) {
      console.log(file.response.filePath);
      this.$http
        .get("/file/delFile.action", {
          params: {
            path: String(file.response.filePath)
          }
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 注销此账号
    cancelAccount() {
      this.$Modal.confirm({
        title: "注销提醒",
        content: "<p>注销账号为不可逆操作，注销后，此账号将无法再使用！</p>",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.$http
            .post(
              "/customer/ajax/cancelAccount.action",
              this.qs.stringify({
                id: this.$route.params.id
              })
            )
            .then(response => {
              console.log(response);
              this.getData();
            })
            .catch(error => {
              console.log(error);
            });
        },
        onCancel: () => {}
      });
    },
    // 修改真实姓名
    modifyRealName() {
      this.modifyNameBox = true;
    },
    // 修改真实姓名 - 确定按钮
    modifyNameBox_ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.uploadList_name.length == 0) {
            if ($(".ivu-message-notice-content").length == 0) {
              this.$Message.error({
                content: "请上传凭证",
                duration: 1
              });
            }
          } else {
            let fileName = [];
            let path = [];
            for (let i = 0; i < this.uploadList_name.length; i++) {
              fileName.push(this.uploadList_name[i].name + "?|");
              path.push(this.uploadList_name[i].response.filePath[0] + ";");
            }
            console.log(String(fileName).replace(/,/g, ""));
            fileName = String(fileName).replace(/,/g, "");
            console.log(String(path).replace(/,/g, ""));
            path = String(path).replace(/,/g, "");

            this.$http
              .post(
                "/customer/ajax/updateRealName.action",
                this.qs.stringify({
                  id: this.$route.params.id,
                  newRealname: this.formModifyName.name,
                  oldRealname: this.resData.userRealName,
                  fileName: fileName,
                  path: path
                })
              )
              .then(response => {
                console.log(response);
                if (response.data.code == 200) {
                  this.modifyNameBox = false;
                  this.$refs["formModifyName"].resetFields();
                  this.$refs["upload_name"].clearFiles();
                  this.uploadList_name = this.$refs.upload_name.fileList;
                  this.getData();
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      });
    },
    // 修改真实姓名 - 取消按钮
    modifyNameBox_cancel() {
      this.modifyNameBox = false;
      for (let i = 0; i < this.uploadList_name.length; i++) {
        this.$http
          .get("/file/delFile.action", {
            params: {
              path: String(this.uploadList_name[i].response.filePath[0])
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
      this.$refs["formModifyName"].resetFields();
      this.$refs["upload_name"].clearFiles();
      this.uploadList_name = this.$refs.upload_name.fileList;
    },
    // 返回列表
    returnToList() {
      this.$router.push({
        name: "PlatformClientMan"
      });
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
    this.uploadList_name = this.$refs.upload_name.fileList;
    this.$store.commit("SET_POSITION", {
      primaryNavigation: "客户管理",
      subNavigation: "平台客户管理",
      thirdNavigation: "详情",
      name: "PlatformClientMan",
      second: true,
      third: true
    });
    this.getData();
    console.log(this.resPhoto);
  }
};
</script>

<style scoped>
.user-img img {
  height: 150px;
  width: 150px;
  background: #ccc;
  overflow: hidden;
}
.user-img span {
  display: block;
  width: 150px;
  margin: 5px 0;
  text-align: center;
}
</style>

