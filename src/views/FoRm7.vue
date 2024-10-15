<template>
  <div class="form_wrap">
    <el-form :model="searchform">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="协助公示通知书文号">
            <el-input
              v-model="searchform.assist_public_no"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.assist_public_no !='' ? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload :interfaceNum="6" paramName="assist_public_no" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="6" paramName="assist_public_no"></upload_second>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="股权冻结被执行人信息ID">
            <el-input
              v-model="searchform.executored_id"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.executored_id !='' ? false : true"
              @input="handlerChange"
              aria-disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="6" paramName="executored_id" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="6" paramName="executored_id"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="主体身份代码">
            <el-input
              v-model="searchform.pripid_code"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.pripid_code !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="6" paramName="pripid_code" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="6" paramName="pripid_code"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="工商注册号">
            <el-input
              v-model="searchform.reg_no"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.reg_no !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="6" paramName="reg_no" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="6" paramName="reg_no"></upload_second>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="统一社会信用代码">
            <el-input
              v-model="searchform.uniscid"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.uniscid !=''? false : true"
              @input="handlerChange"
              ref="uniscid"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload :interfaceNum="6" paramName="uniscid" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="6" paramName="uniscid"></upload_second>
        </el-col> -->
      </el-row>

      <el-row :gutter="10">
        <el-col style="display: flex; align-self: center; margin-left: 40%" span="10">
          <el-button type="primary" @click="HandleSearch(paramform)">查询按钮</el-button>
        </el-col>
        <!-- <div style="text-align: left; margin-right: 10%">文件上传
          <upload  :interfaceNum="14" paramName="uniscid"></upload>
        </div> -->
        <el-button type="primary" @click="HandleDownload(this.doawloadurl)">下载文件</el-button>
      </el-row>
      
    </el-form>
    <el-card style="height: auto;">
      <el-table :data="showdata" style="width: 100%;margin-top: 10px;"  border height="500px">
        <el-table-column
          v-for="(field, index) in showfield"
          :key="index"
          :label="field.label"
          :prop="field.prop"
          border
          min-width="300%"
        >
      </el-table-column>
      </el-table>

    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.form_wrap {
  justify-content: center;
  padding: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.22);
}
</style>
<script>
import { getCurrentInstance, ref } from "vue";
// import addclass from "@/assets/jquery";
import config from "../config/config";
import upload from "../components/UpLoad.vue";
import upload_second from "../components/UpLoad_Second.vue"
import { ElCol } from "element-plus";
import { onMounted } from "vue";
const BaseUrl=config.baseurl;
export default {
  name: "FoRm15",
  components:{
    upload_second,
    upload,
    ElCol
},
  data() {
    return {
      searchform: {
        assist_public_no: "",
        executored_id: "",
        pripid_code: "",
        reg_no: "",
        uniscid: "",
      },
      uploadform: {
        paramName:"",
        interfaceNum:""
      },
      paramform: {
        param: null,
        paramName: "",
        interfaceNum: 6,
      },
      doawloadurl: ""
    };
  },
  methods: {
    handlerChange(e) {
      if (e) {
        this.paramform.param = e;
        Object.keys(this.searchform).forEach(key=>{
          if(this.searchform[key] != ""){
            this.doawloadurl = BaseUrl+"/interface/downloadParam?param="+this.searchform[key]+"&interfaceNum=6&paramName="+key;
            this.paramform.paramName = key;
          }
        })
      } else {
        this.paramform.param = null;
      }
    },
    // showfiledsfromChild(data){
    //   // console.log(data);
    //   this.showfield.value = data;
    //   console.log(this.showfield.value);
    // },
    // showdatafromChild(data){
    //   // console.log(data);
    //   this.showdata.value = data;
    //   console.log(this.showdata.value);
    // }
  },
  setup() {
    const currentInstance = getCurrentInstance();
    const { $axios } = currentInstance.appContext.config.globalProperties;
    const showdata = ref(null);
    const showfield = ref(null);
    const uniscid = ref(null);
    onMounted(() => {
      const param =  {
        param: 1,
        paramName: "uniscid",
        interfaceNum: 6
        };
      $axios
          .get(config.baseurl + "/interface/forwarderParam", {
            params: param,
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.code == 0) {
              // showdata.value = response.data.data;
              showfield.value = response.data.fields;
              console.log(showdata.value);
            }
          })
          .catch((err) => {
            console.log(err);
            console.log(param);
          });
    });
    const HandleSearch = (param) => {
      $axios
        .get(config.baseurl + "/interface/forwarderParam", {
          params: param,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 0) {
            showdata.value = response.data.data;
            showfield.value = response.data.fields;
            console.log(showdata.value);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(param);
        });
    };
    const HandleDownload = (url) => {
      window.open(url);
    };
    const showfiledsfromChild = (data)=>{
      console.log(data);
      showfield.value = data;
      // console.log(showfield.value);
    };
    const showdatafromChild = (data) =>{
      console.log(data);
      showdata.value = data;
      // console.log(showdata.value);
    }
    return {
      HandleDownload,
      HandleSearch,
      showdata,
      showfield,
      uniscid,
      showdatafromChild,
      showfiledsfromChild
    };
  },
};
</script>
