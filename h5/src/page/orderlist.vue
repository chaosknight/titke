<template>
  <layout active="/order_list" class="page">

  <el-form :inline="false" :model="formInline" label-width="80px" class="demo-form-inline no-print">
    <el-form-item label="购货单位">
      <el-select v-model="formInline.schoolname" placeholder="请选择购货单位" allow-create clearable>
        <el-option
        v-for="item in allschools"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-form-item >
        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="formInline.startdate" ></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-form-item >
        <el-date-picker type="date" :editable="false" placeholder="选择日期" v-model="formInline.enddate" ></el-date-picker>
      </el-form-item>
    </el-form-item>
    <el-form-item label="备注">
      <el-select v-model="formInline.note" placeholder="备注" allow-create clearable multiple >
        <el-option
        v-for="item in allnotes"
        :key="item.value"
        :label="item.value"
        :value="item.value">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <el-tabs type="border-card" class="no-print">
  <el-tab-pane label="订单视图" >
    <el-table
      v-loading.fullscreen.lock="loading"
      :data="orderlist"
      :summary-method="getSummaries2"
      show-summary
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-table
          border
          :summary-method="getSummaries"
          show-summary
          :data="props.row.items"
          >
          <el-table-column
            prop="name"
            label="商品名称">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位">
          </el-table-column>
          <el-table-column
            prop="price"
            label="单价">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="number"
            label="金额">
            <template scope="scope">
              {{accMul(scope.row.price , scope.row.number)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注">
          </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间">
        <template scope="scope">
          {{scope.row.date|formatDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="school"
        label="学校名称">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总金额">
        <template scope="scope">
          {{gettotal(scope.row.items)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button  type="info" :plain="true" size="small" @click="handleview(scope.$index)">打印</el-button>
          <el-button type="info" :plain="true" size="small" @click="handleedit(scope.$index)">编辑</el-button>
          <el-button type="danger" :plain="true" size="small" @click="handledel(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane label="汇总视图">
    <el-button type="primary" @click="onprint" style="margin-bottom:20px;">打印汇总</el-button>
    <el-table
    border
    :summary-method="getSummaries"
    show-summary
    :data="huizonglist"
    >
    <el-table-column
      prop="name"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="单位">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="number"
      label="金额">
      <template scope="scope">
        {{accMul(scope.row.price , scope.row.number)}}
      </template>
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注">
    </el-table-column>
    </el-table>
  </el-tab-pane>
</el-tabs>
<el-table
border
:summary-method="getSummaries"
style="width: 100%"
class="only-for-print"
show-summary
fit="true"
:data="huizonglist"
>
<el-table-column
  prop="name"
  label="商品名称">
</el-table-column>
<el-table-column
  prop="unit"
  label="单位">
</el-table-column>
<el-table-column
  prop="price"
  label="单价">
</el-table-column>
<el-table-column
  prop="number"
  label="数量">
</el-table-column>
<el-table-column
  prop="number"
  label="金额">
  <template scope="scope">
    {{accMul(scope.row.price , scope.row.number)}}
  </template>
</el-table-column>
<el-table-column
  prop="note"
  label="备注">
</el-table-column>
</el-table>
</layout>
</template>
<script>
import layout from '../components/layout.vue'
import { mapGetters } from 'vuex';
import {formatDate} from '../date.js';
  export default {
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    },
    components: { layout },
    data() {
      return {
        loading:false,
        orderlist: [],
        tital:0,
        currentPage:1,
        formInline: {
          schoolname: '',
          startdate: '',
          enddate:'',
          note:[]
        }
      }
    },
    mounted(){
    },
    computed: {
      huizonglist:function() {
        var list = [];
        for(var i=0;i<this.orderlist.length;i++) {
          list = list.concat(this.orderlist[i].items)
        }

        var sortfuc = function(a,b,keys) {
          if(keys.length > 0) {
            var key = keys.shift();
            if(a[key] < b[key]) {
              return 1;
            } else if(a[key] > b[key]) {
              return -1;
            } else {
              return sortfuc(a,b,keys)
            }
          } else {
            return 0;
          }
        }



        list.sort(function(a,b){
            return sortfuc(a,b,['name','unit','price'])});
            // return list;
        var result = [];

        for(var j=0;j<list.length;j++) {
          var fitem = JSON.parse(JSON.stringify(list[j]))
          if(result.length == 0) {
            result.push(fitem)
          } else {
            var item = result[result.length - 1]
            if(fitem.name == item.name && fitem.unit == item.unit && fitem.price == item.price) {
              item.number = this.accAdd(item.number,fitem.number)
            } else {
              result.push(fitem)
            }

          }

        }

        return result;
      },

      ...mapGetters({
          complayname: 'getdcomplayname',
          dunit: 'getdunit',
          allschools:'getAllschools',
          allpnames:'getAllpnames',
          allcompanys:'getAllcompanys',
          allunits:'getAllunits',
          allnotes:'getAllnotes'
      })
    },
    methods: {
      accMul (arg1,arg2){
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
      },
      accAdd(arg1,arg2){
          var r1,r2,m;
          try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
          try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
          m=Math.pow(10,Math.max(r1,r2))
          return (arg1*m+arg2*m)/m
      },
      handleCurrentChange(val){
        this.formInline.skip = (val - 1) * this.formInline.limit
        this.onSubmit();
      },
      handleSizeChange(val){
        this.formInline.limit = val;
      },
      onSubmit() {
        this.loading = true;
        this.$http.post('/api/order_query',this.formInline).then((res)=>{
          this.orderlist = res.data.list || [];
          this.loading = false;
        }).catch(() => {
          this.loading = false;
          this.$message({
            type: 'error',
            message: '操作失败'
          });
        });
      },
      handleedit(index){
        this.$router.push("/order_edit/" + this.orderlist[index]._id);
      },
      handledel(index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.loading = true;
         this.$http.get('/api/order_del/' + this.orderlist[index]._id).then((res)=>{
           this.loading = false;
           if(res.data.numRemoved) {
             this.orderlist.splice(index,1)
             this.$message({
               type: 'success',
               message: '删除成功!'
             });
           } else {
             this.$message({
               type: 'error',
               message: '删除失败'
             });
           }
         }).catch(() => {
           this.loading = false;
           this.$message({
             type: 'error',
             message: '删除失败'
           });
         });
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });
      },
      handleview(index){
        var frameId = "print_fid"
        var usedFrame = document.getElementById(frameId)
        if (usedFrame) {
          usedFrame.parentNode.removeChild(usedFrame)
        }

        var printFrame = document.createElement('iframe')
        printFrame.setAttribute('style', 'visibility: hidden;')
        printFrame.id = frameId;
        document.body.appendChild(printFrame);
        printFrame.src = "/#/order_view/" + this.orderlist[index]._id;

        //this.$router.push("/order_view/" + this.orderlist[index]._id);
      },

      gettotal(data) {
        var titol = 0;
        data.forEach((obj)=>{
          titol = this.accAdd(titol , this.accMul(obj.number , obj.price))
        });
        return titol;
      },
      getSummaries2(param) {
        const { columns, data } = param;
        console.log(data)
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          }
          if(index == 1) {
            sums[index] = '合计';
            return;
          }
          if(index < 3) {



            sums[index] = 'N/A';
            return;
          }

          if(index == 3) {

            var total = 0;
            for(var i=0;i<data.length;i++) {
              total = this.accAdd(total , this.gettotal(data[i].items))
            }

            sums[index] = ''  + total + ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if(index < 4) {
            sums[index] = 'N/A';
            return;
          }

          if(index == 4) {
            sums[index] = '' + this.gettotal(data) + ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
      onprint() {
        window.print();
      }
    }
  }
</script>
<style>
 @media screen{
  .only-for-print{
    display:none;
  }
 }
 @media print{
 .no-print{
 display:none;
 }
 .only-for-print{
  display:block;
 }

 html, body {
   font-size: 4mm;
   width: 460mm;
   margin:0 auto;
 }
 }

 @page {
   size:A4;
   margin: 0;
 }
</style>
