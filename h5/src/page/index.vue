<template>
  <layout active="/order_new">
    <el-row >
      <el-button-group class="butns">
      <el-button type="primary" icon="plus" @click="addcol">添加商品</el-button>
      <el-button type="primary" icon="document" @click="pringcick">打印</el-button>
      <el-button type="primary" icon="upload" @click="save">保存</el-button>
    </el-button-group>
  </el-row>
    <el-form ref="form" :model="order" label-width="0px">
      <el-form-item label="" style="width:200px; margin:22px auto;"
      prop="complaty"
      :rules="[
      { required: true, message: '公司名称不能为空'}
      ]"
      >
        <el-autocomplete
          v-model="order.complaty"
          :fetch-suggestions="querySearchAsynccomplay"
          placeholder="公司名称"
        ></el-autocomplete>
      </el-form-item>
      <el-row class="mb_20">
        <el-col :span="8">
          <el-form-item
          prop="school"
          :rules="[
          { required: true, message: '购货单位不能为空'}
          ]"
          >

          <el-autocomplete
            v-model="order.school"
            :fetch-suggestions="querySearchAsyncschool"
            placeholder="购货单位"
          ></el-autocomplete>
          </el-form-item>
    </el-col>
    <el-col :span="8">
      <el-form-item
      prop="date"
      :rules="[
      { required: true, message: '日期不能为空'}
      ]"
      >
    <el-date-picker
  v-model="order.date"
  align="right"
  type="date"
  placeholder="选择日期">
</el-date-picker>
</el-form-item>
</el-col>
<el-col :span="8">
  <el-input v-model="order.note" placeholder="备注"></el-input>
</el-col>
    </el-row>

    </el-form>


      <el-row >

      </el-row>

    <el-table
    v-loading.fullscreen.lock="fullscreenLoading"
    :data="order.items"
    highlight-current-row
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
        fullscreenLoading:false,
        order:{
          complaty:"",
          school:"",
          date:'',
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
       this.$refs['form'].validate((valid) => {
         if (valid) {
           var newitems = [];
           var items = this.order.items
           if(items.length > 0 ) {
             for(var i=0;i<items.length;i++) {
               if(items[i].name && items[i].number && items[i].price && items[i].unit) {
                 newitems.push(items[i])
               }
             }
           }
           this.order.items = newitems;
           this.fullscreenLoading = true;
            this.$http.post('/api/saveorder',this.order).then((res)=>{
              var data = res.data;
              this.fullscreenLoading = false;
              this.$message({
               message: '保存成功',
               type: 'success'
             });
            });
         } else {
           return false;
         }
       });
     },
     initorder(){
       if(this.$route.params.id) {
          this.$http.get('/api/getorder/' + this.$route.params.id).then((res)=>{
            if(res.data.value) {
              this.order = res.data.value;
            }
          });
       }
     },
     pringcick(){
       this.$refs['form'].validate((valid) => {
         if (valid) {
           alert('submit!');
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     }
    },
    mounted() {
      this.initorder();
    }
  }
</script>
