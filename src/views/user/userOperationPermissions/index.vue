<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户地址" prop="userAddress">
        <el-input
          v-model="queryParams.userAddress"
          placeholder="请输入用户地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否允许USDT兑换 0：允许 1：禁止 " prop="isAllowUsdtToAmc">
        <el-input
          v-model="queryParams.isAllowUsdtToAmc"
          placeholder="请输入是否允许USDT兑换 0：允许 1：禁止 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否允许转账 0:允许 1:禁止 " prop="isAllowTransfer">
        <el-input
          v-model="queryParams.isAllowTransfer"
          placeholder="请输入是否允许转账 0:允许 1:禁止 "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否允许提币 0：允许  1:禁止" prop="isAllowWithdraw">
        <el-input
          v-model="queryParams.isAllowWithdraw"
          placeholder="请输入是否允许提币 0：允许  1:禁止"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:userOperationPermissions:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:userOperationPermissions:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:userOperationPermissions:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['user:userOperationPermissions:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userOperationPermissionsList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="是否允许提币 0：允许  1:禁止" align="center" prop="id" />
      <el-table-column label="用户地址" align="center" prop="userAddress" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="是否允许USDT兑换 0：允许 1：禁止 " align="center" prop="isAllowUsdtToAmc" />
      <el-table-column label="是否允许转账 0:允许 1:禁止 " align="center" prop="isAllowTransfer" />
      <el-table-column label="是否允许提币 0：允许  1:禁止" align="center" prop="isAllowWithdraw" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:userOperationPermissions:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:userOperationPermissions:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改用户操作权限对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户地址" prop="userAddress">
          <el-input v-model="form.userAddress" placeholder="请输入用户地址" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="是否允许USDT兑换 0：允许 1：禁止 " prop="isAllowUsdtToAmc">
          <el-input v-model="form.isAllowUsdtToAmc" placeholder="请输入是否允许USDT兑换 0：允许 1：禁止 " />
        </el-form-item>
        <el-form-item label="是否允许转账 0:允许 1:禁止 " prop="isAllowTransfer">
          <el-input v-model="form.isAllowTransfer" placeholder="请输入是否允许转账 0:允许 1:禁止 " />
        </el-form-item>
        <el-form-item label="是否允许提币 0：允许  1:禁止" prop="isAllowWithdraw">
          <el-input v-model="form.isAllowWithdraw" placeholder="请输入是否允许提币 0：允许  1:禁止" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUserOperationPermissions, getUserOperationPermissions, delUserOperationPermissions, addUserOperationPermissions, updateUserOperationPermissions, exportUserOperationPermissions } from "@/api/user/userOperationPermissions";

export default {
  name: "UserOperationPermissions",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户操作权限表格数据
      userOperationPermissionsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userAddress: null,
        userId: null,
        isAllowUsdtToAmc: null,
        isAllowTransfer: null,
        isAllowWithdraw: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userAddress: [
          { required: true, message: "用户地址不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        isAllowUsdtToAmc: [
          { required: true, message: "是否允许USDT兑换 0：允许 1：禁止 不能为空", trigger: "blur" }
        ],
        isAllowTransfer: [
          { required: true, message: "是否允许转账 0:允许 1:禁止 不能为空", trigger: "blur" }
        ],
        isAllowWithdraw: [
          { required: true, message: "是否允许提币 0：允许  1:禁止不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户操作权限列表 */
    getList() {
      this.loading = true;
      listUserOperationPermissions(this.queryParams).then(response => {
        this.userOperationPermissionsList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userAddress: null,
        userId: null,
        isAllowUsdtToAmc: null,
        isAllowTransfer: null,
        isAllowWithdraw: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户操作权限";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUserOperationPermissions(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户操作权限";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUserOperationPermissions(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUserOperationPermissions(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除用户操作权限编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUserOperationPermissions(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有用户操作权限数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUserOperationPermissions(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
