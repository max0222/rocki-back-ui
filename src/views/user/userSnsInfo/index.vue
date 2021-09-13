<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="SNS ID" prop="snsId">
        <el-input
          v-model="queryParams.snsId"
          placeholder="SNS ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="USER ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="USER ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="auth type" prop="authtype">-->
      <!--        <el-select v-model="queryParams.authtype" placeholder="请选择auth type" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="encrypt data" prop="encryptdata">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.encryptdata"-->
      <!--          placeholder="请输入encrypt data"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="request time" prop="requesttime">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.requesttime"-->
      <!--          placeholder="请输入request time"-->
      <!--          clearable-->
      <!--          size="small"-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">Search</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="primary"-->
      <!--          icon="el-icon-plus"-->
      <!--          size="mini"-->
      <!--          @click="handleAdd"-->
      <!--          v-hasPermi="['user:userSnsInfo:add']"-->
      <!--        >新增-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="success"-->
      <!--          icon="el-icon-edit"-->
      <!--          size="mini"-->
      <!--          :disabled="single"-->
      <!--          @click="handleUpdate"-->
      <!--          v-hasPermi="['user:userSnsInfo:edit']"-->
      <!--        >修改-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="danger"-->
      <!--          icon="el-icon-delete"-->
      <!--          size="mini"-->
      <!--          :disabled="multiple"-->
      <!--          @click="handleDelete"-->
      <!--          v-hasPermi="['user:userSnsInfo:remove']"-->
      <!--        >删除-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <!--      <el-col :span="1.5">-->
      <!--        <el-button-->
      <!--          type="warning"-->
      <!--          icon="el-icon-download"-->
      <!--          size="mini"-->
      <!--          @click="handleExport"-->
      <!--          v-hasPermi="['user:userSnsInfo:export']"-->
      <!--        >导出-->
      <!--        </el-button>-->
      <!--      </el-col>-->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userSnsInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="sns id" align="center" prop="snsId"/>
      <el-table-column label="user id" align="center" prop="userId"/>
      <el-table-column label="auth type" align="center" prop="authtype"/>
      <el-table-column label="encrypt data" align="center" prop="encryptdata"/>
      <el-table-column label="social link" align="center" prop="socialLink"/>
      <el-table-column label="request time" align="center" prop="requesttime"/>
      <el-table-column label="create at" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="update at" align="center" prop="updateAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-edit"-->
          <!--            @click="handleUpdate(scope.row)"-->
          <!--            v-hasPermi="['user:userSnsInfo:edit']"-->
          <!--          >修改-->
          <!--      </el-button>-->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:userSnsInfo:remove']"
          >Delete
          </el-button>
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

    <!-- 添加或修改USER-SNS-VERIFICATION对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="user id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入user id"/>
        </el-form-item>
        <el-form-item label="auth type" prop="authtype">
          <el-select v-model="form.authtype" placeholder="请选择auth type">
            <el-option label="请选择字典生成" value=""/>
          </el-select>
        </el-form-item>
        <el-form-item label="encrypt data" prop="encryptdata">
          <el-input v-model="form.encryptdata" placeholder="请输入encrypt data"/>
        </el-form-item>
        <el-form-item label="request time" prop="requesttime">
          <el-input v-model="form.requesttime" placeholder="请输入request time"/>
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
import {
  listUserSnsInfo,
  getUserSnsInfo,
  delUserSnsInfo,
  addUserSnsInfo,
  updateUserSnsInfo,
  exportUserSnsInfo
} from "@/api/user/userSnsInfo";

export default {
  name: "UserSnsInfo",
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
      // USER-SNS-VERIFICATION表格数据
      userSnsInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        snsId: null,
        userId: null,
        authtype: null,
        encryptdata: null,
        requesttime: null,
        createAt: null,
        updateAt: null,
        socialLink: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        snsId: [
          {required: true, message: "kyc id不能为空", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "user id不能为空", trigger: "blur"}
        ],
        authtype: [
          {required: true, message: "auth type不能为空", trigger: "change"}
        ],
        encryptdata: [
          {required: true, message: "encrypt data不能为空", trigger: "blur"}
        ],
        requesttime: [
          {required: true, message: "request time不能为空", trigger: "blur"}
        ],
        createAt: [
          {required: true, message: "create at不能为空", trigger: "blur"}
        ],
        updateAt: [
          {required: true, message: "update at不能为空", trigger: "blur"}
        ],
        socialLink: [
          {required: true, message: "social link不能为空", trigger: "blur"}
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询USER-SNS-VERIFICATION列表 */
    getList() {
      this.loading = true;
      listUserSnsInfo(this.queryParams).then(response => {
        this.userSnsInfoList = response.rows;
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
        snsId: null,
        userId: null,
        authtype: null,
        encryptdata: null,
        requesttime: null,
        createAt: null,
        updateAt: null,
        socialLink: null
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
      this.ids = selection.map(item => item.snsId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加USER-SNS-VERIFICATION";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const snsId = row.snsId || this.ids
      getUserSnsInfo(snsId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改USER-SNS-VERIFICATION";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.snsId != null) {
            updateUserSnsInfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUserSnsInfo(this.form).then(response => {
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
      const snsIds = row.snsId || this.ids;
      this.$confirm('是否确认删除USER-SNS-VERIFICATION编号为"' + snsIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delUserSnsInfo(snsIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有USER-SNS-VERIFICATION数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportUserSnsInfo(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function () {
      });
    }
  }
};
</script>
