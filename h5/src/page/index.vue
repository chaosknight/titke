<template>
  <div>




    <div class="title">
      {{order.complaty}}
    </div>
    <el-row >
  <el-button-group class="butns">
      <el-button type="primary" icon="plus" @click="addcol">添加商品</el-button>
      <el-button type="primary" icon="document">打印</el-button>
      <el-button type="primary" icon="upload">保存</el-button>
      <el-button type="primary" icon="delete">删除</el-button>
    </el-button-group>
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

  </div>
</template>
<style scoped>
  .title{
    text-align: center;
    padding-bottom: 20px;
    font-size: 20px;
  }
  .butns{
    margin-bottom: 20px;
    float: right;
  }
  .inline-input input{
    border: none;
    border-radius: 0;
  }
</style>
<script>
  export default {
    data() {
      return {
        order:{
          complaty:"公司名称",
          school:"学校名称",
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
      }
    },
    mounted() {

    }
  }
</script>
