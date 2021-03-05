<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="歌单id" prop="playlistId">
        <el-input
          v-model="queryParams.playlistId"
          placeholder="请输入歌单id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="歌曲id" prop="trackId">
        <el-input
          v-model="queryParams.trackId"
          placeholder="请输入歌曲id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="歌曲名称" prop="trackTitle">
        <el-input
          v-model="queryParams.trackTitle"
          placeholder="请输入歌曲名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="艺人名称" prop="artist">
        <el-input
          v-model="queryParams.artist"
          placeholder="请输入艺人名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="歌曲上传时间" prop="uploadDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.uploadDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择歌曲上传时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="歌曲时长 单位秒" prop="trackLength">
        <el-input
          v-model="queryParams.trackLength"
          placeholder="请输入歌曲时长 单位秒"
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
          v-hasPermi="['music:playlistTracksAssociation:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['music:playlistTracksAssociation:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['music:playlistTracksAssociation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['music:playlistTracksAssociation:export']"
        >导出</el-button>
      </el-col>
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="playlistTracksAssociationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键id" align="center" prop="id" />
      <el-table-column label="歌单id" align="center" prop="playlistId" />
      <el-table-column label="歌曲id" align="center" prop="trackId" />
      <el-table-column label="歌曲名称" align="center" prop="trackTitle" />
      <el-table-column label="艺人名称" align="center" prop="artist" />
      <el-table-column label="歌曲上传时间" align="center" prop="uploadDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.uploadDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌曲时长 单位秒" align="center" prop="trackLength" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['music:playlistTracksAssociation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['music:playlistTracksAssociation:remove']"
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

    <!-- 添加或修改歌单和歌曲关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="歌单id" prop="playlistId">
          <el-input v-model="form.playlistId" placeholder="请输入歌单id" />
        </el-form-item>
        <el-form-item label="歌曲id" prop="trackId">
          <el-input v-model="form.trackId" placeholder="请输入歌曲id" />
        </el-form-item>
        <el-form-item label="歌曲名称" prop="trackTitle">
          <el-input v-model="form.trackTitle" placeholder="请输入歌曲名称" />
        </el-form-item>
        <el-form-item label="艺人名称" prop="artist">
          <el-input v-model="form.artist" placeholder="请输入艺人名称" />
        </el-form-item>
        <el-form-item label="歌曲上传时间" prop="uploadDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.uploadDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择歌曲上传时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="歌曲时长 单位秒" prop="trackLength">
          <el-input v-model="form.trackLength" placeholder="请输入歌曲时长 单位秒" />
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
import { listPlaylistTracksAssociation, getPlaylistTracksAssociation, delPlaylistTracksAssociation, addPlaylistTracksAssociation, updatePlaylistTracksAssociation, exportPlaylistTracksAssociation } from "@/api/music/playlistTracksAssociation";

export default {
  name: "PlaylistTracksAssociation",
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
      // 歌单和歌曲关联表格数据
      playlistTracksAssociationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        playlistId: null,
        trackId: null,
        trackTitle: null,
        artist: null,
        uploadDate: null,
        trackLength: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        playlistId: [
          { required: true, message: "歌单id不能为空", trigger: "blur" }
        ],
        trackId: [
          { required: true, message: "歌曲id不能为空", trigger: "blur" }
        ],
        trackTitle: [
          { required: true, message: "歌曲名称不能为空", trigger: "blur" }
        ],
        artist: [
          { required: true, message: "艺人名称不能为空", trigger: "blur" }
        ],
        uploadDate: [
          { required: true, message: "歌曲上传时间不能为空", trigger: "blur" }
        ],
        trackLength: [
          { required: true, message: "歌曲时长 单位秒不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询歌单和歌曲关联列表 */
    getList() {
      this.loading = true;
      listPlaylistTracksAssociation(this.queryParams).then(response => {
        this.playlistTracksAssociationList = response.rows;
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
        playlistId: null,
        trackId: null,
        trackTitle: null,
        artist: null,
        uploadDate: null,
        trackLength: null
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
      this.title = "添加歌单和歌曲关联";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPlaylistTracksAssociation(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改歌单和歌曲关联";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlaylistTracksAssociation(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPlaylistTracksAssociation(this.form).then(response => {
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
      this.$confirm('是否确认删除歌单和歌曲关联编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPlaylistTracksAssociation(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有歌单和歌曲关联数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPlaylistTracksAssociation(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
