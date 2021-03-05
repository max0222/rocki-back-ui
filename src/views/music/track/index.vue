<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="Track title" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="Enter track title"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="User id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="Enter user id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Artist name" prop="artist">
        <el-input
          v-model="queryParams.artist"
          placeholder="Enter User name"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="歌单分红" prop="playlistSplit">-->
<!--        <el-input-->
<!--          v-model="queryParams.playlistSplit"-->
<!--          placeholder="请输入歌单分红"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="这首歌获利总数" prop="rocksEarned">-->
<!--        <el-input-->
<!--          v-model="queryParams.rocksEarned"-->
<!--          placeholder="请输入这首歌获利总数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="Stream count" prop="streamCount">
        <el-input
          v-model="queryParams.streamCount"
          placeholder="Enter stream count"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Duration (second)" prop="length">
        <el-input
          v-model="queryParams.length"
          placeholder="Enter duration of track (second)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="released date" prop="releaseDate">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.releaseDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Enter released date">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="Update time" prop="uploadDate">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.uploadDate"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="Enter Update time">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="图片url" prop="image">-->
<!--        <el-input-->
<!--          v-model="queryParams.image"-->
<!--          placeholder="请输入图片url"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="存储地址url" prop="storageUrl">-->
<!--        <el-input-->
<!--          v-model="queryParams.storageUrl"-->
<!--          placeholder="请输入存储地址url"-->
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
<!--          v-hasPermi="['music:track:add']"-->
<!--        >Add</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['music:track:edit']"
        >Modify</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['music:track:remove']"
        >Delete</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['music:track:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="trackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="Track ID" align="center" prop="id" />
      <el-table-column label="Track name" align="center" prop="title" />
      <el-table-column label="User Id" align="center" prop="userId" />
      <el-table-column label="Artist name" align="center" prop="artist" />
<!--      <el-table-column label="Track split" align="center" prop="playlistSplit" />-->
<!--      <el-table-column label="这首歌获利总数" align="center" prop="rocksEarned" />-->
      <el-table-column label="Stream count" align="center" prop="streamCount" />
      <el-table-column label="Track description" align="center" prop="description" />
      <el-table-column label="Duration (second)" align="center" prop="length" />
      <el-table-column label="Release date" align="center" prop="releaseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.releaseDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="更新时间" align="center" prop="uploadDate" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.uploadDate, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="图片url" align="center" prop="image" />-->
<!--      <el-table-column label="存储地址url" align="center" prop="storageUrl" />-->
      <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['music:track:edit']"
          >Modify</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['music:track:remove']"
          >Delete</el-button>
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

    <!-- 添加或修改歌单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Track name" prop="title">
          <el-input v-model="form.title" placeholder="Enter track name" />
        </el-form-item>
        <el-form-item label="User id" prop="userId">
          <el-input v-model="form.userId" placeholder="Enter User id" />
        </el-form-item>
        <el-form-item label="Artist name" prop="artist">
          <el-input v-model="form.artist" placeholder="enter artist name" />
        </el-form-item>
<!--        <el-form-item label="Playlist split" prop="playlistSplit">-->
<!--          <el-input v-model="form.playlistSplit" placeholder="请输入歌单分红" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="这首歌获利总数" prop="rocksEarned">-->
<!--          <el-input v-model="form.rocksEarned" placeholder="请输入这首歌获利总数" />-->
<!--        </el-form-item>-->
        <el-form-item label="Stream count" prop="streamCount">
          <el-input v-model="form.streamCount" placeholder="Enter stream count" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="Enter description" />
        </el-form-item>
        <el-form-item label="Duration" prop="length">
          <el-input v-model="form.length" placeholder="Enter duration (second)" />
        </el-form-item>
        <el-form-item label="Release date" prop="releaseDate">
          <el-date-picker clearable size="small" style="width: 200px"
            v-model="form.releaseDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="Switch release date">
          </el-date-picker>
        </el-form-item>
<!--        <el-form-item label="更新时间" prop="uploadDate">-->
<!--          <el-date-picker clearable size="small" style="width: 200px"-->
<!--            v-model="form.uploadDate"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择更新时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="图片url" prop="image">-->
<!--          <el-input v-model="form.image" placeholder="请输入图片url" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="存储地址url" prop="storageUrl">-->
<!--          <el-input v-model="form.storageUrl" placeholder="请输入存储地址url" />-->
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
import { listTrack, getTrack, delTrack, addTrack, updateTrack, exportTrack } from "@/api/music/track";

export default {
  name: "Track",
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
      // 歌单表格数据
      trackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        userId: null,
        artist: null,
        playlistSplit: null,
        rocksEarned: null,
        streamCount: null,
        description: null,
        length: null,
        releaseDate: null,
        uploadDate: null,
        image: null,
        storageUrl: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [
          { required: true, message: "Cannot be null", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        artist: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        playlistSplit: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        rocksEarned: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        streamCount: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        description: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        length: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        releaseDate: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        uploadDate: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        image: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ],
        storageUrl: [
          { required: true, message: "Cannot be nul", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询歌单列表 */
    getList() {
      this.loading = true;
      listTrack(this.queryParams).then(response => {
        this.trackList = response.rows;
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
        title: null,
        userId: null,
        artist: null,
        playlistSplit: null,
        rocksEarned: null,
        streamCount: null,
        description: null,
        length: null,
        releaseDate: null,
        uploadDate: null,
        image: null,
        storageUrl: null
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
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "添加歌单";
    // },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTrack(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "Modify";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTrack(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("MODIFY SUCCESS");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addTrack(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("ADD SUCCESS");
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
      this.$confirm('Are you sure to delete the track which id is "' + ids + '"?', "WARNING", {
          confirmButtonText: "CONFIRM",
          cancelButtonText: "CANCEL",
          type: "warning"
        }).then(function() {
          return delTrack(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("CANCEL SUCCESS");
        }).catch(function() {});
    }
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有歌单数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return exportTrack(queryParams);
    //     }).then(response => {
    //       this.download(response.msg);
    //     }).catch(function() {});
    // }
  }
};
</script>
