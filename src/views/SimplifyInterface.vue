<script lang="ts" setup>
import { getCurrentInstance,onMounted, ref } from 'vue'
import config from "../config/config";
const BaseUrl=config.baseurl;
const currentInstance = getCurrentInstance();
const { $axios } = currentInstance.appContext.config.globalProperties;
interface RestaurantItem {
  value: string
}
  let hashmap=new Map();
  const pageSize=ref()
  const total=ref()
  const pageIndex=ref(1)
  const tablelist=ref([])
  const input1 = ref('')
  const input2=ref('')
  const ParamsField=ref([])
  const tablefields=ref(null)
  const tabledatas=ref(null)
  const GetParams=()=>{
    $axios
        .get(config.baseurl + "/interface/getParams")
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 0) {
            ParamsField.value = response.data.data;
            console.log(ParamsField.value);
          }
          for(let i=0;i<ParamsField.value.length;i++){
            restaurants.value.push({"value":ParamsField.value[i].label});
            hashmap.set(ParamsField.value[i].label,ParamsField.value[i].prop);
          }
          console.log(hashmap);
        })
  }
  const restaurants = ref<RestaurantItem[]>([])
  const querySearch = (queryString, cb) => {
    const results = queryString
        ? restaurants.value.filter(createFilter(queryString))
        : restaurants.value
    cb(results)
  }
  const createFilter = (queryString) => {
    return (restaurant) => {
      return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }
const handleCurrentChange=(page)=>{
  pageIndex.value=page;
  let index=pageIndex.value-1;
  tabledatas.value=tablelist.value[index].data;
  tablefields.value=tablelist.value[index].fields;
  pageSize.value=tabledatas.value.length;
}
const GetTables=()=>{
  console.log(hashmap.get(input1.value));
  $axios
      .get(config.baseurl + "/interface/getTablesByParam",{params:{paramName:hashmap.get(input1.value),param:input2.value}})
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 0) {
          tablelist.value=response.data.data;
          console.log(tablelist.value);
          let index=pageIndex.value-1;
          tabledatas.value=tablelist.value[index].data;
          pageSize.value=tabledatas.value.length;
          let t=0;
          for(let i=0;i<tablelist.value.length;i++){
          t=t+tablelist.value[i].data.length;
          }
          total.value=t;
          tablefields.value=tablelist.value[index].fields;
          console.log(tabledatas.value);
          console.log(tablefields.value);
          console.log(pageSize.value);
          console.log(total.value);
          console.log(index);
        }
      })
}
  const handleSelect = (item) => {
    console.log(item)
  }

  onMounted(() => {
    GetParams();
  })
</script>

<template>
  <div style="margin :10px">
  <el-form-item label="请输入可选参数" style="margin-left: 10px" >
      <el-autocomplete style="margin-left: 10px"
          v-model="input1"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="选择可选参数名称"
          @select="handleSelect"
      />
    <el-input v-model="input2" style="width: 240px;margin-left:10px" placeholder="输入可选参数值" />
    <el-button type="primary" style="margin-left: 100px" @click="GetTables">"点击查询"</el-button>
  </el-form-item>
  </div>
<el-card style="height: auto;">
  <el-table
      :data="tabledatas"
      style="width: 100%;margin-top: 10px;"  border height="550px">
    <el-table-column
        v-for="(field,index) in tablefields"
        :key="index"
        :prop="field.prop"
        :label="field.label"
        min-width="180">
    </el-table-column>
  </el-table>
</el-card>

  <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[pageSize]"
      :small="small"
      :disabled="disabled"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
</template>

<style scoped lang="scss">

</style>