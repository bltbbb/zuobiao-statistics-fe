<template>
  <div class="roleConfig">
    <div class="header-wrapper">
      <h1>
        菜单配置
        <el-popover
          placement="right"
          width="200"
          trigger="hover"
          popper-class="popover-class">
        </el-popover>
      </h1>
    </div>
    <div class="roleConfigPanel">
        <div class="top">
          <el-form :model="form" label-width="80px">
            <el-form-item label="面板名称" class="left">
              <el-input placeholder="请输入面板名称" v-model="form.panelName"></el-input>
            </el-form-item>
            <div class="right">
              <el-button type="primary" @click="getSelectedPanel">查询</el-button>
              <el-button type="primary" @click="addPanelHandle">新增</el-button>
            </div>
          </el-form>
        </div>
        <div class="bottom">
          <el-table
            :data="tableData"
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
              prop="createUser"
              label="创建人">
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              prop="handle">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="panelDelete(scope.$index, scope.row)"
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
    <div class="roleConfigElement">
      <div class="top">
        <el-form :model="form" label-width="80px">
          <el-form-item label="元素名称" class="left">
            <el-input placeholder="请输入元素名称" v-model="form.elementName"></el-input>
          </el-form-item>
          <div class="right">
            <el-button type="primary" @click="getSelectedElement">查询</el-button>
            <el-button type="primary" @click="addElementHandle">新增</el-button>
          </div>
        </el-form>
      </div>
      <div class="bottom">
        <el-table
          :data="tableData2"
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
            prop="createUser"
            label="创建人">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
            prop="handle">
            <template scope="scope">
              <el-button
                size="small"
                @click="elementDelete(scope.$index, scope.row)"
                type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount2">
        </el-pagination>
      </div>
    </div>
    <div class="addPanelDialog">
        <el-dialog title="面板库" :visible.sync="addPanelDialog">
          <div class="selectWrapper">
            <el-select
              v-model="selectPanel"
              filterable
              clearable
              placeholder="请输入关键词"
              @change="selectChangeHandle">
              <el-option
                v-for="item in addPanelData"
                :key="item.index"
                :label="item.panelName"
                :value="item.index">
              </el-option>
            </el-select>
          </div>
          <el-table
            :data="panelData"
            border
            ref="panelTable"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            max-height="500">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="panelName"
              label="面板名称">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="createUser"
              label="创建人">
            </el-table-column>
          </el-table>
          <div class="addPanelBtn">
            <el-button
              @click="commitAddPanel"
              type="primary">提交</el-button>
            <el-button
              @click="addPanelDialog = false"
              type="danger">取消</el-button>
          </div>
        </el-dialog>
    </div>
    <div class="addElementDialog">
      <el-dialog title="元素库" :visible.sync="addElementDialog">
        <div class="selectWrapper">
          <el-select
            v-model="selectElement"
            filterable
            clearable
            placeholder="请输入关键词"
            @change="selectChangeElement">
            <el-option
              v-for="item in addElementData"
              :key="item.index"
              :label="item.elementName"
              :value="item.index">
            </el-option>
          </el-select>
        </div>
        <el-table
          :data="elementData"
          border
          ref="elementTable"
          style="width: 100%"
          @selection-change="handleSelectionChange2"
          max-height="500">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="elementName"
            label="元素名称">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="createUser"
            label="创建人">
          </el-table-column>
        </el-table>
        <div class="addPanelBtn">
          <el-button
            @click="commitAddElement"
            type="primary">提交</el-button>
          <el-button
            @click="addElementDialog = false"
            type="danger">取消</el-button>
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
            panelId:'',
            token:'',
            roleId:'',
            menuId:'',
            currentPage: 1,
            pageSize: 10,
            totalCount: 40,
            currentPage2: 1,
            pageSize2: 10,
            totalCount2: 40,
            addPanelDialog:false,
            addElementDialog:false,
            form:{
              panelName:''
            },
            form2:{
              elementName:''
            },
            tableData:[],
            tableData2:[],
            addPanelData:{},
            panelData:[],
            selectPanel:'',
            selectPanelData:[],
            addElementData:{},
            elementData:[],
            selectElement:'',
            selectElementData:[]
          }
      },
      mounted(){
        this.init()
      },
      methods:{
        init(){
          this.initParams()
          this.getSelectedPanel()
        },
        initParams(){
          this.token = this.$cookie.get('adoptToken');
          this.menuId = this.$route.params.menuId
          this.roleId = this.$route.params.roleId
        },
        handleSizeChange (data){
          this.pageSize = data
          this.getSelectedPanel()
        },
        handleCurrentChange(data){
          this.currentPage = data
          this.getSelectedPanel()
        },
        handleSizeChange2 (data){
          this.pageSize2 = data
          this.getSelectedElement()
        },
        handleCurrentChange2(data){
          this.currentPage2 = data
          this.getSelectedElement()
        },
        queryPanelData(){
          let data = {
            adoptToken: this.token,
            roleId:this.roleId,
            menuId:this.menuId,
          }
          this.$http.post(this.$store.state.domain+'/resPanel/queryByRoleNotSelected',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.panelData = res.data.result.result
              this.addPanelData = res.data.result.result
            }else{

            }
          },(err)=>{

          })
        },
        queryElementData(){
          let data = {
            adoptToken: this.token,
            roleId:this.roleId,
            menuId:this.menuId,
            panelId: this.panelId
          }
          this.$http.post(this.$store.state.domain+'/element/queryByRoleNotSelected',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.elementData = res.data.result.result
              this.addElementData = res.data.result.result
            }else{

            }
          },(err)=>{

          })
        },
        addPanelHandle(){
            this.addPanelDialog = true
            this.queryPanelData()
            this.selectedPanel = []
        },
        addElementHandle(){
          this.addElementDialog = true
          this.queryElementData()
          this.selectedElement = []
        },
        elementDelete(index,row){
          this.$http.delete(this.$store.state.domain+'/roleElement',{
              params:{
                adoptToken: this.token,
                id: row.roleElementId
              }
          }).then((res)=>{
            if(res.data.status == 0){
              this.$message('删除成功')
              this.getSelectedElement()
            }else{
              this.$message('删除失败')
            }
          },(err)=>{
            this.$message('删除失败')
          })
        },
        selectChangeHandle(data){
          if (this.addPanelData[data]) {
            this.$refs.panelTable.toggleRowSelection(this.addPanelData[data]);
          }
        },
        selectChangeElement(data){
          if (this.addElementData[data]) {
            this.$refs.elementTable.toggleRowSelection(this.addElementData[data]);
          }
        },
        handleSelectionChange(data){
          this.selectPanelData = []
          data.forEach((item)=>{
            this.selectPanelData.push(item.panelId)
          })
        },
        handleSelectionChange2(data){
          this.selectElementData = []
          data.forEach((item)=>{
            this.selectElementData.push(item.elementId)
          })
        },
        commitAddPanel(){
          let data = {
            adoptToken: this.token,
            roleId:this.roleId,
            panelId: this.selectPanelData.join(',')
          }
          this.$http.post(this.$store.state.domain+'/rolePanel/insertCodeBatch',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('提交成功')
              this.getSelectedPanel()
              this.addPanelDialog = false
            }else{
              this.$message('提交失败')
            }
          },(err)=>{
            this.$message('提交失败')
          })
        },
        commitAddElement(){
          let data = {
            adoptToken: this.token,
            roleId:this.roleId,
            elementId: this.selectElementData.join(','),
            panelId: this.panelId
          }
          this.$http.post(this.$store.state.domain+'/roleElement/insertCodeBatch',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.$message('提交成功')
              this.getSelectedElement()
              this.addElementDialog = false
            }else{
              this.$message('提交失败')
            }
          },(err)=>{
            this.$message('提交失败')
          })
        },
        getSelectedPanel(){
          let data = {
            adoptToken: this.token,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            roleId:this.roleId,
            menuId:this.menuId,
            panelName: this.form.panelName
          }
          this.$http.post(this.$store.state.domain+'/resPanel/queryByRoleSelected',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.totalCount = res.data.result.totalCount
              this.tableData = res.data.result.result
            }else{

            }
          },(err)=>{

          })
        },
        getSelectedElement(){
          let data = {
            adoptToken: this.token,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            roleId:this.roleId,
            menuId:this.menuId,
            panelId: this.panelId,
            elementName: this.form2.elementName
          }
          this.$http.post(this.$store.state.domain+'/element/queryByRoleSelected',qs.stringify(data)).then((res)=>{
            if(res.data.status == 0){
              this.totalCount2 = res.data.result.totalCount
              this.tableData2 = res.data.result.result
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
          this.getSelectedElement()
        },
        panelDelete(index,row){
          this.$http.delete(this.$store.state.domain+'/resPanel',{
              params:{
                adoptToken: this.token,
                panelId: row.panelId
              }
          }).then((res)=>{
            if(res.data.status == 0){
              this.$message('删除成功')
              this.getSelectedPanel()
            }else{
              this.$message('删除失败')
            }
          },(err)=>{

          })
        }
      }
  }
</script>
<style lang="sass" scoped>
  .roleConfig
    margin-top: 40px
    background: #fff
    .pagination-wrapper
      text-align: center
      margin-top: 15px
    .roleConfigPanel
      padding: 20px
      .top
        .left
          display: inline-block
          width: 80%
          margin-right: 15px
          float: left
          margin-bottom: 10px
    .roleConfigElement
      padding: 20px
      .top
        .left
          display: inline-block
          width: 80%
          margin-right: 15px
          float: left
          margin-bottom: 10px
    .selectWrapper
      margin-bottom: 10px
      .el-select
        display: block
    .addPanelBtn
      text-align: center
      margin-top: 10px
</style>
