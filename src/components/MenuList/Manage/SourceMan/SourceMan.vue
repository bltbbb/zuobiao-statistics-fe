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
              <el-tree :data="treeData" :props="defaultProps" node-key="privVisitId"  :highlight-current="highlightModel" default-expand-all :expand-on-click-node="false" @current-change="handleNodeClick"></el-tree>
            </div>
            <div class="source-right">
              <el-tabs type="border-card">
                <el-tab-pane label="信息维护">
                  <div class="s-r-1-wrapper">
                    <el-form ref="form" :model="form3" label-width="120px">
                      <el-form-item label="菜单名称">
                        <el-input v-model="form3.menuName"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单名称拼音">
                        <el-input v-model="form3.menuNameQp"></el-input>
                      </el-form-item>
                      <el-form-item label="描述">
                        <el-input v-model="form3.remark"></el-input>
                      </el-form-item>
                      <el-form-item label="菜单层次">
                        <el-input v-model="form3.menuLevel"></el-input>
                      </el-form-item>
                      <!--<el-form-item label="备注" class="mask">-->
                        <!--<el-input type="textarea" :rows="2" v-model="form.mark"></el-input>-->
                      <!--</el-form-item>-->
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
                            highlight-current-row
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
                              prop="elementType"
                              label="元素类型">
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
                  <el-input v-model="form.remark"></el-input>
                </el-form-item>
                <el-form-item label="JSON参数">
                  <el-input v-model="form.jsonInfo"></el-input>
                </el-form-item>
                <el-button type="primary">查询</el-button>
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
      <el-dialog title="新增菜单" :visible.sync="addMenuDialog" size="tiny">
        <el-form :model="form8">
          <el-form-item label="菜单名" :label-width="formLabelWidth">
            <el-input v-model="form8.menuName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单名拼音" :label-width="formLabelWidth">
            <el-input v-model="form8.menuNameQp" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form8.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单层次" :label-width="formLabelWidth">
            <el-input v-model="form8.menuLeval" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <el-select v-model="form8.menuType" placeholder="请选择活动区域">
              <el-option label="目录" value="1"></el-option>
              <el-option label="菜单" value="2"></el-option>
              <el-option label="tab页" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL路径" :label-width="formLabelWidth">
            <el-input v-model="form8.urlPath" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序索引" :label-width="formLabelWidth">
            <el-input v-model="form8.sortIndex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="负荷指标" :label-width="formLabelWidth">
            <el-input v-model="form8.loadTarget" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="isShare" :label-width="formLabelWidth">
            <el-select v-model="form8.isShare" placeholder="请选择活动区域">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
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
            <el-input v-model="form9.remark" auto-complete="off"></el-input>
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
        <el-form :model="form10">
          <el-form-item label="元素名称" :label-width="formLabelWidth">
            <el-input v-model="form10.elementName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form10.remark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="isShare" :label-width="formLabelWidth">
            <el-select v-model="form10.elementType" placeholder="请选择活动区域">
              <el-option label="图表chart" value="1"></el-option>
              <el-option label="按钮" value="2"></el-option>
              <el-option label="表格" value="3"></el-option>
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
      <el-dialog title="新增数据权限" :visible.sync="addDataAuthDialog" size="small">
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
          <el-button @click="addElementDialog = false">取 消</el-button>
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
          },
          form9:{
            panelName:'',
            remark:'',
          },
          form10:{
            elementName:'',
            remark:'',
            elementType:''
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
          changeData: false
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
        this.pageSize = data
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
          this.newKey = data.privVisitId
          if(this.newKey == this.oldKey){
            this.privVisitId = ''
            this.menuId = ''
            this.highlightModel = false
            this.newKey = ''
            this.oldKey = ''
            this.form3 = {}
          }else {
            this.highlightModel = true
            this.privVisitId = data.privVisitId
            this.menuId = data.menuId
            this.form3 = data
            this.getUrlSelected()
            this.getPanel()
          }
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
          this.panelId = row.panelId
          this.getElement()
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
        this.form10.elementType = data.elementType
        this.form10.elementId = data.elementId
      },
      addElementHandle(){
        if(this.panelId == ''){
            this.$message('请先选择一个面板！')
            return
        }
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
      commitDataAuthHandle(){
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
              width: 80%
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
</style>
<style lang="sass">
  .el-table__body-wrapper
    overflow-x: hidden
</style>
