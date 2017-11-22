<template>
    <div class="role-man-detail">
      <div class="header-wrapper">
        <h1>
          角色维护
          <el-popover
            placement="right"
            width="200"
            trigger="hover"
            popper-class="popover-class">
            <slot>{{explain}}</slot>
            <i class="el-icon-information" slot="reference"></i>
          </el-popover>
        </h1>
      </div>
      <div class="role-detail-main">
        <el-tabs type="border-card">
          <el-tab-pane label="信息维护">
            <el-form :model="form" label-width="80px">
              <el-form-item label="角色编码">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="系统名称">
                <el-input v-model="form.sname"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="form.mark"></el-input>
              </el-form-item>
            </el-form>
            <div class="tab1-btn">
              <el-button type="primary">保存</el-button>
              <el-button type="success">重置</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="资源分配">
            <div class="tab2-left">
              <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all></el-tree>
            </div>
            <div class="tab2-right">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  prop="name"
                  label="菜单编码">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="菜单名称">
                </el-table-column>
              </el-table>
              <div class="transfer-wrapper">
                <div class="transfer">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="search"
                    v-model="transferModel"
                    :data="transferData"
                    :titles="['待选区', '已选区']">
                  </el-transfer>
                </div>
                <div class="transfer">
                  <el-transfer
                    filterable
                    :filter-method="filterMethod2"
                    filter-placeholder="search"
                    v-model="transferModel2"
                    :data="transferData2"
                    :titles="['待选区', '已选区']">
                  </el-transfer>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员分配">
            <el-form :model="form2" label-width="80px" inline="">
              <el-form-item label="角色编码">
                <el-input v-model="form2.ID"></el-input>
              </el-form-item>
              <el-form-item label="角色名称">
                <el-input v-model="form2.name"></el-input>
              </el-form-item>
              <el-form-item label="系统名称">
                <el-input v-model="form2.type"></el-input>
              </el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="success" @click="dialogTableVisible = true">新增</el-button>
            </el-form>
            <el-table
              :data="tableData2"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="元素1">
              </el-table-column>
              <el-table-column
                prop="address"
                label="元素2">
              </el-table-column>
              <el-table-column
                prop="address"
                label="元素3">
              </el-table-column>
              <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                  <el-button
                    size="small"
                    @click="roleDelete2(scope.$index, scope.row)"
                    type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPages">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据权限">数据权限</el-tab-pane>
        </el-tabs>
      </div>
      <div class="roleAddDialog">
        <el-dialog title="人员分配" :visible.sync="dialogTableVisible">
          <el-table :data="tableData3">
            <el-table-column property="loginName" label="登录名" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="sname" label="企业名称"></el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
              dialogTableVisible: false,
              explain:'角色维护',
              form:{
                  ID:'',
                  name:'',
                  sname:'',
                  mark:''
              },
              form2:{
                ID:'',
                name:'',
                sname:'',
              },
              treeData: [{
                label: '一级 1',
                children: [{
                  label: '二级 1-1',
                  children: [{
                    label: '三级 1-1-1'
                  }]
                }]
              }, {
                label: '一级 2',
                children: [{
                  label: '二级 2-1',
                  children: [{
                    label: '三级 2-1-1'
                  }]
                }, {
                  label: '二级 2-2',
                  children: [{
                    label: '三级 2-2-1'
                  }]
                }]
              }, {
                label: '一级 3',
                children: [{
                  label: '二级 3-1',
                  children: [{
                    label: '三级 3-1-1'
                  }]
                }, {
                  label: '二级 3-2',
                  children: [{
                    label: '三级 3-2-1'
                  }]
                }]
              }],
              defaultProps:{
                children: 'children',
                label: 'label'
              },
              tableData: [{
                name: 1,
                address: 2
              }],
              tableData2: [{
                name: 1,
                address: 2
              }],
              tableData3: [{
                loginName:1,
                name: 1,
                sname: 2
              }],
              transferData: this.generateData(),
              transferModel: [],
              transferData2: this.generateData2(),
              transferModel2: [],
              currentPage: 1,
              totalPages: 40,
            }
        },
        methods:{
          handleNodeClick(){

          },
          handleSelectionChange(){

          },
          generateData(){
            const data = [];
            const cities = ['面板1', '面板2', '面板3', '面板4', '面板5', '面板6', '面板7'];
            cities.forEach((city, index) => {
              data.push({
                label: city,
                key: index
              });
            });
            return data;
          },
          generateData2(){
            const data = [];
            const cities = ['元素1', '元素2', '元素3', '元素4', '元素5', '元素6', '元素7'];
            cities.forEach((city, index) => {
              data.push({
                label: city,
                key: index
              });
            });
            return data;
          },
          filterMethod(query, item) {
            return item.label.indexOf(query) > -1;
          },
          filterMethod2(query, item) {
            return item.label.indexOf(query) > -1;
          },
          roleEdit2(){

          },
          roleDelete2(){

          },
          handleSizeChange(){

          },
          handleCurrentChange(){

          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  .role-man-detail
    margin-top: 40px
    background: #fff
    .role-detail-main
      padding: 20px
      .tab1-btn
        text-align: center
      .tab2-left
        width: 20%
        float: left
      .tab2-right
        width: 75%
        float: right
        .transfer-wrapper
          .transfer
            text-align: center
            margin-top: 20px
      .pagination-wrapper
        margin-top: 20px
        text-align: center
</style>
<style lang="sass">
  .el-transfer-panel
    text-align: left!important
</style>
