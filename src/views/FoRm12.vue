<template>
  <div class="form_wrap">
    <el-form :model="searchform">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="法人名称">
            <el-input
              v-model="searchform.corpor_name"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.corpor_name !='' ? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload :interfaceNum="11" paramName="corpor_name" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="11" paramName="corpor_name"></upload_second>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="法定代表人身份号码">
            <el-input
              v-model="searchform.idcard_no"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.idcard_no !='' ? false : true"
              @input="handlerChange"
              aria-disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="11" paramName="idcard_no" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="11" paramName="idcard_no"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="法定负责人">
            <el-input
              v-model="searchform.legal_name"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.legal_name !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="11" paramName="legal_name" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="11" paramName="legal_name"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="主体类型名称">
            <el-input
              v-model="searchform.pri_type_name"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.pri_type_name !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="11" paramName="pri_type_name" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="11" paramName="pri_type_name"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="统一社会信用代码">
            <el-input
              v-model="searchform.uniscid"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.uniscid !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="11" paramName="uniscid" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="11" paramName="uniscid"></upload_second>
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
  padding: 10px;
  justify-content: center;
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
        corpor_name: "",
        idcard_no: "",
        legal_name: "",
        pri_type_name: "",
        uniscid: "",
      },
      uploadform: {
        paramName:"",
        interfaceNum:""
      },
      paramform: {
        param: null,
        paramName: "",
        interfaceNum: 11,
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
            this.paramform.paramName = key;
            this.doawloadurl = BaseUrl+"/interface/downloadParam?param="+this.searchform[key]+"&interfaceNum=11&paramName="+key;
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
        interfaceNum: 11
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
