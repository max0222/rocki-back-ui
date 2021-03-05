<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="币种编号" prop="currencyNumber">
        <el-input
          v-model="queryParams.currencyNumber"
          placeholder="请输入币种编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="完成时间" prop="completeTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.completeTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="记录编号" prop="no">
        <el-input
          v-model="queryParams.no"
          placeholder="请输入记录编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发送地址" prop="fromAddress">
        <el-input
          v-model="queryParams.fromAddress"
          placeholder="请输入发送地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接受地址" prop="receiveAddress">
        <el-input
          v-model="queryParams.receiveAddress"
          placeholder="请输入接受地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易hash" prop="hash">
        <el-input
          v-model="queryParams.hash"
          placeholder="请输入交易hash"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="块高" prop="blockHeight">
        <el-input
          v-model="queryParams.blockHeight"
          placeholder="请输入块高"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易数量" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入交易数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态 -1:失败,0:待处理 1:已完成" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态 -1:失败,0:待处理 1:已完成" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="0:充值, 1:转账 2:提币" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择0:充值, 1:转账 2:提币" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="notes">
        <el-input
          v-model="queryParams.notes"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误计数" prop="count">
        <el-input
          v-model="queryParams.count"
          placeholder="请输入错误计数"
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
          v-hasPermi="['currency:currencyRecord:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['currency:currencyRecord:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['currency:currencyRecord:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['currency:currencyRecord:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="currencyRecordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="currencyRecordId" />
      <el-table-column label="币种编号" align="center" prop="currencyNumber" />
      <el-table-column label="完成时间" align="center" prop="completeTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.completeTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录编号" align="center" prop="no" />
      <el-table-column label="发送地址" align="center" prop="fromAddress" />
      <el-table-column label="接受地址" align="center" prop="receiveAddress" />
      <el-table-column label="交易hash" align="center" prop="hash" />
      <el-table-column label="块高" align="center" prop="blockHeight" />
      <el-table-column label="交易数量" align="center" prop="amount" />
      <el-table-column label="状态 -1:失败,0:待处理 1:已完成" align="center" prop="status" />
      <el-table-column label="0:充值, 1:转账 2:提币" align="center" prop="type" />
      <el-table-column label="备注" align="center" prop="notes" />
      <el-table-column label="错误计数" align="center" prop="count" />
      <el-table-column label="备注(用户填写)" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['currency:currencyRecord:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['currency:currencyRecord:remove']"
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

    <!-- 添加或修改交易记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="币种编号" prop="currencyNumber">
          <el-input v-model="form.currencyNumber" placeholder="请输入币种编号" />
        </el-form-item>
        <el-form-item label="完成时间" prop="completeTime">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.completeTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="记录编号" prop="no">
          <el-input v-model="form.no" placeholder="请输入记录编号" />
        </el-form-item>
        <el-form-item label="发送地址" prop="fromAddress">
          <el-input v-model="form.fromAddress" placeholder="请输入发送地址" />
        </el-form-item>
        <el-form-item label="接受地址" prop="receiveAddress">
          <el-input v-model="form.receiveAddress" placeholder="请输入接受地址" />
        </el-form-item>
        <el-form-item label="交易hash" prop="hash">
          <el-input v-model="form.hash" placeholder="请输入交易hash" />
        </el-form-item>
        <el-form-item label="块高" prop="blockHeight">
          <el-input v-model="form.blockHeight" placeholder="请输入块高" />
        </el-form-item>
        <el-form-item label="交易数量" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入交易数量" />
        </el-form-item>
        <el-form-item label="状态 -1:失败,0:待处理 1:已完成">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="0:充值, 1:转账 2:提币" prop="type">
          <el-select v-model="form.type" placeholder="请选择0:充值, 1:转账 2:提币">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="notes">
          <el-input v-model="form.notes" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="错误计数" prop="count">
          <el-input v-model="form.count" placeholder="请输入错误计数" />
        </el-form-item>
        <el-form-item label="备注(用户填写)" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注(用户填写)" />
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
import { listCurrencyRecord, getCurrencyRecord, delCurrencyRecord, addCurrencyRecord, updateCurrencyRecord, exportCurrencyRecord } from "@/api/currency/currencyRecord";

export default {
  name: "CurrencyRecord",
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
      // 交易记录表格数据
      currencyRecordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        currencyNumber: null,
        completeTime: null,
        no: null,
        fromAddress: null,
        receiveAddress: null,
        hash: null,
        blockHeight: null,
        amount: null,
        status: null,
        type: null,
        notes: null,
        count: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        currencyNumber: [
          { required: true, message: "币种编号不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        no: [
          { required: true, message: "记录编号不能为空", trigger: "blur" }
        ],
        fromAddress: [
          { required: true, message: "发送地址不能为空", trigger: "blur" }
        ],
        receiveAddress: [
          { required: true, message: "接受地址不能为空", trigger: "blur" }
        ],
        hash: [
          { required: true, message: "交易hash不能为空", trigger: "blur" }
        ],
        blockHeight: [
          { required: true, message: "块高不能为空", trigger: "blur" }
        ],
        amount: [
          { required: true, message: "交易数量不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "状态 -1:失败,0:待处理 1:已完成不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "0:充值, 1:转账 2:提币不能为空", trigger: "change" }
        ],
        notes: [
          { required: true, message: "备注不能为空", trigger: "blur" }
        ],
        count: [
          { required: true, message: "错误计数不能为空", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "备注(用户填写)不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询交易记录列表 */
    getList() {
      this.loading = true;
      listCurrencyRecord(this.queryParams).then(response => {
        this.currencyRecordList = response.rows;
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
        currencyRecordId: null,
        currencyNumber: null,
        completeTime: null,
        createTime: null,
        no: null,
        fromAddress: null,
        receiveAddress: null,
        hash: null,
        blockHeight: null,
        amount: null,
        status: 0,
        type: null,
        notes: null,
        count: null,
        remark: null
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
      this.ids = selection.map(item => item.currencyRecordId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加交易记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const currencyRecordId = row.currencyRecordId || this.ids
      getCurrencyRecord(currencyRecordId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改交易记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.currencyRecordId != null) {
            updateCurrencyRecord(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCurrencyRecord(this.form).then(response => {
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
      const currencyRecordIds = row.currencyRecordId || this.ids;
      this.$confirm('是否确认删除交易记录编号为"' + currencyRecordIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCurrencyRecord(currencyRecordIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有交易记录数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCurrencyRecord(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
