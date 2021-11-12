<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="USER ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="user id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="VERIFIED ADDRESS" prop="userAddress">
        <el-input
          v-model="queryParams.userAddress"
          placeholder="Verified address"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="KYC ID" prop="kycId">
        <el-input
          v-model="queryParams.kycId"
          placeholder="kyc id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="SNS ID" prop="snsId">
        <el-input
          v-model="queryParams.snsId"
          placeholder="sns id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="1 as kyc certified, 2 as sns certified, 3 as CERTIFIED ARTIST, -1  as blocked, 4 as allowed to create new verification" prop="status">-->
      <!--        <el-select v-model="queryParams.status" placeholder="请选择1 as kyc certified, 2 as sns certified, 3 as CERTIFIED ARTIST, -1  as blocked, 4 as allowed to create new verification" clearable size="small">-->
      <!--          <el-option label="请选择字典生成" value="" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="times of ceritied" prop="times">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.times"-->
      <!--          placeholder="请输入times of ceritied"-->
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
      <!--      <el-form-item label="update_at" prop="updateAt">-->
      <!--        <el-date-picker clearable size="small" style="width: 200px"-->
      <!--          v-model="queryParams.updateAt"-->
      <!--          type="date"-->
      <!--          value-format="yyyy-MM-dd"-->
      <!--          placeholder="选择update_at">-->
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
    <!--          v-hasPermi="['user:artistCertifiedId:add']"-->
    <!--        >新增</el-button>-->
    <!--      </el-col>-->
    <!--      <el-col :span="1.5">-->
    <!--        <el-button-->
    <!--          type="success"-->
    <!--          icon="el-icon-edit"-->
    <!--          size="mini"-->
    <!--          :disabled="single"-->
    <!--          @click="handleUpdate"-->
    <!--          v-hasPermi="['user:artistCertifiedId:edit']"-->
    <!--        >Modify</el-button>-->
    <!--      </el-col>-->
    <!--      <el-col :span="1.5">-->
    <!--        <el-button-->
    <!--          type="danger"-->
    <!--          icon="el-icon-delete"-->
    <!--          size="mini"-->
    <!--          :disabled="multiple"-->
    <!--          @click="handleDelete"-->
    <!--          v-hasPermi="['user:artistCertifiedId:remove']"-->
    <!--        >删除</el-button>-->
    <!--      </el-col>-->
    <!--      <el-col :span="1.5">-->
    <!--        <el-button-->
    <!--          type="warning"-->
    <!--          icon="el-icon-download"-->
    <!--          size="mini"-->
    <!--          @click="handleExport"-->
    <!--          v-hasPermi="['user:artistCertifiedId:export']"-->
    <!--        >导出</el-button>-->
    <!--      </el-col>-->
    <!--	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
    <!--    </el-row>-->

    <el-table v-loading="loading" :data="artistCertifiedIdList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="artist certified id" align="center" prop="id"/>
      <el-table-column label="user id" align="center" prop="userId"/>
      <el-table-column label="Verified address" align="center" prop="userAddress"/>
      <el-table-column label="kyc id" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="showKycInfo(scope.row)"
            v-hasPermi="['user:artistCertifiedId:edit']"
          >{{ scope.row.kycId }}
          </el-button>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['user:artistCertifiedId:remove']"-->
          <!--          >delete</el-button>-->
        </template>
      </el-table-column>
      <el-table-column label="sns id" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="showSnsInfo(scope.row)"
            v-hasPermi="['user:artistCertifiedId:edit']"
          >{{ scope.row.snsId }}
          </el-button>
          <!--          <el-button-->
          <!--            size="mini"-->
          <!--            type="text"-->
          <!--            icon="el-icon-delete"-->
          <!--            @click="handleDelete(scope.row)"-->
          <!--            v-hasPermi="['user:artistCertifiedId:remove']"-->
          <!--          >delete</el-button>-->
        </template>
      </el-table-column>
      <el-table-column
        label="1 as kyc certified, 2 as sns certified, 3 as CERTIFIED ARTIST, -1  as blocked, 4 as allowed to create new verification"
        align="center" prop="status"/>
      <el-table-column label="times of ceritied" align="center" prop="times"/>
      <el-table-column label="create at" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="update_at" align="center" prop="updateAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="operating" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:artistCertifiedId:edit']"
          >modify
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:artistCertifiedId:remove']"
          >delete
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

    <el-dialog title="kyc-info" :visible.sync="kycInfo" width="500px" append-to-body>
      <el-form ref="form" :model="kycForm" :rules="rules" label-width="100px">
        <el-form-item label="user id" prop="userId">
          <span>{{ kycForm.userId }}</span>
        </el-form-item>
        <el-form-item label="region" prop="region">
          <span>{{ kycForm.region }}</span>
        </el-form-item>
        <el-form-item label="doc id" prop="docId">
          <span>{{ kycForm.docId }}</span>
        </el-form-item>
        <el-form-item label="doc type" prop="docType">
          <span>{{ kycForm.docType }}</span>
        </el-form-item>
        <el-form-item label="name_in_doc" prop="nameInDoc">
          <span>{{ kycForm.nameInDoc }}</span>
        </el-form-item>
        <el-form-item label="owner_did" prop="ownerDid">
          <span>{{ kycForm.ownerDid }}</span>
        </el-form-item>
        <el-form-item label="encrypt Origin Data" prop="encryptData">
          <div :style="{maxHeight: '200px', overflow: 'auto'}">{{ kycForm.encryptData }}</div>
        </el-form-item>
        <el-form-item label="request time stamp" prop="requesttime">
          <span>{{ kycForm.requesttime }}</span>
        </el-form-item>
        <el-form-item label="create at" prop="createAt">
          <span>{{ kycForm.createAt }}</span>
        </el-form-item>
        <el-form-item label="update at" prop="updateAt">
          <span>{{ kycForm.updateAt }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog title="sns-info" :visible.sync="snsInfo" width="500px" append-to-body>
      <el-form ref="form" :model="snsForm" :rules="rules" label-width="100px">
        <el-form-item label="user id" prop="userId">
          <span>{{ snsForm.userId }}</span>
        </el-form-item>
        <el-form-item label="auth type" prop="authtype">
          <span>{{ snsForm.authtype }}</span>
        </el-form-item>
        <el-form-item label="encrypt data" prop="encryptdata">
          <div :style="{maxHeight: '200px', overflow: 'auto'}">{{ snsForm.encryptdata }}</div>
        </el-form-item>
        <el-form-item label="social Link" prop="encryptdata">
          <a :href="decodeAddress(snsForm.encryptdata)" target="_blank">{{decodeAddress(snsForm.encryptdata)}}</a>
        </el-form-item>
        <el-form-item label="request time" prop="requesttime">
          <span>{{ snsForm.requesttime }}</span>
        </el-form-item>
        <el-form-item label="create at" prop="createAt">
          <span>{{ snsForm.createAt }}</span>
        </el-form-item>
        <el-form-item label="update at" prop="updateAt">
          <span>{{ snsForm.updateAt }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="user id" prop="userId">
          <span>{{ form.userId }}</span>
          <!--          <el-input v-model="form.userId" placeholder="请输入user id" />-->
        </el-form-item>
        <el-form-item label="Verified address" prop="userAddress">
          <span>{{ form.userAddress }}</span>
        </el-form-item>
        <!--        <el-form-item label="kyc id" prop="kycId">-->
        <!--          <span>{{form.kycId}}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="sns id" prop="snsId">-->
        <!--          <span>{{form.snsId}}</span>-->
        <!--        </el-form-item>-->
        <el-form-item
          label="1 as kyc certified, 2 as sns certified, 3 as CERTIFIED ARTIST, -1  as blocked, 4 as allowed to create new verification">
          <el-radio-group v-model="form.status">
            <el-radio label="-1">BLOCKED</el-radio>
          </el-radio-group>
          <el-radio-group v-model="form.status">
            <el-radio label="1">KYC CERTIFIED</el-radio>
          </el-radio-group>
          <el-radio-group v-model="form.status">
            <el-radio label="2">SNS CERTIFIED</el-radio>
          </el-radio-group>
          <el-radio-group v-model="form.status">
            <el-radio label="3">CERTIFIED ARTIEST</el-radio>
          </el-radio-group>
          <el-radio-group v-model="form.status">
            <el-radio label="4">MODIFY ALLOWED</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--        <el-form-item label="times of ceritied" prop="times">-->
        <!--          <span>{{form.times}}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="create at" prop="createAt">-->
        <!--          <span>{{form.createAt}}</span>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="update_at" prop="updateAt">-->
        <!--          <span>{{form.updateAt}}</span>-->
        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">Confirm</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listArtistCertifiedId,
  getArtistCertifiedId,
  delArtistCertifiedId,
  addArtistCertifiedId,
  updateArtistCertifiedId,
  exportArtistCertifiedId
} from "@/api/user/artistCertifiedId";
import {getUserKycInfo} from "../../../api/user/userKycInfo";
import {getUserSnsInfo} from "../../../api/user/userSnsInfo";
import {queryAddress} from '@/utils/jsencrypt';

export default {
  name: "ArtistCertifiedId",
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
      artistCertifiedIdList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      kycInfo: false,
      snsInfo: false,
      initModifyStatus: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userAddress: null,
        kycId: null,
        snsId: null,
        status: null,
        times: null,
        createAt: null,
        updateAt: null
      },
      kycInfoParam: {
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
      snsInfoParam: {
        snsId: null,
        userId: null,
        authtype: null,
        encryptdata: null,
        requesttime: null,
        createAt: null,
        updateAt: null
      },
      // 表单参数
      form: {},
      kycForm: {},
      snsForm: {},
      // 表单校验
      rules: {
        userId: [
          {required: true, message: "user id不能为空", trigger: "blur"}
        ],
        userAddress: [
          {required: true, message: "Verified address不能为空", trigger: "blur"}
        ],
        kycId: [
          {required: true, message: "kyc id不能为空", trigger: "blur"}
        ],
        snsId: [
          {required: true, message: "sns id不能为空", trigger: "blur"}
        ],
        status: [
          {
            required: true,
            message: "1 as kyc certified, 2 as sns certified, 3 as CERTIFIED ARTIST, -1  as blocked, 4 as allowed to create new verification不能为空",
            trigger: "blur"
          }
        ],
        times: [
          {required: true, message: "times of ceritied不能为空", trigger: "blur"}
        ],
        createAt: [
          {required: true, message: "create at不能为空", trigger: "blur"}
        ],
        updateAt: [
          {required: true, message: "update_at不能为空", trigger: "blur"}
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
      listArtistCertifiedId(this.queryParams).then(response => {
        this.artistCertifiedIdList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 解码社交链接
    decodeAddress(data) {
      return data? queryAddress(data):'';
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
        userId: null,
        userAddress: null,
        kycId: null,
        snsId: null,
        status: 0,
        times: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
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
      const id = row.id || this.ids
      getArtistCertifiedId(id).then(response => {
        response.data.status = String(response.data.status)
        this.form = response.data;
        this.open = true;
        this.title = "Modify USER-VERIFICATION";
        this.initModifyStatus = response.data?.status;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.form.status === this.initModifyStatus) {
            this.msgError("状态一样, 不能修改成功，请检查！");
          } else if (this.form.id != null) {
            updateArtistCertifiedId(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addArtistCertifiedId(this.form).then(response => {
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
      this.$confirm('是否确认删除编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delArtistCertifiedId(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      }).catch(function () {
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有【请填写功能名称】数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return exportArtistCertifiedId(queryParams);
      }).then(response => {
        this.download(response.msg);
      }).catch(function () {
      });
    },
    showKycInfo(row) {
      const kycId = row.kycId
      getUserKycInfo(kycId).then(response => {
        this.kycForm = response.data;
        this.kycInfo = true;
      });
    },
    showSnsInfo(row) {
      const snsId = row.snsId
      getUserSnsInfo(snsId).then(response => {
        this.snsForm = response.data;
        this.snsInfo = true;
      })
    }
  }
};
</script>
