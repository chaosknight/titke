<template>
  <div class="wrapper">
    <header class="no-print"></header>
    <el-row class="container">
      <el-col :span="4" class="menu no-print">
        <el-menu   style="height:100%;"  :router="true" :default-active="active">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>订单</template>
              <el-menu-item index="/order_new">新建</el-menu-item>
              <el-menu-item index="/order_list">查询</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-setting"></i>设置</template>
              <el-menu-item index="/setting_default">默认信息</el-menu-item>
              <el-menu-item index="/setting_sug">提示管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props:{
    active:String
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.wrapper {
    /*//position: absolute;*/
}
.container, .wrapper {
    height: 100%;
}
.container {
    padding-top: 80px;
}
.wrapper {
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
