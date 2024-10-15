<template>
  <div class="form_wrap">
    <el-form :model="searchform">
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="备案名称">
            <el-input
              v-model="searchform.record_name"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.record_name !='' ? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload :interfaceNum="0" paramName="record_name" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="0" paramName="record_name"></upload_second>
        </el-col> -->
        <el-col :span="5">
          <UpLoad_Second :interfaceNum="0" paramName="record_name"></UpLoad_Second>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="备案号">
            <el-input
              v-model="searchform.record_no"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.record_no !='' ? false : true"
              @input="handlerChange"
              aria-disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="0" paramName="record_no" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="0" paramName="record_no"></upload_second>
        </el-col> -->
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="统一社会信用码">
            <el-input
              v-model="searchform.uni_scid"
              placeholder=""
              :disabled="this.paramform.param == null || this.searchform.uni_scid !=''? false : true"
              @input="handlerChange"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <upload  :interfaceNum="0" paramName="uni_scid" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>
        </el-col>
        <!-- <el-col :span="5">
          <upload_second :interfaceNum="0" paramName="uni_scid"></upload_second>
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
  margin: 0;
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
import upload_second from "../components/UpLoad_Second.vue";
import { ElCol } from "element-plus";
import { onMounted } from "vue";
const BaseUrl=config.baseurl;
export default {
  name: "FoRm15",
  components:{
    upload_second,
    upload,
    ElCol,
},
  data() {
    return {
      searchform: {
        record_name: "",
        record_no: "",
        uni_scid: "",
      },
      uploadform: {
        paramName:"",
        interfaceNum:""
      },
      paramform: {
        param: null,
        paramName: "",
        interfaceNum: 0,
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
            this.doawloadurl = BaseUrl+"/interface/downloadParam?param="+this.searchform[key]+"&interfaceNum=0&paramName="+key;
            this.paramform.paramName = key;
          }
        })
      } else {
        this.paramform.param = null;
      }
    },
    downloadfile(){
      const currentInstance = getCurrentInstance();
      const { $axios } = currentInstance.appContext.config.globalProperties;
      $axios.post(BaseUrl + '/interface/downloadFile',{responseType:'blob'})
      .then(response =>{
        const url = window.URL.createobjectURL(new Blob([response.data]))
        const link =  document.createElement('a');
        link.href = url;
        link.setAttribute('download','file.excel');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error =>{
        console.error(error);
      })
    }
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
        paramName: "uni_scid",
        interfaceNum: 0
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
