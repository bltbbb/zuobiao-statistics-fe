<template>
  <div class="user-man">
    <div class="header-wrapper">
      <h1>
        用户管理
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
    <div class="form-wrap">
      <div class="search-wrapper">
        <div class="title-header">
          <span>人员信息查询</span>
        </div>
        <div class="form-content">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="form-input">
              <el-form-item label="账号ID">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
              <el-form-item label="人员姓名">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
              <el-form-item label="人员状态">
                <el-input v-model="form.ID"></el-input>
              </el-form-item>
            </div>
            <div class="form-btn">
              <el-button>查询</el-button>
              <el-button>重置</el-button>
              <el-button>导入</el-button>
              <el-button>导出</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <div class="list-wrapper">
        <div class="title-header">
          <span>人员信息列表</span>
        </div>
        <div class="list-content">
          <div class="list-btn">
            <el-button @click="dialogFormVisible = true">新增</el-button>
            <el-button>删除</el-button>
            <el-button>配置</el-button>
            <el-button @click="dialogTreeVisible = true">权限查看</el-button>
          </div>
          <div class="list-table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="账号ID"
                width="120">
                <template scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="人员姓名">
              </el-table-column>
              <el-table-column
                prop="address"
                label="人员状态"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="岗位"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="职务"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="address"
                label="组织机构"
                show-overflow-tooltip>
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
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="用户维护" :visible.sync="dialogFormVisible">
      <el-tabs type="border-card">
        <el-tab-pane label="用户资料">
          <el-form :model="form2" label-width="80px">
            <el-form-item label="用户编码">
              <el-input v-model="form.ID"></el-input>
            </el-form-item>
            <el-form-item label="用户名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.mark"></el-input>
            </el-form-item>
          </el-form>
          <div class="tab-1-btn">
            <el-button type="primary">保存</el-button>
            <el-button type="danger">重置</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色分配">
          <el-form :model="form3" label-width="80px">
            <el-form-item label="系统名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
          <div class="transfer-wrapper">
            <el-transfer
              filterable
              :filter-method="filterMethod"
              filter-placeholder="search"
              v-model="transferModel"
              :data="transferData"
              :titles="['待选区', '已选区']">
            </el-transfer>
          </div>
          <div class="tab-2-btn">
            <el-button type="primary">提交</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <el-form :model="form4" label-width="80px">
            <el-form-item label="旧密码">
              <el-input v-model="form.oldPw"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPw"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="form.tNewPw"></el-input>
            </el-form-item>
          </el-form>
          <div class="tab-3-btn">
            <el-button type="primary">保存</el-button>
            <el-button type="danger">重置</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="用户维护" :visible.sync="dialogTreeVisible" size="large">
      <el-tabs type="border-card">
        <el-tab-pane label="资源权限">
          <div class="dialog-left">
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all></el-tree>
          </div>
          <div class="dialog-right">
            <div class="dialog-right-top">
              <el-form :model="form5" label-width="80px" inline="">
                <el-form-item label="面板编码">
                  <el-input v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="面板名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData2"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="面板1">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="面板2">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="面板3">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="100">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)"
                        type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="dialog-right-bottom">
              <el-form :model="form7" label-width="80px" inline="">
                <el-form-item label="元素编码">
                  <el-input v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="元素名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form>
              <div class="dialog-right-table">
                <el-table
                  :data="tableData3"
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
                        @click="handleEdit2(scope.$index, scope.row)"
                        type="primary">查看</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据权限">配置管理</el-tab-pane>
      </el-tabs>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        explain: 'bar',
        form: {
            ID: '',
            name: '',
            status: ''
        },
        form2: {
            ID: '',
            name: '',
            mark:  ''
        },
        form3: {
            name: ''
        },
        form4: {
            oldPw: '',
            newPw: '',
            tNewPw: ''
        },
        form5:{
            ID: '',
            name: ''
        },
        form6:{
          ID: '',
          name: ''
        },
        form7:{
          ID: '',
          name: ''
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
        transferData: this.generateData(),
        transferModel: [],
        currentPage: 1,
        totalPages: 50,
        tableData: [],
        tableData2: [{
          name: 1,
          address: 2
        }],
        tableData3: [{
          name: 1,
          address: 2
        }],
        dialogFormVisible: false,
        dialogTreeVisible: false
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){

      },
      generateData(){
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
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
      handleNodeClick(data) {
        console.log(data);
      },
      handleEdit(data1,data2){
        console.log(data1,data2)
      },
      handleEdit2(data1,data2){
        console.log(data1,data2)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .user-man
    margin-top: 40px
    background: #fff
    .form-wrap
      padding: 0 20px
      .title-header
        margin-top: 25px
        background: #EFF2F7
        height: 45px
        line-height: 45px
        padding-left: 15px
      .form-content
        border: 1px solid #eeeeee
        border-top: none
        padding: 20px 15px
        .form-input
          .el-form-item
            display: inline-block
            width: 30%
        .form-btn
          padding-left: 25px
    .list-wrapper
      .list-content
        border: 1px solid #eeeeee
        border-top: none
        padding-bottom: 20px
        .title-header
          margin-top: 25px
          background: #EFF2F7
          height: 45px
          line-height: 45px
          padding-left: 15px
        .list-btn
          padding: 20px 40px 0
        .list-table
          margin-top: 20px
          padding: 0 40px
          .pagination-wrapper
            margin-top: 20px
            text-align: center
  .tab-1-btn
    text-align: right
  .transfer-wrapper
    text-align: center
  .tab-2-btn,.tab-3-btn
    margin-top: 30px
    text-align: center
  .dialog-left
    width: 20%
    float: left
  .dialog-right
    width: 75%
    float: right
  .dialog-right-top
    margin-bottom: 15px
  .dialog-right-top,.dialog-right-bottom
    border: 1px solid #eee
    padding: 15px
</style>
<style lang="sass">
  .el-transfer-panel
    text-align: left
</style>
