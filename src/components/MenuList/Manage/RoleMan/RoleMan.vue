<template>
  <div class="role-man">
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
    <div class="role-main">
      <el-form :model="form" label-width="80px" inline="">
        <el-form-item label="角色编码">
          <el-input v-model="form.ID"></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="系统名称">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button type="success">新增</el-button>
      </el-form>
      <el-table
        :data="tableData"
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
              @click="roleEdit(scope.$index, scope.row)"
              type="primary">配置</el-button>
            <el-button
              size="small"
              @click="roleDelete(scope.$index, scope.row)"
              type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        explain: '角色维护',
        form:{

        },
        tableData: [{
          name: 1,
          address: 2
        }],
      }
    },
    methods: {
      roleEdit(){
        this.$router.push('/Content/RoleManDetail')
      },
      roleDelete(){

      }
    }
  }
</script>
<style lang="sass" scoped>
  .role-man
    margin-top: 40px
    background: #fff
    .role-main
      padding: 20px
</style>
