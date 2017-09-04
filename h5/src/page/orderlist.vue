<template>
  <layout active="/order_list">

  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="购货单位">
      <el-select v-model="formInline.schoolname" placeholder="请选择购货单位" allow-create clearable>
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
            {{scope.row.price * scope.row.number}}
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
    </el-table-column>
    <el-table-column
      prop="note"
      label="备注">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template scope="scope">
        <el-button  type="text" size="small" @click="handleview(scope.$index)">打印</el-button>
        <el-button type="text" size="small" @click="handleedit(scope.$index)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="margin-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 50, 100]"
      :page-size="formInline.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tital">
    </el-pagination>
  </el-row >
</layout>
</template>
<script>
import layout from '../components/layout.vue'
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
        schools:[],
        formInline: {
          schoolname: '',
          startdate: '',
          enddate:'',
          skip:0,
          limit:20
        }
      }
    },
    mounted(){
      this.getAllschool();
    },
    methods: {
      handleCurrentChange(val){
        this.formInline.skip = (val - 1) * this.formInline.limit
        this.onSubmit();
      },
      handleSizeChange(val){
        this.formInline.limit = val;
      },
      getAllschool(){
        this.$http.get('/api/allschool').then((res)=>{
          var data = res.data;
          if(data) {
            this.schools = data;
          }
        });
      },
      onSubmit() {
        this.loading = true;
        this.$http.post('/api/order_query',this.formInline).then((res)=>{
          this.orderlist = res.data.list || [];
          this.tital = res.data.tital || 0;
          this.loading = false;
        });
      },
      handleedit(index){
        this.$router.push("/order_edit/" + this.orderlist[index]._id);
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
            var titol = 0;
            data.forEach((obj)=>{
              titol = titol + obj.number * obj.price
            });
            sums[index] = '' + titol + ' 元';
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
    }
  }
</script>
