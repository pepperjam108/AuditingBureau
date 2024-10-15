<template>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="url"
      :data="postform"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="uploadFileSuccess"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button type="primary">上传文件</el-button>
      </template>
      <el-button class="ml-3"  @click="submitUpload">
        点击上传
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
            只允许上传一个文件,仅支持utf-8编码的txt
        </div>
      </template>
    </el-upload>
</template>
<script>
import { ref } from "vue"
import { genFileId } from "element-plus"
import config    from '../config/config.js'
export default {
    props:{
        interfaceNum:{
            type:String
        },
        paramName:{
            type:String
        },
    },
    data () {
        return{
            url:config.baseurl+"/interface/forwarderFile",
            interfacenum:this.interfaceNum,
            paramname:this.paramName,
            postform:{
                interfaceNum:"",
                paramName:""
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
        uploadFileSuccess(res){
            this.$emit('showdatachildren',res.data);
            this.$emit('showfieldschildren',res.fields);
        }
    },
    mounted(){
        console.log(this.url)
        this.postform.interfaceNum = this.interfacenum;
        this.postform.paramName = this.paramname;
    },
    setup() {
        const upload = ref();
        const handleExceed = (files) => {
            console.log(url)
            upload.value.clearFiles()
            const file = files[0]
            file.uid = genFileId()
            upload.value.handleStart(file)
        }

        const submitUpload = () => {
            upload.value.submit()
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