<template>
  <layout active="/setting_sug">
    <el-form ref="settingform" :inline="false" label-width="80px" class="demo-form-inline">
      <el-form-item
        label=""
        >
        <el-select v-model="type" placeholder="请选择购货单位" allow-create >
          <el-option
          v-for="item in types"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> <el-button type="primary" style="margin-left:20px;" icon="upload" @click="add()">添加</el-button>
      </el-form-item>

    </el-form>

    <el-table
    border
    :data="tabledata"
    >
    <el-table-column
      prop="value"
      label="提示名称">
    </el-table-column>
<el-table-column
  label="操作">
  <template scope="scope">
    <el-button type="danger" :plain="true" size="small" @click="handledel(scope.row.value)">删除</el-button>
  </template>
</el-table-column>
</el-table>


  </layout>
</template>
<script>
import layout from '../components/layout.vue'
import {formatDate} from '../date.js';
import { mapGetters,mapActions } from 'vuex';
import { Loading } from 'element-ui';
  export default {
    components: { layout },
    data() {
      return {
        loading:false,
        type:"product",
        types:[
          {label:"商品名称",value:"product"},
          {label:"商品单位",value:"unit"},
          {label:"公司名称",value:"company"},
          {label:"购货单位",value:"school"},
          {label:"备注",value:"note"}
        ]
      }
    },
    watch:{
      'formInline.type':"change"
    },
    mounted(){
    },
    computed: {
      tabledata:function() {
        switch (this.type) {
          case "product":
            return this.allpnames;
          case "unit":
            return this.allunits;
          case "company":
            return this.allcompanys;
          case "school":
            return this.allschools;
          case "note":
            return this.allnotes;
          default:
            return []
        }

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
      ...mapActions(['del_sug','save_sug']),
      contain(ary,key,value) {
        for(var i=0;i<ary.length;i++) {
          if(ary[i][key] == value) {
            return i;
          }
        }
        return -1;
      },
      inputValidator(v) {
        if(v) {
          var index = this.contain(this.tabledata,'value',v)
          if(index != -1) {
            return "已存在该数据"
          } else {
            return true;
          }
        } else {
          return "不能为空"
        }

      },
      add() {
        this.$prompt('请输入提示名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:this.inputValidator,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
          var params = {type:this.type,value:value};
          this.loading = true;
          this.$http.post('/api/savesug',params).then((res)=>{
            this.loading = false;
            if(res.data) {
              this.save_sug(params)
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '添加失败2'
              });
            }
          }).catch(() => {
            this.loading = false;
            this.$message({
              type: 'error',
              message: '删除失败4'
            });
          });






        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });
        });
      },
      handledel(value) {

        var params = {type:this.type,value:value};
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {

         this.loading = true;
         this.$http.post('/api/delsug',params).then((res)=>{
           this.loading = false;
           if(res.data.numRemoved) {
             this.del_sug(params)
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
      querySearchAsyncunit(queryString, cb){
        var data = this.allunits;
        cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
      },
      querySearchAsynccomplay(queryString, cb){
        var data = this.allcompanys;
        cb(queryString ?data.filter(this.createStateFilter(queryString)):data);
      },
      createStateFilter(queryString) {
       return (state) => {
         return (state.value.indexOf(queryString.toLowerCase()) === 0);
       }
     }
    }
  }
</script>
