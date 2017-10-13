<template>
  <layout active="/setting_default">
    <el-form :inline="false" :model="formInline" label-width="80px" class="demo-form-inline">
      <el-form-item
        label="默认公司"
        prop="complaty"
        :rules="[
        { required: true, message: '公司名称不能为空'}
        ]"
        >
          <el-autocomplete
            v-model="formInline.complaty"
            :fetch-suggestions="querySearchAsynccomplay"
            placeholder="公司名称"
          ></el-autocomplete>
      </el-form-item>
      <el-form-item label="默认单位">
        <el-autocomplete
          v-model="formInline.unit"
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
import { mapGetters } from 'vuex';
import { Loading } from 'element-ui';
  export default {
    components: { layout },
    data() {
      return {
        loading:false,
        formInline: {
          complaty:'',
          unit: '',
        }
      }
    },
    mounted(){
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
      initcname(){
          this.formInline.complaty = this.complayname
      },
      initdunit() {
        this.formInline.unit = this.dunit
      },
      onSubmit() {
        var loadingInstance1 = Loading.service({ fullscreen: true });
        this.$http.post('/api/order_query',this.formInline).then((res)=>{
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
