<template>
  <div class="source-man">
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
    <div class="source-main">
        <el-tabs type="border-card">
          <el-tab-pane label="资源权限">
            <div class="source-left">
              <div class="left-btn">
                <el-button
                  type="primary">新增</el-button>
                <el-button
                  type="danger">删除</el-button>
              </div>
              <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" highlight-current default-expand-all></el-tree>
            </div>
            <div class="source-right">
              <el-tabs type="border-card">
                <el-tab-pane label="信息维护">
                  <div class="s-r-1-wrapper">
                    <el-form ref="form" :model="form3" label-width="80px">
                      <el-form-item label="菜单编码">
                        <el-input v-model="form.ID"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单名称">
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                      <el-form-item label="主题类型">
                        <el-input v-model="form.type"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单层次">
                        <el-input v-model="form.layer"></el-input>
                      </el-form-item>
                      <el-form-item label="备注" class="mask">
                        <el-input type="textarea" :rows="2" v-model="form.mark"></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="source-right-1-btn">
                      <el-button type="primary">保存</el-button>
                      <el-button type="danger">重置</el-button>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Url配置">
                  <div class="s-r-2-wrapper">
                    <div class="top">
                      <el-form :model="form4" label-width="80px">
                        <el-form-item label="Url地址" class="left">
                          <el-input placeholder="请输入URL地址" v-model="form4.urlPath"></el-input>
                        </el-form-item>
                        <el-form-item class="right">
                          <el-button type="primary">查询</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="bottom">
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
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
                          width="150">
                          <template scope="scope">
                            <el-button
                              size="small"
                              @click="urlEdit(scope.$index, scope.row)"
                              type="primary">修改</el-button>
                            <el-button
                              size="small"
                              @click="urlDelete(scope.$index, scope.row)"
                              type="danger">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
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
                </el-tab-pane>
                <el-tab-pane label="资源配置">
                  <div class="s-r-3-wrapper">
                    <div class="right">
                      <div class="right-top">
                        <el-form :model="form5" label-width="80px" inline="">
                          <el-form-item label="面板编码">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="面板名称">
                            <el-input v-model="form.name"></el-input>
                          </el-form-item>
                          <el-button type="primary">查询</el-button>
                          <el-button type="success">新增</el-button>
                        </el-form>
                        <div class="right-table">
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
                              width="180">
                              <template scope="scope">
                                <el-button
                                  size="small"
                                  @click="panelEdit(scope.$index, scope.row)"
                                  type="primary">修改</el-button>
                                <el-button
                                  size="small"
                                  @click="panelDelete(scope.$index, scope.row)"
                                  type="danger">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </div>
                      <div class="right-bottom">
                        <el-form :model="form6" label-width="80px" inline="">
                          <el-form-item label="元素编码">
                            <el-input v-model="form.ID"></el-input>
                          </el-form-item>
                          <el-form-item label="元素名称">
                            <el-input v-model="form.name"></el-input>
                          </el-form-item>
                          <el-button type="primary">查询</el-button>
                          <el-button type="success">新增</el-button>
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
                              width="180">
                              <template scope="scope">
                                <el-button
                                  size="small"
                                  @click="elementEdit2(scope.$index, scope.row)"
                                  type="primary">修改</el-button>
                                <el-button
                                  size="small"
                                  @click="elementDelete2(scope.$index, scope.row)"
                                  type="danger">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据权限">
            <div class="tab-2-wrapper">
              <el-form :model="form7" label-width="80px" inline="">
                <el-form-item label="规则编码">
                  <el-input v-model="form.ID"></el-input>
                </el-form-item>
                <el-form-item label="规则名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="规则类型">
                  <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="JSON参数">
                  <el-input v-model="form.param"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button type="success">新增</el-button>
              </el-form>
              <el-table
                :data="tableData4"
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
                  width="180">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="elementEdit3(scope.$index, scope.row)"
                      type="primary">修改</el-button>
                    <el-button
                      size="small"
                      @click="elementDelete3(scope.$index, scope.row)"
                      type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
        return {
          currentPage: 1,
          totalPages: 40,
          explain: 'bar',
          form: {
            ID: '',
            name: ''
          },
          form2: {
            ID: '',
            name: ''
          },
          form3:{

          },
          form4:{
            urlPath:''
          },
          form5:{
          },
          form6:{
          },
          form7:{
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
            name: 1,
            address: 2
          }],
          tableData4: [{
            name: 1,
            address: 2
          }],
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

        }
      },
    methods: {
      handleEdit(){

      },
      handleEdit2(){

      },
      handleNodeClick(){

      },
      urlEdit(){

      },
      urlDelete(){

      },
      handleSelectionChange(){

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      panelAdd(){

      },
      panelEdit(){

      },
      panelDelete(){

      },
      elementAdd(){

      },
      elementEdit(){

      },
      elementDelete(){

      },
    }
  }
</script>
<style lang="sass" scoped>
  .source-man
    margin-top: 40px
    background: #fff
    .source-main
      padding: 20px
      .source-left
        width: 20%
        float: left
        .left-btn
          margin-bottom: 10px
      .source-right
        width: 77%
        float: right
        .s-r-1-wrapper
          .el-form-item
            display: inline-block
            width: 49%
            &.mask
              display: block
              width: 100%
          .source-right-1-btn
            text-align: center
        .s-r-2-wrapper
          .top
            .left
              display: inline-block
              width: 85%
              margin-right: 15px
              float: left
              margin-bottom: 0
          .pagination-wrapper
            margin-top: 20px
            text-align: center
        .s-r-3-wrapper
          .right-top
            margin-bottom: 15px
          .right-top,.right-bottom
            border: 1px solid #eee
            padding: 15px
</style>
