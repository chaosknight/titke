<template>
  <div>
    <el-table
    :data="order.items"
    border
    style="width: 105mm;margin:0 auto;"
    >
    <el-table-column
      prop="name"
      label="商品名称"
      width="40mm">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位"
      width="50mm">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="45mm">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="45">
    </el-table-column>
    <el-table-column
      label="金额"
      width="55">
      <template scope="scope">
        {{scope.row.number*scope.row.price}}
      </template>
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注"
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
