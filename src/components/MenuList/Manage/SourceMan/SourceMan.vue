<template>
  <div class="source-man">
    <div class="header-wrapper">
      <h1>
        资源管理
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
                  type="primary" @click="addMenuHandle">新增</el-button>
                <el-button
                  type="danger" @click="deleteMenuHandle">删除</el-button>
              </div>
              <el-tree :data="treeData" :props="defaultProps" :accordion="true" node-key="privVisitId"  :highlight-current="highlightModel" expand-on-click-node @current-change="handleNodeClick"></el-tree>
            </div>
            <div class="source-right" v-if="menuId">
              <el-tabs type="border-card">
                <el-tab-pane label="信息维护">
                  <div class="s-r-1-wrapper">
                    <el-form ref="form" :model="form3" label-width="120px" class="from_1" :rules="rules">
                      <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="form3.menuName"></el-input>
                      </el-form-item>
                      <!--<el-form-item label="菜单拼音" prop="menuNameQp">-->
                        <!--<el-input v-model="form3.menuNameQp"></el-input>-->
                      <!--</el-form-item>-->
                      <el-form-item label="菜单别名" prop="alias">
                        <el-input v-model="form3.alias"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单层次" prop="menuLevel">
                        <el-input v-model="form3.menuLevel"></el-input>
                      </el-form-item>
                      <el-form-item label="URL路径" label-width="120px" prop="urlPath">
                        <el-input v-model="form3.urlPath" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单类型" label-width="120px" prop="menuType">
                        <el-select style="width: 264px" v-model="form3.menuType" placeholder="请选择菜单类型">
                          <el-option
                            v-for="item in menuTypeData"
                            :key="item.id"
                            :label="item.enumTxt"
                            :value="item.enumValue">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="排序索引" label-width="120px" prop="sortIndex">
                        <el-input v-model="form3.sortIndex" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="加载类型" label-width="120px" prop="loadTarget">
                        <el-select style="width: 264px" v-model="form3.loadTarget">
                          <el-option
                            v-for="item in loadTargetData"
                            :key="item.id"
                            :label="item.enumTxt"
                            :value="item.enumValue">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="全路径" label-width="120px" prop="fullPath">
                        <el-input v-model="form3.fullPath" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-form-item class="isShare" label="isShare" label-width="120px" prop="isShare">
                        <el-select style="width: 264px" v-model="form3.isShare" placeholder="请选择">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="描述" prop="remark">
                        <el-input type="textarea" v-model="form3.remark"></el-input>
                      </el-form-item>
                      <!--<el-form-item label="备注" class="mask">-->
                        <!--<el-input type="textarea" :rows="2" v-model="form.mark"></el-input>-->
                      <!--</el-form-item>-->
                    </el-form>
                    <div class="source-right-1-btn">
                      <el-button type="primary" @click="postMenu">保存</el-button>
                      <el-button type="danger" @click="reset">重置</el-button>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Url配置">
                  <div class="s-r-2-wrapper">
                    <div class="top">
                      <el-form :model="form4" label-width="80px" inline>
                        <el-form-item label="Url地址" class="left">
                          <el-input placeholder="请输入URL地址" v-model="form4.urlPath"></el-input>
                        </el-form-item>
                        <div class="right">
                            <el-button type="primary" @click="queryUrlData">查询</el-button>
                            <el-button type="primary" @click="addUrlHandle">新增</el-button>
                        </div>
                      </el-form>
                    </div>
                    <div class="bottom">
                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="urlPath"
                          label="URL路径">
                        </el-table-column>
                        <el-table-column
                          prop="method"
                          label="Method">
                        </el-table-column>
                        <el-table-column
                          prop="createUser"
                          label="创建人">
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="150">
                          <template scope="scope">
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
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
                      </el-pagination>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="资源配置">
                  <div class="s-r-3-wrapper">
                    <div class="right">
                      <div class="right-top">
                        <el-form :model="form5" label-width="80px" inline="">
                          <!--<el-form-item label="面板编码">-->
                            <!--<el-input v-model="form.ID"></el-input>-->
                          <!--</el-form-item>-->
                          <el-form-item label="面板名称">
                            <el-input v-model="form5.name"></el-input>
                          </el-form-item>
                          <el-button type="primary" @click="queryPanelHandle">查询</el-button>
                          <el-button type="success" @click="addPanelHandle">新增</el-button>
                        </el-form>
                        <div class="right-table">
                          <el-table
                            :data="tableData2"
                            border
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                            @cell-click="panelTableClick">
                            <el-table-column
                              prop="panelName"
                              label="面板名称">
                            </el-table-column>
                            <el-table-column
                              prop="remark"
                              label="描述">
                            </el-table-column>
                            <el-table-column
                              label="操作"
                              width="180"
                              prop="handle">
                              <template scope="scope">
                                <el-button
                                  size="small"
                                  @click="editPanelHandle(scope.$index, scope.row)"
                                  type="primary">修改</el-button>
                                <el-button
                                  size="small"
                                  @click="panelDelete(scope.$index, scope.row)"
                                  type="danger">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                          <div class="pagination-wrapper3">
                            <el-pagination
                              @size-change="handleSizeChange3"
                              @current-change="handleCurrentChange3"
                              :current-page="currentPage3"
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="pageSize3"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="totalCount3">
                            </el-pagination>
                          </div>
                        </div>
                      </div>
                      <div class="right-bottom">
                        <el-form :model="form6" label-width="80px" inline="">
                          <!--<el-form-item label="元素编码">-->
                            <!--<el-input v-model="form.ID"></el-input>-->
                          <!--</el-form-item>-->
                          <el-form-item label="元素名称">
                            <el-input v-model="form6.name"></el-input>
                          </el-form-item>
                          <el-button type="primary" @click="queryElementHandle">查询</el-button>
                          <el-button type="success" @click="addElementHandle">新增</el-button>
                        </el-form>
                        <div class="dialog-right-table">
                          <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                            <el-table-column
                              prop="elementName"
                              label="元素名称">
                            </el-table-column>
                            <el-table-column
                              prop="remark"
                              label="描述">
                            </el-table-column>
                            <el-table-column
                              prop="panelName"
                              label="所属面板">
                            </el-table-column>
                            <el-table-column
                              label="元素类型">
                              <template scope="scope">
                                  <span v-if="scope.row.elementType == 1">图表chart</span>
                                  <span v-if="scope.row.elementType == 2">按钮</span>
                                  <span v-if="scope.row.elementType == 3">表格</span>
                              </template>
                            </el-table-column>
                            <el-table-column
                              label="操作"
                              width="180">
                              <template scope="scope">
                                <el-button
                                  size="small"
                                  @click="editElementHandle(scope.$index, scope.row)"
                                  type="primary">修改</el-button>
                                <el-button
                                  size="small"
                                  @click="elementDelete(scope.$index, scope.row)"
                                  type="danger">删除</el-button>
                              </template>
                            </el-table-column>
                          </el-table>
                          <div class="pagination-wrapper4">
                            <el-pagination
                              @size-change="handleSizeChange4"
                              @current-change="handleCurrentChange4"
                              :current-page="currentPage4"
                              :page-sizes="[10, 20, 30, 40]"
                              :page-size="pageSize4"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="totalCount4">
                            </el-pagination>
                          </div>
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
                <el-form-item label="描述">
                  <el-input v-model="form7.remark"></el-input>
                </el-form-item>
                <el-button type="primary" @click="searchDataAuth">查询</el-button>
                <el-button type="success" @click="addDataAuth">新增</el-button>
              </el-form>
              <el-table
                :data="tableData4"
                border
                style="width: 100%">
                <el-table-column
                  prop="jsonInfo"
                  label="数据">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="描述">
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="180">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="editeDataAuthHandle(scope.$index, scope.row)"
                      type="primary">修改</el-button>
                    <el-button
                      size="small"
                      @click="deleteDataAuthHandle(scope.$index, scope.row)"
                      type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination-wrapper5">
                <el-pagination
                  @size-change="handleSizeChange5"
                  @current-change="handleCurrentChange5"
                  :current-page="currentPage5"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize5"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount5">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
    </div>
    <div class="addUrlDialog">
      <el-dialog title="Url库" :visible.sync="addUrlDialog">
        <div class="selectWrapper">
          <el-select
            v-model="selectUrlPath"
            filterable
            clearable
            placeholder="请输入关键词"
            :loading="loading"
            @change="selectChangeHandle">
            <el-option
              v-for="item in addUrlData"
              :key="item.urlId"
              :label="item.urlPath"
              :value="item.index">
            </el-option>
          </el-select>
        </div>
        <el-table
          :data="addUrlData"
          border
          ref="urlTable"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="500">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="urlPath"
            label="URL路径">
          </el-table-column>
          <el-table-column
            prop="method"
            label="Method">
          </el-table-column>
          <el-table-column
            prop="createUser"
            label="创建人">
          </el-table-column>
        </el-table>
        <div class="addUrlBtn">
          <el-button
            @click="commitAddUrl"
            type="primary">提交</el-button>
          <el-button
            @click="addUrlDialog = false"
            type="danger">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="addMenuDialog">
      <el-dialog title="新增菜单" :visible.sync="addMenuDialog" size="small" v-if="addMenuDialog">
        <el-form :model="form8" inline :rules="rules" ref="addMenuForm">
          <el-form-item label="所属菜单" :label-width="formLabelWidth">
            <el-input v-model="fatherMenu" style="width: 220px;" readonly auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单名" :label-width="formLabelWidth" prop="menuName">
            <el-input v-model="form8.menuName" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <!--<el-form-item label="菜单拼音" :label-width="formLabelWidth" prop="menuNameQp">-->
            <!--<el-input v-model="form8.menuNameQp" style="width: 220px;" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="菜单别名" :label-width="formLabelWidth" prop="alias">
            <el-input v-model="form8.alias" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单层次" :label-width="formLabelWidth" prop="menuLevel">
            <el-input v-model="form8.menuLevel" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" :label-width="formLabelWidth" prop="menuType">
            <el-select v-model="form8.menuType" style="width: 220px;" placeholder="请选择菜单类型">
              <el-option
                v-for="item in menuTypeData"
                :key="item.id"
                :label="item.enumTxt"
                :value="item.enumValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL路径" :label-width="formLabelWidth" prop="urlPath">
            <el-input v-model="form8.urlPath" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序索引" :label-width="formLabelWidth" prop="sortIndex">
            <el-input v-model="form8.sortIndex" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="加载类型" :label-width="formLabelWidth" prop="loadTarget">
            <el-select style="width: 220px;" v-model="form8.loadTarget">
              <el-option
                v-for="item in loadTargetData"
                :key="item.id"
                :label="item.enumTxt"
                :value="item.enumValue">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="全路径" :label-width="formLabelWidth" prop="fullPath">
            <el-input v-model="form8.fullPath" style="width: 220px;" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="isShare" :label-width="formLabelWidth" prop="isShare">
            <el-select style="width: 220px;" v-model="form8.isShare" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="remark">
            <el-input style="width: 220px;" type="textarea" v-model="form8.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="menuDialog-footer">
          <el-button @click="addMenuDialog = false">取 消</el-button>
          <el-button type="primary" @click="commitMenuHandle">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="addPanelDialog">
      <el-dialog title="新增面板" :visible.sync="addPanelDialog" size="tiny">
        <el-form :model="form9">
          <el-form-item label="面板名称" :label-width="formLabelWidth">
            <el-input v-model="form9.panelName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form9.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="menuDialog-footer">
          <el-button @click="addPanelDialog = false">取 消</el-button>
          <el-button type="primary" @click="commitPanelHandle">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="addElementDialog">
      <el-dialog title="新增元素" :visible.sync="addElementDialog" size="tiny">
        <div v-show="selectPanelName" style="padding-left: 32px;margin-bottom: 20px;">
          <span>所属面板: </span><el-tag type="gray">{{selectPanelName}}</el-tag>
        </div>
        <el-form :model="form10">
          <el-form-item label="元素名称" :label-width="formLabelWidth">
            <el-input v-model="form10.elementName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form10.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="元素类型" :label-width="formLabelWidth">
            <el-select v-model="form10.elementType">
              <el-option
                v-for="item in elementTypeData"
                :key="item.id"
                :label="item.enumTxt"
                :value="item.enumValue">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="menuDialog-footer">
          <el-button @click="addElementDialog = false">取 消</el-button>
          <el-button type="primary" @click="commitElementHandle">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="addDataAuthDialog">
      <el-dialog title="数据权限" :visible.sync="addDataAuthDialog" size="small">
        <el-form :model="form11">
          <el-form-item label="json数据" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form11.jsonInfo">
            </el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form11.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="menuDialog-footer">
          <el-button @click="addDataAuthDialog = false">取 消</el-button>
          <el-button type="primary" @click="commitDataAuthHandle">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  export default {
      data(){
        return {
          addDataAuthDialog: false,
          addElementDialog: false,
          addPanelDialog: false,
          selectUrlPath:'',
          loading:false,
          urlPath: '',
          urlPathData: '',
          highlightModel:true,
          currentNode:'',
          addMenuDialog:false,
          formLabelWidth:'100px',
          addUrlDialog: false,
          token:'',
          currentPage: 1,
          totalCount: 0,
          pageSize: 10,
          currentPage2: 1,
          totalCount2: 0,
          pageSize2: 10,
          currentPage3: 1,
          totalCount3: 0,
          pageSize3: 10,
          currentPage4: 1,
          totalCount4: 0,
          pageSize4: 10,
          currentPage5: 1,
          totalCount5: 0,
          pageSize5: 10,
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
            menuName:'',
            menuNameQp:'',
            remark:'',
            menuLevel:'',
            menuType:'',
            urlPath:'',
            loadTarget:'',
            sortIndex:'',
            isShare:'',
            fullPath:'',
            alias:''
          },
          form4:{
            urlPath:''
          },
          form5:{
              name:''
          },
          form6:{
              name:''
          },
          form7:{
              remark:'',
              jsonInfo:''
          },
          form8:{
              menuName:'',
              menuNameQp:'',
              remark:'',
              menuLevel:'',
              menuType:'',
              urlPath:'',
              loadTarget:'',
              sortIndex:'',
              isShare:'',
              fullPath:'',
              alias:''
          },
          form9:{
            panelName:'',
            remark:'',
          },
          form10:{
            elementName:'',
            remark:'',
            elementType:2
          },
          form11:{
            jsonInfo:'',
            remark:''
          },
          tableData: [],
          tableData2: [],
          tableData3: [],
          tableData4: [],
          treeData: [],
          defaultProps:{
            children: 'children',
            label: 'label'
          },
          privVisitId: '',
          menuId:'',
          addUrlData: [],
          addUrlDataTemp: [],
          selectedUrl: [],
          oldKey: [],
          newKey: [],
          panelId: '',
          changePanel: false,
          changeElement: false,
          changeData: false,
          selectPanelName:'',
          fatherMenu:'root',
          newId:'',
          oldId:'',
          panelIndex: '',
          menuTypeData:[],
          loadTargetData: [],
          elementTypeData: [],
          rules: {
            menuName: [
              { required: true, message: '请输入菜单名', trigger: 'blur' }
            ],
//            menuNameQp: [
//              { required: true, message: '请输入菜单拼音', trigger: 'blur' },
//              { pattern: /^[A-Za-z]+$/, message: '请输入正确的菜单拼音', trigger: 'blur' },
//            ],
            alias: [
              { required: true, message: '请输入菜单别名', trigger: 'blur'},
              { pattern: /^[A-Za-z]+$/, message: '请输入正确的菜单别名', trigger: 'blur' },
            ],
            menuLevel: [
              {  required: true, message: '请输入菜单层次', trigger: 'blur' }
            ],
            menuType: [
              {  required: true, message: '请选择菜单类型', trigger: 'change' }
            ],
//            urlPath: [
//              { required: true, message: '请输入路径', trigger: 'blur',  },
//            ],
//            loadTarget: [
//              { required: true, message: '请选择加载类型', trigger: 'change' },
//            ],
//            fullPath: [
//              { required: true, message: '请输入全路径', trigger: 'blur' },
//            ],
            isShare: [
              { required: true, message: '请选择', trigger: 'change' },
            ],
//            remark: [
//              { required: true, message: '请输入描述', trigger: 'blur' },
//            ],
            sortIndex: [
              {   required: true, message: '请输入排序索引', trigger: 'blur' }
            ]
          },
        }
      },
    mounted(){
      this.initParams()
      this.init()
    },
    methods: {
      init(){
        this.getTreeData()
        this.getDataAuth()
        this.getMenuType()
        this.getTargetType()
        this.getElementType()
      },
      initParams(){
        this.token = this.$cookie.get('adoptToken');
      },
      handleEdit(){

      },
      handleEdit2(){

      },
      urlEdit(){

      },
      urlDelete(index,data){
        this.$http.delete(this.$store.state.domain+'/privUrl',{
          params:{
            adoptToken: this.token,
            id: data.visitUrlId
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.getUrlSelected()
            this.$message('删除成功')
          }else{
            this.$message('删除失败')
          }
        },(err)=>{

        })
      },
      handleSelectionChange(data){
        this.selectedUrl = []
        data.forEach((item)=>{
            this.selectedUrl.push(item.urlId)
        })
      },
      handleSizeChange(data){
        this.pageSize = data
        this.getUrlSelected()
      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getUrlSelected()
      },
      handleSizeChange2(data){
        this.pageSize2 = data
        this.getUrlNotSelected()
      },
      handleCurrentChange2(data){
        this.currentPage2 = data
        this.getUrlNotSelected()
      },
      handleSizeChange3(data){
        this.pageSize3 = data
      },
      handleCurrentChange3(data){
        this.currentPage3 = data
      },
      handleSizeChange4(data){
        this.pageSize4 = data
      },
      handleCurrentChange4(data){
        this.currentPage4 = data
      },
      handleSizeChange5(data){
        this.pageSize5 = data
      },
      handleCurrentChange5(data){
        this.currentPage5 = data
      },
      getTreeData(){
        this.$http.get(this.$store.state.domain+'/menu',{
          params:{
            adoptToken: this.token
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.treeData = res.data.result.result
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      },
      handleNodeClick(data,node){
          this.tableData3 = []
          this.panelId = ''
          this.panelIndex = ''
          this.selectPanelName = ''
          this.newId = ''
          this.oldId = ''
          this.newKey = data.privVisitId
          if(this.newKey == this.oldKey){
            this.privVisitId = ''
            this.menuId = ''
            this.highlightModel = false
            this.newKey = ''
            this.oldKey = ''
            this.form3 = {}
            this.tableData2 = []
            this.fatherMenu = 'root'
          }else {
            this.highlightModel = true
            this.privVisitId = data.privVisitId
            this.menuId = data.menuId
            this.form3 = data
            this.form3.menuType = data.menuType + ''
            this.form3.isShare = data.isShare + ''
            this.form3.menuLevel = data.menuLevel + ''
            this.form3.sortIndex = data.sortIndex + ''
            this.form3.loadTarget = data.loadTarget + ''
            this.fatherMenu = data.menuName
            this.getUrlSelected()
            this.getPanel()
          }
          this.getElement()
          this.oldKey = this.newKey
      },
      getUrlSelected(){
        let data = {
          adoptToken: this.token,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          privVisitId: this.privVisitId
        }
        this.$http.post(this.$store.state.domain+'/confUrl/queryUrlSelected',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      },
      queryUrlData(){
        let data = {
          adoptToken: this.token,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          privVisitId: this.privVisitId,
          urlPath: this.form4.urlPath
        }
        this.$http.post(this.$store.state.domain+'/confUrl/queryUrlSelected',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount = res.data.result.totalCount
            this.tableData = res.data.result.result
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      },
      getUrlNotSelected(){
        let data = {
          adoptToken: this.token,
          privVisitId: this.privVisitId
        }
        this.$http.post(this.$store.state.domain+'/confUrl/queryUrlNotSelected',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount2 = res.data.result.totalCount
            this.addUrlData = res.data.result.result
          }else{
            this.$message(res.data.result.result.message)
          }
        },(err)=>{

        })
      },
      addUrlHandle(){
        this.addUrlDialog = true
        this.getUrlNotSelected()
        this.selectedUrl = []
      },
      addMenuHandle(){
        this.form8 = {
          menuName:'',
          menuNameQp:'',
          remark:'',
          menuLevel:'',
          menuType:'',
          urlPath:'',
          loadTarget:'',
          sortIndex:'',
          isShare:'',
          fullPath:'',
          alias:''
        }
        this.addMenuDialog = true
      },
      deleteMenuHandle(){
        this.$http.delete(this.$store.state.domain+'/menu',{
            params:{
              adoptToken: this.token,
              menuId: this.menuId
            }
        }).then((res)=>{
          if(res.data.status == 0){
            this.getTreeData()
            this.$message('删除成功')
          }else{
            this.$message('删除失败')
          }
        },(err)=>{

        })
      },
      selectChangeHandle(data){
        if (this.addUrlData[data]) {
          this.$refs.urlTable.toggleRowSelection(this.addUrlData[data]);
        }
      },
      commitAddUrl(){
        let data = {
          adoptToken: this.token,
          privVisitId: this.privVisitId,
          urlId: this.selectedUrl.join(',')
        }
        this.$http.post(this.$store.state.domain+'/privUrl/insertCodeBatch',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.getUrlSelected()
            this.$message('提交成功')
            this.addUrlDialog = false
          }else{
            this.$message('提交失败')
          }
        },(err)=>{

        })
      },
      commitMenuHandle(){
        this.$refs.addMenuForm.validate((valid) => {
          if (valid) {
            let data = {
              adoptToken: this.token,
              menuPid: this.menuId || '-1' ,
              ...this.form8
            }
            this.$http.post(this.$store.state.domain+'/menu',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.getTreeData()
                this.$message('提交成功')
                this.addMenuDialog = false
              }else{
                this.$message('提交失败')
              }
            },(err)=>{

            })
          } else {
            return false;
          }
        });

      },
      getPanel(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          currentPage: this.currentPage3,
          pageSize: this.pageSize3
        }
        this.$http.post(this.$store.state.domain+'/resPanel/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount3 = res.data.result.totalCount
            this.tableData2 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      getElement(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          panelId: this.panelId,
          currentPage: this.currentPage4,
          pageSize: this.pageSize4
        }
        this.$http.post(this.$store.state.domain+'/element/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount4 = res.data.result.totalCount
            this.tableData3 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      panelTableClick(row, column, cell, event){
          if(column.property == 'handle'){
            return
          }
          this.newId = row.panelId
          if(this.newId === this.oldId){
            this.panelId = ''
            this.panelIndex = ''
            this.selectPanelName = ''
            this.newId = ''
            this.oldId = ''
          }else{
            this.panelIndex = row.index
            this.panelId = row.panelId
            this.selectPanelName = row.panelName
            this.getElement()
          }
          this.oldId = this.newId
      },
      tableRowClassName(row, index) {
        if (index === this.panelIndex) {
          return 'info-row';
        }
        return '';
      },
      addPanelHandle(){
          if(this.menuId == ''){
            this.$message('请先选择一个菜单！')
            return
          }
          this.form9 = {
            panelName:'',
            remark:''
          }
          this.changePanel = false
          this.addPanelDialog = true
      },
      queryPanelHandle(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          currentPage: this.currentPage3,
          pageSize: this.pageSize3,
          panelName: this.form5.name
        }
        this.$http.post(this.$store.state.domain+'/resPanel/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount3 = res.data.result.totalCount
            this.tableData2 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      queryElementHandle(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          panelId: this.panelId,
          currentPage: this.currentPage4,
          pageSize: this.pageSize4,
          elementName: this.form6.name
        }
        this.$http.post(this.$store.state.domain+'/element/page',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount4 = res.data.result.totalCount
            this.tableData3 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      editPanelHandle(index,data){
        this.addPanelDialog = true
        this.changePanel = true
        this.form9.panelName = data.panelName
        this.form9.remark = data.remark
        this.form9.panelId = data.panelId
      },
      editElementHandle(index,data){
        this.addElementDialog = true
        this.changeElement = true
        this.form10.elementName = data.elementName
        this.form10.remark = data.remark
        this.form10.panelId = data.panelId
        this.form10.elementType = data.elementType +''
        this.form10.elementId = data.elementId
      },
      addElementHandle(){
        this.form10 = {
          elementName:'',
          remark:'',
          elementType: ''
        }
        this.changeElement = false
        this.addElementDialog = true
      },
      commitPanelHandle(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          ...this.form9
        }
        if(this.changePanel){
          this.$http.put(this.$store.state.domain+'/resPanel',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('修改成功')
              this.addPanelDialog = false
              this.getPanel()
            }else{

            }
          },(err)=>{
            this.$message('修改失败')
          })
        }else {
          this.$http.post(this.$store.state.domain+'/resPanel',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('提交成功')
              this.addPanelDialog = false
              this.getPanel()
            }else{

            }
          },(err)=>{
            this.$message('提交失败')
          })
        }
      },
      commitElementHandle(){
        let data = {
          adoptToken: this.token,
          menuId: this.menuId,
          panelId: this.panelId,
          ...this.form10
        }
        if(this.changeElement){
          this.$http.put(this.$store.state.domain+'/element',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('修改成功')
              this.addElementDialog = false
              this.getElement()
            }else{

            }
          },(err)=>{
            console.log('修改失败')
          })
        }else{
          this.$http.post(this.$store.state.domain+'/element',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('提交成功')
              this.addElementDialog = false
              this.getElement()
            }else{

            }
          },(err)=>{
            console.log('提交失败')
          })
        }
      },
      panelDelete(index,data){
        this.$http.delete(this.$store.state.domain+'/resPanel',{
            params:{
              adoptToken: this.token,
              panelId: data.panelId
            }
        }).then((res)=>{
          if(res.data.status == 0){
            this.$message('删除成功')
            this.getPanel()
            this.getElement()
          }else{

          }
        },(err)=>{
          this.message('删除失败')
        })
      },
      elementDelete(index,data){
        this.$http.delete(this.$store.state.domain+'/element',{
          params:{
            adoptToken: this.token,
            elementId: data.elementId
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.$message('删除成功')
            this.getElement()
          }else{

          }
        },(err)=>{
          this.message('删除失败')
        })
      },
      getDataAuth(){
        let data = {
          adoptToken: this.token,
          remark: this.form7.remark,
          currentPage: this.currentPage5,
          pageSize: this.pageSize5
        }
        this.$http.post(this.$store.state.domain+'/dataauth/query',qs.stringify(data)).then((res)=>{
          if(res.data.status == 0){
            this.totalCount5 = res.data.result.totalCount
            this.tableData4 = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      addDataAuth(){
          this.addDataAuthDialog = true
          this.changeData = false
          this.form11 = {
              jsonInfo:'',
              remark: ''
          }
      },
      editeDataAuthHandle(index,data){
        this.changeData = true
        this.addDataAuthDialog = true
        this.form11.jsonInfo = data.jsonInfo
        this.form11.remark = data.remark
        this.form11.id = data.id
      },
      isJSON(str) {
        if (typeof str == 'string') {
          try {
            JSON.parse(str);
            return true;
          } catch(e) {
            return false;
          }
        }
      },
      commitDataAuthHandle(){
        let isJSON = this.isJSON(this.form11.jsonInfo)
        if(!isJSON){
            this.$message('请输入有效JSON')
            return
        }
        let data = {
          adoptToken: this.token,
          ...this.form11
        }
        if(this.changeData){
          this.$http.put(this.$store.state.domain+'/dataauth',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.getDataAuth()
              this.$message('修改成功')
              this.addDataAuthDialog = false
            }else{
              this.$message('修改失败')
            }
          },(err)=>{
            this.$message('修改失败')
          })
        }else{
          this.$http.post(this.$store.state.domain+'/dataauth',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.getDataAuth()
              this.$message('提交成功')
              this.addDataAuthDialog = false
            }else{
              this.$message('提交失败')
            }
          },(err)=>{
            this.$message('提交失败')
          })
        }
      },
      deleteDataAuthHandle(index,data){
        this.$http.delete(this.$store.state.domain+'/dataauth',{
            params:{
              adoptToken: this.token,
              id: data.id
            }
        }).then((res)=>{
          if(res.data.status == 0){
            this.getDataAuth()
            this.$message('删除成功')
          }else{
            this.$message('删除失败')
          }
        },(err)=>{
          this.$message('删除失败')
        })
      },
      postMenu(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            let data = {
              adoptToken: this.token,
              menuId: this.menuId,
              menuName: this.form3.menuName,
              menuNameQp:this.form3.menuNameQp,
              remark:this.form3.remark,
              menuLevel:this.form3.menuLevel,
              menuType:this.form3.menuType,
              urlPath:this.form3.urlPath,
              loadTarget:this.form3.loadTarget,
              sortIndex:this.form3.sortIndex,
              isShare:this.form3.isShare,
              fullPath:this.form3.fullPath,
              alias:this.form3.alias
            }
            this.$http.put(this.$store.state.domain+'/menu',qs.stringify(data)).then((res)=>{
              if(res.data.status == 0){
                this.$message('修改成功')
              }else{

              }
            },(err)=>{

            })
          } else {
            return false;
          }
        });
      },
      reset(){
          this.form3 = {
            menuName:'',
              menuNameQp:'',
              remark:'',
              menuLevel:'',
              menuType:'',
              urlPath:'',
              loadTarget:'',
              sortIndex:'',
              isShare:'',
              fullPath:'',
          }
      },
      getMenuType(){
          this.$http.get(this.$store.state.domain+'/dicenum',{
              params:{
                adoptToken: this.token,
                type: 1
              }
          }).then((res)=>{
            if(res.data.status == 0){
              this.menuTypeData = res.data.result.result
            }else{

            }
          },(err)=>{

          })
      },
      getTargetType(){
        this.$http.get(this.$store.state.domain+'/dicenum',{
          params:{
            adoptToken: this.token,
            type: 3
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.loadTargetData = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      getElementType(){
        this.$http.get(this.$store.state.domain+'/dicenum',{
          params:{
            adoptToken: this.token,
            type: 4
          }
        }).then((res)=>{
          if(res.data.status == 0){
            this.elementTypeData = res.data.result.result
          }else{

          }
        },(err)=>{

        })
      },
      searchDataAuth(){
        this.getDataAuth()
      }
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
              margin-right: 15px
              float: left
              margin-bottom: 10px
          .pagination-wrapper
            margin-top: 20px
            text-align: center
        .s-r-3-wrapper
          .right-top
            margin-bottom: 15px
          .right-top,.right-bottom
            border: 1px solid #eee
            padding: 15px
  .pagination-wrapper2,.pagination-wrapper3,.pagination-wrapper4,.pagination-wrapper5
    text-align: center
    margin-top: 15px
  .addUrlBtn
    text-align: center
    margin-top: 15px
  .selectWrapper
    margin-bottom: 10px
    .el-select
      display: block
  .isShare
    position: relative
    .from_1
    vertical-align: top
</style>
<style lang="sass">
  .el-table__body-wrapper
    overflow-x: hidden
  .el-table .info-row
    background: #b3beea
  .source-man
    .el-dialog--tiny
      width: 25%
      padding-right: 10px
    .el-dialog--small
      width: 40%
</style>
