<template>
  <div id="app" class="wrapper">
    <header></header>
    <el-row class="container">
      <el-col :span="4" class="menu">
        <el-menu   style="height:100%;"  @open="handleOpen" @close="handleClose" :router="true">
          <el-submenu index="orer">
            <template slot="title"><i class="el-icon-message"></i>订单</template>
              <el-menu-item index="order_new">新建</el-menu-item>
              <el-menu-item index="order_list">查询</el-menu-item>
          </el-submenu>
          <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-setting"></i>设置</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.wrapper {
    position: relative;
}
.container, .wrapper {
    height: 100%;
}
.container {
    padding-top: 80px;
}
#app {
  font-family: Helvetica, sans-serif;
  width: 100%;
  height: 100%;
}
header{
height: 80px;
position: absolute;
width: 100%;
top: 0;
left: 0;
padding: 0 20px;
z-index: 100;
box-sizing: border-box;
background-color: rgb(32, 160, 255);
}
.menu{
  height: 100%;
}
.content {
    padding: 25px;
}
</style>
