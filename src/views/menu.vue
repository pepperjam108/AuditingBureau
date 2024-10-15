<template>
  <div>
    <el-row style="width: 100%;justify-content: center;
    align-items: center;
    display: flex; background-color: #535bf2;
"
    >
    <div class="banner">
    <h3>武汉市审计局轻应用</h3>
    </div>

    </el-row>
    <el-container class="layout-container-demo" style="height: 750px">
      <el-scrollbar>
        <el-aside >
            <el-menu
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#409EFF"
              :router="true"
              :default-active="$route.path">
              <el-sub-menu index="1">
                <template #title>
                  <span>资源库</span>
                </template>
<!--                <el-menu-item-group title="Group One">-->
<!--                  <el-menu-item index="1-1">item one</el-menu-item>-->
<!--                  <el-menu-item index="1-2">item two</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--                <el-menu-item-group title="Group Two">-->
<!--                  <el-menu-item index="1-3">item three</el-menu-item>-->
<!--                </el-menu-item-group>-->
                <el-sub-menu index="1-1">
                  <template #title>本地资源</template>
                </el-sub-menu>
                <el-sub-menu index="1-2">
                  <template #title>外部资源</template>
                  <el-menu-item :index="'/'+menu.id" v-for="menu in menulist" :key="menu.id">
                    <span>{{ menu.id }}&rAarr;{{ " "+menu.authName}}</span>
                  </el-menu-item>
                </el-sub-menu>
              </el-sub-menu>


            </el-menu>
        </el-aside>
      </el-scrollbar>
      <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "MeNu",
  data() {
    return {};
  },
  setup() {
    let menulist = ref(null);
    menulist.value = [
      {
        id: 1,
        authName: "法人基础库备案基本信息",
      },
      {
        id: 2,
        authName: "法人基础库变更信息",
      },
      {
        id: 3,
        authName: "法人基础库撤销信息",
      },
      {
        id: 4,
        authName: "法人基础库吊销信息",
      },
      {
        id: 5,
        authName: "法人基础库分支信息",
      },
      {
        id: 6,
        authName: "法人基础库个体工商户基本信息",
      },
      {
        id: 7,
        authName: "法人基础库股东冻结被执行人信息",
      },
      {
        id: 8,
        authName: "法人基础库股东名录",
      },
      {
        id: 9,
        authName: "法人基础库股权出质变更信息",
      },
      {
        id: 10,
        authName: "法人基础库股权出质信息",
      },
      {
        id: 11,
        authName: "法人基础库股权冻结信息",
      },
      {
        id: 12,
        authName: "法人基础库基本登记信息",
      },
      {
        id: 13,
        authName: "法人基础库隶属关系",
      },
      {
        id: 14,
        authName: "法人基础库企业和个体工商户基本信息",
      },
      {
        id: 15,
        authName: "法人基础库企业基础信息",
      },
      {
        id: 16,
        authName: "法人基础库欠税处理信息",
      },
      {
        id: 17,
        authName: "法人基础库清税证明",
      },
      {
        id: 18,
        authName: "法人基础库商标信息",
      },
      {
        id: 19,
        authName: "法人基础库许可变更记录",
      },
      {
        id: 20,
        authName: "法人基础库许可基本信息",
      },
      {
        id: 21,
        authName: "法人基础库主要人员",
      },
      {
        id: 22,
        authName: "法人基础库注销税务登记信息",
      },
      {
        id: 23,
        authName: "-法人基础库注销信息",
      },
      {
        id: 24,
        authName: "法人基础库资质基本信息",
      },
      {
        id:25,
        authName:"精简接口",
      }
    ];
    return {
      menulist,
    };
  },
};
</script>
<style lang="scss" scoped>



.el-aside{
  background-color: #7D8E98;
  transition: width 0.15s;
  -webkit-transition: width 0.20s;
  -moz-transition: width 0.20s;
  -o-transition: width 0.20s;
  .el-menu{
    border-right: none;
  }
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-main{
  background-color: #bce8f1;
  width: 66%;
  --el-main-padding: none;
}

.layout-container-demo{
  height: 100%;
  width: 100%;
}

.banner{

}
</style>
