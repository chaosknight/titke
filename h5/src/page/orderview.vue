<style>
.print_c .el-table{
  font-size: 0.02mm;
}
.print_c .el-table .cell, .el-table th>div{
  padding-left: 0;
  padding-right: 0;
}
.print_c .el-table th{
  background-color: #ffffff;
}
.print_c .el-table__footer-wrapper thead div, .print_c .el-table__header-wrapper thead div{
  background-color: #ffffff;
}
.bord_top{
  border-top:1px solid #dfe6ec;
}
.bord_left{
  border-left:1px solid #dfe6ec;
}
.bord_right{
  border-right:1px solid #dfe6ec;
}
.bord_bottom{
  border-bottom:1px solid #dfe6ec;
}

.col_height{
  height: 8mm;
  font-size: 0.02mm;
  line-height: 8mm;
  text-align: center;
}
.align_left{
  text-align: left;
}
.table_header{
  font-size: 0.05mm;
}

@page {
  size:A4;
  margin: 0;


}
@media print {
  html, body {
    font-size: 4mm;
    width: 240mm;
    height: 140mm;
    margin:0 auto;
  }
  /* ... the rest of the rules ... */
}
</style>
<template>
  <div style="width:240mm;margin:0 auto;color: #1f2d3d;" class="print_c page">
    <div v-for="item in tables" class="bord_left bord_right bord_bottom" style="height:140mm;padding:10mm 20mm;">
      <el-row >
        <el-col :span="24"><div style="text-align:center;line-height:6mm;font-size:4mm;">{{order.complaty}}</div></el-col>
      </el-row>
      <el-row  class="col_height align_left" style="margin:4mm auto;">
        <el-col :span="8">购货单位：{{order.school}}</el-col>
        <el-col :span="8">日期：{{order.date}}</el-col>
        <el-col :span="8">备注：{{order.note}}</el-col>

      </el-row>



      <el-row class="bord_top bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">商品名称</el-col>
              <el-col class="bord_left col_height" :span="span[1]">单位</el-col>
              <el-col class="bord_left col_height" :span="span[2]">单价</el-col>
              <el-col class="bord_left col_height" :span="span[3]">数量</el-col>
              <el-col class="bord_left col_height" :span="span[4]">金额</el-col>
              <el-col class="bord_left col_height" :span="span[5]">备注</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">商品名称</el-col>
              <el-col class="bord_left col_height" :span="span[1]">单位</el-col>
              <el-col class="bord_left col_height" :span="span[2]">单价</el-col>
              <el-col class="bord_left col_height" :span="span[3]">数量</el-col>
              <el-col class="bord_left col_height" :span="span[4]">金额</el-col>
              <el-col class="bord_left col_height" :span="span[5]">备注</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">{{getitemvalue(item,0,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,0,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,0,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,0,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,0,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,0,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,10,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,10,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,10,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,10,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,10,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,10,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">{{getitemvalue(item,1,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,1,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,1,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,1,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,1,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,1,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,11,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,11,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,11,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,11,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,11,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,11,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">{{getitemvalue(item,2,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,2,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,2,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,2,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,2,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,2,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,12,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,12,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,12,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,12,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,12,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,12,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">{{getitemvalue(item,3,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,3,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,3,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,3,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,3,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,3,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,13,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,13,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,13,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,13,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,13,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,13,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,4,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,4,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,4,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,4,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,4,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,4,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,14,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,14,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,14,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,14,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,14,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,14,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,5,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,5,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,5,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,5,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,5,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,5,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,15,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,15,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,15,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,15,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,15,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,15,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,6,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,6,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,6,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,6,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,6,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,6,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,16,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,16,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,16,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,16,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,16,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,16,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,7,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,7,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,7,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,7,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,7,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,7,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,17,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,17,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,17,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,17,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,17,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,17,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,8,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,8,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,8,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,8,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,8,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,8,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,18,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,18,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,18,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,18,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,18,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,18,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class="          col_height" :span="span[0]">{{getitemvalue(item,9,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,9,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,9,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,9,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,9,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,9,'note')}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">{{getitemvalue(item,19,'name')}}</el-col>
              <el-col class="bord_left col_height" :span="span[1]">{{getitemvalue(item,19,'unit')}}</el-col>
              <el-col class="bord_left col_height" :span="span[2]">{{getitemvalue(item,19,'price')}}</el-col>
              <el-col class="bord_left col_height" :span="span[3]">{{getitemvalue(item,19,'number')}}</el-col>
              <el-col class="bord_left col_height" :span="span[4]">{{getitemvalue(item,19,'sumi')}}</el-col>
              <el-col class="bord_left col_height" :span="span[5]">{{getitemvalue(item,19,'note')}}</el-col>
            </el-row>
        </el-col>
      </el-row>

      <el-row class="bord_left bord_right bord_bottom">
        <el-col :span="12">
            <el-row>
              <el-col class=" col_height" :span="span[0]">合计（大写）</el-col>
              <el-col class="bord_left col_height align_left" :span="24 - span[0]">&emsp;{{getotalI(item)}}</el-col>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row>
              <el-col class="bord_left col_height" :span="span[0]">合计（小写）</el-col>
              <el-col class="bord_left col_height align_left" :span="24 - span[0]"> &emsp; {{getotal(item)}}</el-col>
            </el-row>
        </el-col>
      </el-row>
      <el-row  class="col_height">  </el-row>
      <el-row  class="col_height align_left">
        <el-col :span="8">送货：</el-col>
        <el-col :span="8">收货：</el-col>
        <el-col :span="8">复核：</el-col>
      </el-row>
    </div>





  </div>
</template>
<script>
export default {
  data() {
    return {
      span:[
        6,
        3,
        3,
        4,
        3,
        5
      ],
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
           setTimeout(()=>{
             window.print();
           },800)

         });
      }
    },
    getitemvalue(item,i,key) {
      if(item[i]) {
        if(key == "sumi") {
          var pr = this.getitemvalue(item,i,"price");
          var num = this.getitemvalue(item,i,"number");
          if(pr && num ) {
            return pr * num;
          }
          return ''
        }
        return item[i][key]
      } else {
        return ''
      }
    },
    getotal(item) {
      var sum = 0;
      for(var i=0;i<item.length;i++) {
        sum += item[i]['price'] * item[i]['number']
      }
      return sum;
    },
    getotalI(item){
      var n = this.getotal(item)
      return this.smalltoBIG(n)
    },
    smalltoBIG:function (n) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
        var head = n < 0? '欠': '';
        n = Math.abs(n);

        var s = '';

        for (var i = 0; i < fraction.length; i++)
        {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);

        for (var i = 0; i < unit[0].length && n > 0; i++)
        {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++)
            {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    }

   },
   computed:{
     tables:function(){
       var list = [];
       var items = this.order.items;
       for(;items.length>0;) {
         list.push(items.splice(0,20))
       }
       return list;



     }
   },
   mounted() {
     this.initorder();
   }
}
</script>
