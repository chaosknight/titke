<template>
  <layout active="/setting_default">
    <el-form ref="settingform" :inline="false" :model="formInline" label-width="80px" class="demo-form-inline">
      <el-form-item
        label="默认公司"
        prop="d_complatyname"
        :rules="[
        { required: true, message: '公司名称不能为空'}
        ]"
        >
          <el-autocomplete
            v-model="formInline.d_complatyname"
            :fetch-suggestions="querySearchAsynccomplay"
            placeholder="公司名称"
          ></el-autocomplete>
      </el-form-item>
      <el-form-item label="默认单位"
      prop="d_unit"
      :rules="[
      { required: true, message: '默认单位不能为空'}
      ]"
      >
        <el-autocomplete
          v-model="formInline.d_unit"
          :fetch-suggestions="querySearchAsyncunit"
          placeholder="默认单位"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
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
        formInline: {
          d_complatyname:'',
          d_unit: '',
        }
      }
    },
    mounted(){
      this.initcname();
      this.initdunit();
    },
    watch:{
      complayname:"initcname",
      dunit:'initdunit'
    },
    computed: {
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
      ...mapActions(['setcomplayname', 'setdunit']),
      initcname(){
          this.formInline.d_complatyname = this.complayname
      },
      initdunit() {
        this.formInline.d_unit = this.dunit
      },
      onSubmit() {
        this.$refs['settingform'].validate((valid) => {
          if (valid) {
            var loadingInstance1 = Loading.service({ fullscreen: true });
            this.$http.post('/api/savesetting',this.formInline).then((res)=>{
              loadingInstance1.close()
              this.setcomplayname(this.formInline.d_complatyname);
              this.setdunit(this.formInline.d_unit);
              this.$message({
                type: 'success',
                message: '保存成功!'
              });
            });
          } else {
            return false;
          }
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
