<template>
  <div id="app" class="wrapper">
    <header></header>
    <el-row class="container">
      <el-col :span="4" class="menu">
        <el-menu default-active="1-1"  style="height:100%;">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
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
  position: absolute;
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
