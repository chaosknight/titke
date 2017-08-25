<style>
.print_c .el-table{
  font-size: 0.02mm;
}
.print_c .el-table .cell, .el-table th>div{
  padding-left: 0;
  padding-right: 0;
}
@page {
  size: A4;
  margin: 0;
}
@media print {
  html, body {
    width: 210mm;
    height: 297mm;
  }
  /* ... the rest of the rules ... */
}
</style>
<template>
  <div style="width:200mm;margin:0 auto;" class="print_c page">
    <el-table
    :data="order.items"
    border
    style="width: 50%;float:left;"
    >
    <el-table-column
      prop="name"
      label="商品名称"
      align="center"
      width="50%">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位"
      align="center"
      width="50mm">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      align="center"
      width="50mm">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      align="center"
      width="50mm">
    </el-table-column>
    <el-table-column
      label="金额"
      align="center"
      width="60mm">
      <template scope="scope">
        {{scope.row.number*scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注"
      align="center"
      >
    </el-table-column>
  </el-table>
  <el-table
  :data="order.items"
  border
  style="width: 50%;float:left;"
  >
  <el-table-column
    prop="name"
    label="商品名称"
    align="center"
    width="50%">
  </el-table-column>
  <el-table-column
    prop="unit"
    label="单位"
    align="center"
    width="50mm">
  </el-table-column>
  <el-table-column
    prop="price"
    label="单价"
    align="center"
    width="50mm">
  </el-table-column>
  <el-table-column
    prop="number"
    label="数量"
    align="center"
    width="50mm">
  </el-table-column>
  <el-table-column
    label="金额"
    align="center"
    width="60mm">
    <template scope="scope">
      {{scope.row.number*scope.row.price}}
    </template>
  </el-table-column>
  <el-table-column
    prop="note"
    label="备注"
    align="center"
    >
  </el-table-column>
</el-table>
  </div>
</template>
<script>
export default {
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
    initorder(){
      if(this.$route.params.id) {
         this.$http.get('/api/getorder/' + this.$route.params.id).then((res)=>{
           if(res.data.value) {}
           this.order = res.data.value;
         });
      }
    }
   },
   mounted() {
     this.initorder();
   }
}
</script>
