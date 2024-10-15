<template>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="this.url"
      :data="this.postform"
      :limit="1"
      :http-request="uploadExcel"
      :on-exceed="handleExceed"
      :on-success="uploadFileSuccess"
      :auto-upload="false"
      :headers="headers"
    >
      <template #trigger>
        <el-button type="primary">上传多值参数文件</el-button>
      </template>
      <el-button class="ml-3"  @click="submitUpload">
        点击上传
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
            只允许上传一个文件,仅支持utf-8编码的txt
        </div>
      </template>
    </el-upload>
</template>
<script>
import { ref } from "vue"
import { genFileId } from "element-plus"
export default {
    props:{
        interfaceNum:{
            type:String
        },
        paramName:{
            type: String
        },
        
    },
    data () {
        return{
            url:"http://localhost:18080/interface/downloadFile",
            form:this.uploadform,
            interfacenum:this.interfaceNum,
            paramname:this.paramName,
            postform:{
                interfaceNum:"",
                paramName:""
            },
            headers:{
                responseType:'blob'
            }
        }
    },
    watch:{
        interfaceNum:{
            handler(newVal) {
                this.postform.interfaceNum = newVal;
            },
            immediate: true,
            deep: true
            },
            paramName:{
            handler(newVal) {
                this.postform.paramName = newVal;
            },
            immediate: true,
            deep: true
        }
    },
    methods:{
        handle(){
            console.log(this.form);
        },
        uploadFileSuccess (res) {
            console.log(res);
            const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });  
            const url = URL.createObjectURL(blob);  
            const link = document.createElement('a');
            link.href = url;
            link.download = "1.xlsx";
            // 插入a标签触发下载
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            link.remove();
        },
        uploadExcel (f) {
            let param = new FormData();
            param.append('file',f.file);
            param.append('interfaceNum',this.postform.interfaceNum);
            param.append('paramName',this.postform.paramName);
            console.log(param);
            this.$axios.post(this.url,param, { responseType: 'blob' })
            .then(response=>{
                f.onSuccess(response)
            })
            .catch(({err}) => {
                f.onError(err)
            })

        },
    },
    mounted(){
        this.postform.interfaceNum = this.interfacenum;
        this.postform.paramName = this.paramname;
    },
    setup() {
        const upload = ref();
        const handleExceed = (files) => {
            upload.value.clearFiles()
            const file = files[0]
            file.uid = genFileId()
            upload.value.handleStart(file)
        }
        const submitUpload = (url,paramName,interfaceNum) => {
            url = "http://localhost:18080/interface/downloadFile?paramName=" + paramName + "&interfaceNum=" + interfaceNum;
            upload.value.submit();
        }
       
        return{
            upload,submitUpload,handleExceed
        }
    }
}



</script>
  
<style lang="scss" scoped>
.ml-3{
  margin-left:10px;
  color:#409EFF;
  background-color:white;
  border:1px solid #409EFF;
}
</style>
