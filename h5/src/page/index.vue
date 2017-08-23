<template>
  <layout active="order_new">
    <el-row >
      <el-button-group class="butns">
      <el-button type="primary" icon="plus" @click="addcol">添加商品</el-button>
      <el-button type="primary" icon="document">打印</el-button>
      <el-button type="primary" icon="upload" @click="save">保存</el-button>
      <el-button type="primary" icon="delete">删除</el-button>
    </el-button-group>
  </el-row>
    <el-form ref="form" :model="order" label-width="0px">
      <el-form-item label="" style="text-align:center;">
        <el-autocomplete
          v-model="order.complaty"
          :fetch-suggestions="querySearchAsynccomplay"
          placeholder="公司名称"
        ></el-autocomplete>
      </el-form-item>
      <el-row class="mb_20">
        <el-col :span="12">
          <el-autocomplete
            v-model="order.school"
            :fetch-suggestions="querySearchAsyncschool"
            placeholder="学校"
          ></el-autocomplete>
    </el-col>
    <el-col :span="12">
    <el-date-picker
  v-model="order.date"
  align="right"
  type="date"
  placeholder="选择日期" style="float:right;">
</el-date-picker>
</el-col>
    </el-row>

    </el-form>


      <el-row >

      </el-row>

    <el-table
    :data="order.items"
    :summary-method="getSummaries"
    show-summary
    border
    style="width: 100%"
    >
    <el-table-column
      label="商品名称"
      width="150">
      <template scope="scope">
        <el-autocomplete
      class="inline-input"
      :fetch-suggestions="querySearchAsyncproduct"
      v-model="scope.row.name"
      placeholder="商品名称"
    ></el-autocomplete>
      </template>
    </el-table-column>
    <el-table-column
      label="单位"
      width="120">
      <template scope="scope">
        <el-autocomplete
      class="inline-input"
      v-model="scope.row.unit"
      :fetch-suggestions="querySearchAsyncunit"
      placeholder="单位"
    ></el-autocomplete>
      </template>
    </el-table-column>
    <el-table-column
      label="单价"
      width="120">
      <template scope="scope">
        <el-input
        class="inline-input"
        placeholder="单价"
        v-model="scope.row.price">
      </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="120">
      <template scope="scope">
        <el-input
        class="inline-input"
        placeholder="数量"
        v-model="scope.row.number">
      </el-input>
      </template>
    </el-table-column>
    <el-table-column
      label="金额"
      width="150">
      <template scope="scope">
        {{scope.row.number*scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      >
      <template scope="scope">
        <el-input
        class="inline-input"
        placeholder=""
        v-model="scope.row.note">
      </el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
     <template scope="scope">
       <el-button
         size="small"
         type="danger"
         icon="delete"
         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
     </template>
   </el-table-column>
  </el-table>
  </layout>
</template>
<style>
.mb_20{
  margin-bottom: 20px;
}
  .title{
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
  }
  .butns{
    margin-bottom: 20px;
  }
  .inline-input input{
    border: none;
    border-radius: 0;
  }
</style>
<script>
import layout from '../components/layout.vue'
  export default {
    components :{layout},
    data() {
      return {
        order:{
          complaty:"",
          school:"",
          date:'',
          time:0,
          items:[
          ],
          total:0
        }
      };
    },
    methods: {
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if(index !=4) {
            sums[index] = '';
            return;
          }


          var titol = 0;
          data.forEach((obj)=>{
            console.log(obj);
            titol = titol + obj.number * obj.price
          });
          this.order.total = titol;
          sums[index] = '' + titol + ' 元';
          return '';
        });

        return sums;
      },
      addcol(){
        this.order.items.push({
            name:'',
            number:0,
            price:0,
            unit:'',
            note:''
        });
      },
      handleDelete(index, rows) {
        //console.log(this.order)
        this.order.items.splice(index, 1);
      },
      querySearchAsynccomplay(queryString, cb){
        this.$http.get('/api/allcompany').then((res)=>{
          var data = res.data;
          cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
        });
      },
      querySearchAsyncschool(queryString, cb){
        this.$http.get('/api/allschool').then((res)=>{
          var data = res.data;
          cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
        });
      },
      querySearchAsyncproduct(queryString, cb){
        this.$http.get('/api/allproduct').then((res)=>{
          var data = res.data;
          cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
        });
      },
      querySearchAsyncunit(queryString, cb){
        this.$http.get('/api/allunit').then((res)=>{
          var data = res.data;
          cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
        });
      },
      createStateFilter(queryString) {
       return (state) => {
         return (state.value.indexOf(queryString.toLowerCase()) === 0);
       };
     },
     save(){
       this.$http.post('/api/saveorder',this.order).then((res)=>{
         var data = res.data;
         console.log(data)
       });
     }
    },
    mounted() {

    }
  }
</script>
