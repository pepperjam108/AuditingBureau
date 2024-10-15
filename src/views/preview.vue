<template>
  <div class="form_wrap">
<!--    <p v-for="item in formlist">-->
<!--      {{item}}-->
<!--    </p>-->
    <el-form>


        <el-form-item :label="item.label"  v-for="item in forparams">
          <el-row :gutter="5">
            <el-input v-model="item.value" :key="item.prop"
                      :disabled="item.value!=null || this.paramform.param =='' ? false : true"
                      @input="HandlerChange(item)"
            >
            </el-input>
          </el-row>
        </el-form-item>


<!--        <el-col :span="8">-->
<!--            <el-input-->
<!--                v-model="searchform.agent_code"-->
<!--                placeholder=""-->
<!--                :disabled="this.paramform.param == null || this.searchform[index] !='' ? false : true"-->
<!--                @input="handlerChange"-->
<!--            >-->
<!--            </el-input>-->

<!--        </el-col>-->
<!--        <el-col :span="10">-->
<!--          <upload :interfaceNum="0" paramName="record_name" v-on:showdatachildren="showdatafromChild" v-on:showfieldschildren="showfiledsfromChild"></upload>-->
<!--        </el-col>-->
<!--        &lt;!&ndash; <el-col :span="5">-->
<!--          <upload_second :interfaceNum="0" paramName="record_name"></upload_second>-->
<!--        </el-col> &ndash;&gt;-->
<!--        <el-col :span="5">-->
<!--          <UpLoad_Second :interfaceNum="0" paramName="record_name"></UpLoad_Second>-->
<!--        </el-col>-->
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
import {getCurrentInstance, reactive, ref} from "vue";
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
        assist_public_no:"",
        cert_no:"",
        pri_code:"",
        pled_alt_no:"",
        taxpayer_id:"",
        brand_name:"",
        corpor_name:"",
        uni_scid:"",
        legal_idcard_no:"",
        uniscid:"",
        lerep_sign:"",
        pled_regi_no:"",
        pri_regi_no:"",
        quafc_name:"",
        rand_regi_no:"",
        exece:"",
        busi_regi_no:"",
        data_up_status:"",
        pri_type_name:"",
        ent_name:"",
        record_name:"",
        branch_org_name:"",
        ent_regi_no:"",
        reg_no:"",
        partner_name:"",
        executored_id:"",
        pri_name:"",
        op_name:"",
        legal_certi_no:"",
        quafc_no:"",
        stockhr_name:"",
        pripid_code:"",
        record_no:"",
        regi_no:"",
        lic_no:"",
        legal_name:"",
        agent_code:"",
        org_no:"",
        main_pers_name:"",
        idcard_no:"",
      },
      formlist :[
        "assist_public_no",
        "cert_no",
        "pri_code",
        "pled_alt_no",
        "taxpayer_id",
        "brand_name",
        "corpor_name",
        "uni_scid",
        "legal_idcard_no",
        "uniscid",
        "lerep_sign",
        "pled_regi_no",
        "pri_regi_no",
        "quafc_name",
        "rand_regi_no",
        "exece",
        "busi_regi_no",
        "data_up_status",
        "pri_type_name",
        "ent_name",
        "record_name",
        "branch_org_name",
        "ent_regi_no",
        "reg_no",
        "partner_name",
        "executored_id",
        "pri_name",
        "op_name",
        "legal_certi_no",
        "quafc_no",
        "stockhr_name",
        "pripid_code",
        "record_no",
        "regi_no",
        "lic_no",
        "legal_name",
        "agent_code",
        "org_no",
        "main_pers_name",
        "idcard_no",
      ],
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
    let forparams = reactive([]);
    onMounted(() => {
      $axios
          .get(config.baseurl + "/interface/getParams", {
          })
          .then((response) => {
            console.log(response.data);
            if (response.data.code == 0) {
              for(let item of response.data.data)
              {
                forparams.push({
                  prop:item.prop,
                  label:item.label,
                  value:""
                })
              }
              // forparams = response.data.data;
              console.log(forparams)
              // console.log(typeof (forparams))
            }
          })
          .catch((err) => {
            console.log(err);
          });


      const prams = {
        param:"1",
        paramName:"assist_public_no"
      }
      $axios
          .get(config.baseurl + "/interface/getTablesByParam", {
            params: prams
          })
          .then((response) => {
            // console.log(response.data);
            if (response.data.code == 0) {
              // showdata.value = response.data.data;
              let data = response.data.data;
              // console.log(data)
            }
          })
          .catch((err) => {
            console.log(err);
          });
    });

    const HandlerChange = (item) => {
      console.log(item);
      forparams.forEach( (item)=> {

      })
    }
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
      showfiledsfromChild,
      forparams,
      HandlerChange
    };
  },
};
</script>
