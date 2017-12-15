<template>
      <div class="title-select-box">
        <el-select v-model="platVal" placeholder="平台" style="width: 150px" @change="changeVal">
          <el-option
            v-for="plat in plats"
            :key="plat.name"
            :label="plat.name"
            :value="plat.id">
          </el-option>
        </el-select>
        <el-select v-model="canalVal" style="width: 150px" placeholder="渠道">
          <el-option
            v-for="canal in canals"
            :key="canal.val"
            :label="canal.label"
            :value="canal.val">
          </el-option>
        </el-select>
        <el-select v-model="evalVal" style="width: 150px" placeholder="版本" @change="changeEvalVal">
          <el-option
            v-for="edition in editions"
            :key="edition.appVersion"
            :label="edition.appVersion"
            :value="edition.appVersionId">
          </el-option>
        </el-select>
      </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
          allPlat:{
            type: Boolean,
            default: true
          }
        },
        data () {
            return {
              port: this.$store.state.domain,
              platVal: -1,
              plats: [],
              canalVal: '-1',
              canals: [{
                val: '-1',
                label: '全部渠道'
              }],
              evalVal: -1,
              editions: [],
              getEditionId: ''
            }
        },

        mounted () {
          this.init();
        },
        methods: {

          initParams () {
            this.token = this.$cookie.get('adoptToken');
            this.$emit('canalVal1',this.canalVal)
          },

          init () {
            this.initParams();
            this.getPlatform();
            this.getEdition();
          },

          //  获取平台信息
          getPlatform () {
            this.$http.get(this.port + '/getPlatform', {
              params:{
                adoptToken: this.token
              }
            }).then( (res) => {
              if (res.status == 200) {
                if (res.data.status == 0) {
                  let data = res.data.result.result;
                  this.getEdition()
                  this.plats = data;
                  if(!this.allPlat){
                    this.plats.shift()
                  }
                  this.platVal = this.plats[0].id
                  this.$emit('Platform',this.platVal)
                }
                else if (res.data.status == 1) {
                  console.log('平台信息请求数据为空');
                }
              }
              else{
                console.log('请求失败');
              }

            }, (err) => {
              console.log('获取失败');
              console.log('err',err);
            });

          },

          //  获取版本信息
          getEdition () {
            let Params = new URLSearchParams();
            Params.append('adoptToken', this.token);
            Params.append('appPlatId', this.platVal)
            this.$http.post(this.port + '/getEdition',Params).then( (res) => {
              if (res.status == 200) {
                if (res.data.status == 0) {
                  let data = res.data.result.result;
                  this.editions = data;
                  this.evalVal = data[0].appVersionId;
                }
                else if (res.data.status == 1) {
                  console.log('版本信息请求数据为空');
                }
              }
              else{
                console.log('请求失败');
              }

            }, (err) => {
              console.log('获取失败');
              console.log('err',err);
            });
            this.$emit('getEdition1',this.evalVal)
          },

          //  监听平台数据变化
          changeVal (val) {
            this.platVal = val;
            this.evalVal = this.getEditionId
            this.getEdition();
            this.$emit('changeVal',val);
          },

          //  监听版本数据变化
          changeEvalVal (val) {
            this.$emit('changeEvalVal',val);
          }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
