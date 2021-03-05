<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="币种编号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入币种编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种系列" prop="series">
        <el-input
          v-model="queryParams.series"
          placeholder="请输入币种系列"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种英文名" prop="englishName">
        <el-input
          v-model="queryParams.englishName"
          placeholder="请输入币种英文名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总发行量" prop="totalSupply">
        <el-input
          v-model="queryParams.totalSupply"
          placeholder="请输入总发行量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种精度" prop="decimals">
        <el-input
          v-model="queryParams.decimals"
          placeholder="请输入币种精度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合约地址" prop="contractAddress">
        <el-input
          v-model="queryParams.contractAddress"
          placeholder="请输入合约地址"
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
          v-hasPermi="['currency:currency:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['currency:currency:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['currency:currency:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['currency:currency:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="currencyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="currencyId" />
      <el-table-column label="币种编号" align="center" prop="number" />
      <el-table-column label="币种系列" align="center" prop="series" />
      <el-table-column label="币种英文名" align="center" prop="englishName" />
      <el-table-column label="总发行量" align="center" prop="totalSupply" />
      <el-table-column label="币种精度" align="center" prop="decimals" />
      <el-table-column label="合约地址" align="center" prop="contractAddress" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['currency:currency:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['currency:currency:remove']"
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

    <!-- 添加或修改币种管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="币种编号" prop="number">
          <el-input v-model="form.number" placeholder="请输入币种编号" />
        </el-form-item>
        <el-form-item label="币种系列" prop="series">
          <el-input v-model="form.series" placeholder="请输入币种系列" />
        </el-form-item>
        <el-form-item label="币种英文名" prop="englishName">
          <el-input v-model="form.englishName" placeholder="请输入币种英文名" />
        </el-form-item>
        <el-form-item label="总发行量" prop="totalSupply">
          <el-input v-model="form.totalSupply" placeholder="请输入总发行量" />
        </el-form-item>
        <el-form-item label="币种精度" prop="decimals">
          <el-input v-model="form.decimals" placeholder="请输入币种精度" />
        </el-form-item>
        <el-form-item label="合约地址" prop="contractAddress">
          <el-input v-model="form.contractAddress" placeholder="请输入合约地址" />
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
import { listCurrency, getCurrency, delCurrency, addCurrency, updateCurrency, exportCurrency } from "@/api/currency/currency";

export default {
  name: "Currency",
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
      // 币种管理表格数据
      currencyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        number: null,
        series: null,
        englishName: null,
        totalSupply: null,
        decimals: null,
        contractAddress: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        number: [
          { required: true, message: "币种编号不能为空", trigger: "blur" }
        ],
        series: [
          { required: true, message: "币种系列不能为空", trigger: "blur" }
        ],
        englishName: [
          { required: true, message: "币种英文名不能为空", trigger: "blur" }
        ],
        totalSupply: [
          { required: true, message: "总发行量不能为空", trigger: "blur" }
        ],
        decimals: [
          { required: true, message: "币种精度不能为空", trigger: "blur" }
        ],
        contractAddress: [
          { required: true, message: "合约地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询币种管理列表 */
    getList() {
      this.loading = true;
      listCurrency(this.queryParams).then(response => {
        this.currencyList = response.rows;
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
        currencyId: null,
        number: null,
        series: null,
        englishName: null,
        totalSupply: null,
        decimals: null,
        contractAddress: null
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
      this.ids = selection.map(item => item.currencyId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加币种管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const currencyId = row.currencyId || this.ids
      getCurrency(currencyId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改币种管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.currencyId != null) {
            updateCurrency(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addCurrency(this.form).then(response => {
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
      const currencyIds = row.currencyId || this.ids;
      this.$confirm('是否确认删除币种管理编号为"' + currencyIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCurrency(currencyIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有币种管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportCurrency(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
