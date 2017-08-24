<template>
  <layout active="/order_list">

  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="学校名称">
      <el-select v-model="formInline.schoolname" placeholder="请选择学校名称" allow-create clearable>
        <el-option
        v-for="item in schools"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-form-item >
        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="formInline.startdate" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-form-item >
        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="formInline.enddate" style="width: 100%;"></el-date-picker>
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
      prop="school"
      label="学校名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="total"
      label="总金额">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button  type="text" size="small" @click="handleview(scope.$index)">查看</el-button>
        <el-button type="text" size="small" @click="handleedit(scope.$index)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</layout>
</template>
<script>
import layout from '../components/layout.vue'
  export default {
    components: { layout },
    data() {
      return {
        loading:false,
        orderlist: [],
        tital:0,
        schools:[],
        formInline: {
          schoolname: '',
          startdate: '',
          enddate:''
        }
      }
    },
    mounted(){
      this.getAllschool();
    },
    methods: {
      getAllschool(){
        this.$http.get('/api/allschool').then((res)=>{
          var data = res.data;
          if(data) {
            this.schools = data;
          }
        });
      },
      onSubmit() {
        this.$http.post('/api/order_query',this.formInline).then((res)=>{
          this.orderlist = res.data.list || [];
          this.tital = res.data.tital || 0;
        });
      },
      handleedit(index){
        this.$router.push("/order_edit/" + this.orderlist[index].ctime);
      },
      handleview(index){
        this.$router.push("/order_view/" + this.orderlist[index].ctime);
      }
    }
  }
</script>
