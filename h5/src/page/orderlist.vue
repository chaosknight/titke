<template>
  <div>

  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="学校名称">
      <el-select v-model="formInline.schoolname" placeholder="请选择学校名称" multiple allow-create>
        <el-option
        v-for="item in schools"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-form-item >
        <el-date-picker type="date" placeholder="选择日期" v-model="formInline.startdate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-form-item >
        <el-date-picker type="date" placeholder="选择日期" v-model="formInline.enddate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table
    v-loading.body="loading"
    :data="orderlist"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="学校名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="总金额">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
  export default {
    data() {
      return {
        loading:false,
        orderlist: [],
        formInline: {
          schoolname: '',
          startdate: '',
          enddate:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
