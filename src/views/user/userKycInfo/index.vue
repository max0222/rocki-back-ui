<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="KYC ID" prop="kycId">
        <el-input
          v-model="queryParams.kycId"
          placeholder="KYC ID"
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
<!--      <el-form-item label="region" prop="region">-->
<!--        <el-input-->
<!--          v-model="queryParams.region"-->
<!--          placeholder="请输入region"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="doc id" prop="docId">-->
<!--        <el-input-->
<!--          v-model="queryParams.docId"-->
<!--          placeholder="请输入doc id"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="doc type" prop="docType">-->
<!--        <el-select v-model="queryParams.docType" placeholder="请选择doc type" clearable size="small">-->
<!--          <el-option label="请选择字典生成" value="" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="name_in_doc" prop="nameInDoc">-->
<!--        <el-input-->
<!--          v-model="queryParams.nameInDoc"-->
<!--          placeholder="请输入name_in_doc"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="owner_did" prop="ownerDid">-->
<!--        <el-input-->
<!--          v-model="queryParams.ownerDid"-->
<!--          placeholder="请输入owner_did"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="encrypt Origin Data" prop="encryptData">-->
<!--        <el-input-->
<!--          v-model="queryParams.encryptData"-->
<!--          placeholder="请输入encrypt Origin Data"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="request time stamp" prop="requesttime">-->
<!--        <el-input-->
<!--          v-model="queryParams.requesttime"-->
<!--          placeholder="请输入request time stamp"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="create at" prop="createAt">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.createAt"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择create at">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="update at" prop="updateAt">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.updateAt"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择update at">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">Search</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">Reset</el-button>
      </el-form-item>
    </el-form>

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['user:userKycInfo:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="success"-->
<!--          icon="el-icon-edit"-->
<!--          size="mini"-->
<!--          :disabled="single"-->
<!--          @click="handleUpdate"-->
<!--          v-hasPermi="['user:userKycInfo:edit']"-->
<!--        >Modify</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['user:userKycInfo:remove']"-->
<!--        >Delete</el-button>-->
<!--      </el-col>-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['user:userKycInfo:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
<!--	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="userKycInfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="kyc id" align="center" prop="kycId" />
      <el-table-column label="user id" align="center" prop="userId" />
      <el-table-column label="region" align="center" prop="region" />
      <el-table-column label="doc id" align="center" prop="docId" />
      <el-table-column label="doc type" align="center" prop="docType" />
      <el-table-column label="name_in_doc" align="center" prop="nameInDoc" />
      <el-table-column label="owner_did" align="center" prop="ownerDid" />
      <el-table-column label="encrypt Origin Data" align="center" prop="encryptData" />
      <el-table-column label="request time stamp" align="center" prop="requesttime" />
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
<!--      <el-table-column label="operating" align="center" class-name="small-padding fixed-width">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-edit"-->
<!--            @click="handleUpdate(scope.row)"-->
<!--            v-hasPermi="['user:userKycInfo:edit']"-->
<!--          >modify</el-button>-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['user:userKycInfo:remove']"-->
<!--          >delete</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="user id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入user id" />
        </el-form-item>
        <el-form-item label="region" prop="region">
          <el-input v-model="form.region" placeholder="请输入region" />
        </el-form-item>
        <el-form-item label="doc id" prop="docId">
          <el-input v-model="form.docId" placeholder="请输入doc id" />
        </el-form-item>
        <el-form-item label="doc type" prop="docType">
          <el-select v-model="form.docType" placeholder="请选择doc type">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="name_in_doc" prop="nameInDoc">
          <el-input v-model="form.nameInDoc" placeholder="请输入name_in_doc" />
        </el-form-item>
        <el-form-item label="owner_did" prop="ownerDid">
          <el-input v-model="form.ownerDid" placeholder="请输入owner_did" />
        </el-form-item>
        <el-form-item label="encrypt Origin Data" prop="encryptData">
          <el-input v-model="form.encryptData" placeholder="请输入encrypt Origin Data" />
        </el-form-item>
        <el-form-item label="request time stamp" prop="requesttime">
          <el-input v-model="form.requesttime" placeholder="请输入request time stamp" />
        </el-form-item>
        <el-form-item label="create at" prop="createAt">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.createAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择create at">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="update at" prop="updateAt">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.updateAt"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择update at">
          </el-date-picker>
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
import { listUserKycInfo, getUserKycInfo, delUserKycInfo, addUserKycInfo, updateUserKycInfo, exportUserKycInfo } from "@/api/user/userKycInfo";

export default {
  name: "UserKycInfo",
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
      // 【请填写功能名称】表格数据
      userKycInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        kycId: null,
        userId: null,
        region: null,
        docId: null,
        docType: null,
        nameInDoc: null,
        ownerDid: null,
        encryptData: null,
        requesttime: null,
        createAt: null,
        updateAt: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        kycId: [
          { required: true, message: "kyc id不能为空", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "user id不能为空", trigger: "blur" }
        ],
        region: [
          { required: true, message: "region不能为空", trigger: "blur" }
        ],
        docId: [
          { required: true, message: "doc id不能为空", trigger: "blur" }
        ],
        docType: [
          { required: true, message: "doc type不能为空", trigger: "change" }
        ],
        nameInDoc: [
          { required: true, message: "name_in_doc不能为空", trigger: "blur" }
        ],
        ownerDid: [
          { required: true, message: "owner_did不能为空", trigger: "blur" }
        ],
        encryptData: [
          { required: true, message: "encrypt Origin Data不能为空", trigger: "blur" }
        ],
        requesttime: [
          { required: true, message: "request time stamp不能为空", trigger: "blur" }
        ],
        createAt: [
          { required: true, message: "create at不能为空", trigger: "blur" }
        ],
        updateAt: [
          { required: true, message: "update at不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true;
      listUserKycInfo(this.queryParams).then(response => {
        this.userKycInfoList = response.rows;
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
        kycId: null,
        userId: null,
        region: null,
        docId: null,
        docType: null,
        nameInDoc: null,
        ownerDid: null,
        encryptData: null,
        requesttime: null,
        createAt: null,
        updateAt: null
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
      this.ids = selection.map(item => item.kycId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加【请填写功能名称】";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const kycId = row.kycId || this.ids
      getUserKycInfo(kycId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改【请填写功能名称】";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.kycId != null) {
            updateUserKycInfo(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUserKycInfo(this.form).then(response => {
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
      const kycIds = row.kycId || this.ids;
      this.$confirm('是否确认删除【请填写功能名称】编号为"' + kycIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUserKycInfo(kycIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportUserKycInfo(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
