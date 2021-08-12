<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="activity type, 1 as stake, 2as burn" prop="type">
        <el-select v-model="queryParams.type" placeholder="activity type, 1 as stake, 2as burn" clearable size="small">
          <el-option label="stake" value="1" />
          <el-option label="burn" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="pool contract address " prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="pool contract address "
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="block num that contract created at" prop="block">
        <el-input
          v-model="queryParams.block"
          placeholder="block num that contract created at"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="chain id" prop="chainId">
        <el-input
          v-model="queryParams.chainId"
          placeholder="chain id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">search</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">reset</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['user:activity:add']"
        >add</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:activity:edit']"
        >modify</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['user:activity:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['user:activity:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="activityList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="activity id" align="center" prop="id" />
      <el-table-column label="activity type, 1 as stake, 2as burn" align="center" prop="type" />
      <el-table-column label="pool contract address " align="center" prop="address" />
      <el-table-column label="block num that contract created at" align="center" prop="block" />
      <el-table-column label="chain id" align="center" prop="chainId" />
      <el-table-column label="create at" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="operating" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:activity:edit']"
          >modify</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:activity:remove']"
          >delete</el-button>
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

    <!-- 添加或修改dapp-stake-activity对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="activity type, 1 as stake, 2as burn" prop="type">
          <el-select v-model="form.type" placeholder="activity type, 1 as stake, 2as burn">
            <el-option label="stake" value="1" />
            <el-option label="burn" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="pool contract address " prop="address">
          <el-input v-model="form.address" placeholder="pool contract address " />
        </el-form-item>
        <el-form-item label="block num that contract created at" prop="block">
          <el-input v-model="form.block" placeholder="block num that contract created at" />
        </el-form-item>
        <el-form-item label="chain id" prop="chainId">
          <el-input v-model="form.chainId" placeholder="chain id" />
        </el-form-item>
        <el-form-item label="create at" prop="createAt">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="create at">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">sure</el-button>
        <el-button @click="cancel">cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listActivity, getActivity, delActivity, addActivity, updateActivity, exportActivity } from "@/api/user/activity";

export default {
  name: "Activity",
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
      // dapp-stake-activity表格数据
      activityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: null,
        address: null,
        block: null,
        chainId: null,
        createAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          { required: true, message: "activity type, 1 as stake, 2as burn cannot be null", trigger: "change" }
        ],
        address: [
          { required: true, message: "pool contract address cannot be null", trigger: "blur" }
        ],
        block: [
          { required: true, message: "block num that contract created at cannot be null", trigger: "blur" }
        ],
        chainId: [
          { required: true, message: "chain id cannot be null", trigger: "blur" }
        ],
        createAt: [
          { required: true, message: "create at cannot be null", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询dapp-stake-activity列表 */
    getList() {
      this.loading = true;
      listActivity(this.queryParams).then(response => {
        this.activityList = response.rows;
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
        type: null,
        address: null,
        block: null,
        chainId: null,
        createAt: null
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
      this.title = "add dapp-stake-activity";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getActivity(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "modift dapp-stake-activity";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateActivity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("success");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addActivity(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("success");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    // handleDelete(row) {
    //   const ids = row.id || this.ids;
    //   this.$confirm('是否确认删除dapp-stake-activity编号为"' + ids + '"的数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return delActivity(ids);
    //     }).then(() => {
    //       this.getList();
    //       this.msgSuccess("删除成功");
    //     }).catch(function() {});
    // },
    // /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有dapp-stake-activity数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return exportActivity(queryParams);
    //     }).then(response => {
    //       this.download(response.msg);
    //     }).catch(function() {});
    // }
  }
};
</script>
