<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="email" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="Enter Email Address"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="username" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="Enter Username"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="full_name" prop="fullName">
        <el-input
          v-model="queryParams.fullName"
          placeholder="Enter Full Name"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="Phone" prop="mobile">-->
<!--        <el-input-->
<!--          v-model="queryParams.mobile"-->
<!--          placeholder="Enter Phone"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="invitation code" prop="invitationCode">
        <el-input
          v-model="queryParams.invitationCode"
          placeholder="Enter Invitation Code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="invitation number" prop="totalInvites">
        <el-input
          v-model="queryParams.totalInvites"
          placeholder="Enter Invitation Number"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="parent id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="Enter Parent user id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="登陆密码" prop="password">-->
<!--        <el-input-->
<!--          v-model="queryParams.password"-->
<!--          placeholder="请输入登陆密码"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="交易密码" prop="tradersPassword">-->
<!--        <el-input-->
<!--          v-model="queryParams.tradersPassword"-->
<!--          placeholder="请输入交易密码"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="Last login time" prop="lastLoginTime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.lastLoginTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Switch last lgoin time">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="最后一次登录ip" prop="lastLoginIp">-->
<!--        <el-input-->
<!--          v-model="queryParams.lastLoginIp"-->
<!--          placeholder="请输入最后一次登录ip"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="用户ERC20地址" prop="address">-->
<!--        <el-input-->
<!--          v-model="queryParams.address"-->
<!--          placeholder="请输入用户ERC20地址"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="加密私钥" prop="privateKey">-->
<!--        <el-input-->
<!--          v-model="queryParams.privateKey"-->
<!--          placeholder="请输入加密私钥"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="文件链接" prop="headImageUrl">-->
<!--        <el-input-->
<!--          v-model="queryParams.headImageUrl"-->
<!--          placeholder="请输入文件链接"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="AvatarLink" prop="avatarUrl">-->
<!--        <el-input-->
<!--          v-model="queryParams.avatarUrl"-->
<!--          placeholder="请输入头像链接"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="artist or audience" prop="artistsType">
        <el-select v-model="queryParams.artistsType" placeholder="Artist Or Not (1 as artist, 2 as audience)" clearable size="small">
          <el-option label="Artist" value="1" />
          <el-option label="Audience" value="2" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="关注者人数" prop="followers">-->
<!--        <el-input-->
<!--          v-model="queryParams.followers"-->
<!--          placeholder="请输入关注者人数"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="艺人描述" prop="description">-->
<!--        <el-input-->
<!--          v-model="queryParams.description"-->
<!--          placeholder="请输入艺人描述"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="Playlist Count" prop="playlistCount">
        <el-input
          v-model="queryParams.playlistCount"
          placeholder="Enter Number of Playlist Count"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Track Count" prop="trackCount">
        <el-input
          v-model="queryParams.trackCount"
          placeholder="Enter number of track count"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="user status" prop="status">
        <el-select v-model="queryParams.status" placeholder="Switch User Status" clearable size="small">
          <el-option label="Inactivated" value="-1" />
          <el-option label="Normal" value="0" />
          <el-option label="Frozen" value="1" />
          <el-option label="Disable" value="2" />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="赚取的rocki" prop="rockiEarned">-->
<!--        <el-input-->
<!--          v-model="queryParams.rockiEarned"-->
<!--          placeholder="请输入赚取的rocki"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="余额" prop="notesbalance">-->
<!--        <el-input-->
<!--          v-model="queryParams.notesbalance"-->
<!--          placeholder="notesbalance"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否是提供艺人服务的艺人 1 提供" prop="videoServer">-->
<!--        <el-input-->
<!--          v-model="queryParams.videoServer"-->
<!--          placeholder="请输入是否是提供艺人服务的艺人 1 提供"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="国家" prop="country">-->
<!--        <el-input-->
<!--          v-model="queryParams.country"-->
<!--          placeholder="请输入国家"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="bio" prop="bio">-->
<!--        <el-input-->
<!--          v-model="queryParams.bio"-->
<!--          placeholder="请输入生平"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="生日" prop="birth">-->
<!--        <el-date-picker clearable size="small" style="width: 200px"-->
<!--          v-model="queryParams.birth"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="选择生日">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item label="social link" prop="socialLink">
        <el-input
          v-model="queryParams.socialLink"
          placeholder="Enter social link"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="用户社会ID存储链接" prop="passport">-->
<!--        <el-input-->
<!--          v-model="queryParams.passport"-->
<!--          placeholder="请输入用户社会ID存储链接"-->
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
<!--          v-hasPermi="['user:user:add']"-->
<!--        >Add</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['user:user:edit']"
        >Modify</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['user:user:remove']"
        >Delete</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="warning"-->
<!--          icon="el-icon-download"-->
<!--          size="mini"-->
<!--          @click="handleExport"-->
<!--          v-hasPermi="['user:user:export']"-->
<!--        >导出</el-button>-->
<!--      </el-col>-->
	  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="User ID" align="center" prop="userId" />
      <el-table-column label="Email" align="center" prop="email" />
      <el-table-column label="Username" align="center" prop="username" />
      <el-table-column label="Full Name" align="center" prop="fullName" />
<!--      <el-table-column label="手机号" align="center" prop="mobile" />-->
      <el-table-column label="Invitation Code" align="center" prop="invitationCode" />
      <el-table-column label="Invitation Count" align="center" prop="totalInvites" />
      <el-table-column label="Parent ID" align="center" prop="parentId" />
<!--      <el-table-column label="登陆密码" align="center" prop="password" />-->
<!--      <el-table-column label="交易密码" align="center" prop="tradersPassword" />-->
      <el-table-column label="Last login time" align="center" prop="lastLoginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.lastLoginTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Last login ip" align="center" prop="lastLoginIp" />
<!--      <el-table-column label="用户ERC20地址" align="center" prop="address" />-->
<!--      <el-table-column label="加密私钥" align="center" prop="privateKey" />-->
<!--      <el-table-column label="文件链接" align="center" prop="headImageUrl" />-->
      <el-table-column label="Avatar Url" align="center" prop="avatarUrl" />
      <el-table-column label="Artist or audience" align="center" prop="artistsType" />
      <el-table-column label="Follow count" align="center" prop="followers" />
      <el-table-column label="Artist Description" align="center" prop="description" />
      <el-table-column label="Playlist count" align="center" prop="playlistCount" />
      <el-table-column label="Track count" align="center" prop="trackCount" />
      <el-table-column label="User status (-1 as inactivated, 0 as normal, 1 as frozen, 2 as disable)" align="center" prop="status" />
<!--      <el-table-column label="Lifetime earned ROCKS" align="center" prop="rockiEarned" />-->
      <el-table-column label="Lifetime earned ROCKS" align="center" prop="notesbalance" />
<!--      <el-table-column label="是否是提供艺人服务的艺人 1 提供" align="center" prop="videoServer" />-->
<!--      <el-table-column label="国家" align="center" prop="country" />-->
      <el-table-column label="Bio" align="center" prop="bio" />
<!--      <el-table-column label="生日" align="center" prop="birth" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.birth, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="Social link" align="center" prop="socialLink" />
<!--      <el-table-column label="用户社会ID存储链接" align="center" prop="passport" />-->
      <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['user:user:edit']"
          >modify</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['user:user:remove']"
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

    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="Enter email" />
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Enter username" />
        </el-form-item>
        <el-form-item label="Full name" prop="fullName">
          <el-input v-model="form.fullName" placeholder="Enter full name" />
        </el-form-item>
<!--        <el-form-item label="手机号" prop="mobile">-->
<!--          <el-input v-model="form.mobile" placeholder="请输入手机号" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Invitation Code" prop="invitationCode">-->
<!--          <el-input v-model="form.invitationCode" placeholder="Enter Invitation Code" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="邀请的人数" prop="totalInvites">-->
<!--          <el-input v-model="form.totalInvites" placeholder="请输入邀请的人数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="上级用户ID" prop="parentId">-->
<!--          <el-input v-model="form.parentId" placeholder="请输入上级用户ID" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="登陆密码" prop="password">-->
<!--          <el-input v-model="form.password" placeholder="请输入登陆密码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="交易密码" prop="tradersPassword">-->
<!--          <el-input v-model="form.tradersPassword" placeholder="请输入交易密码" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="最后一次登录时间" prop="lastLoginTime">-->
<!--          <el-date-picker clearable size="small" style="width: 200px"-->
<!--            v-model="form.lastLoginTime"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择最后一次登录时间">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="最后一次登录ip" prop="lastLoginIp">-->
<!--          <el-input v-model="form.lastLoginIp" placeholder="请输入最后一次登录ip" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户ERC20地址" prop="address">-->
<!--          <el-input v-model="form.address" placeholder="请输入用户ERC20地址" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="加密私钥" prop="privateKey">-->
<!--          <el-input v-model="form.privateKey" placeholder="请输入加密私钥" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="文件链接" prop="headImageUrl">-->
<!--          <el-input v-model="form.headImageUrl" placeholder="请输入文件链接" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Avatar Url" prop="avatarUrl">-->
<!--          <el-input v-model="form.avatarUrl" placeholder="请输入头像链接" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Artist or audience" prop="artistsType">-->
<!--          <el-select v-model="form.artistsType" placeholder="请选择是否是艺人 0 不是 1 是艺人">-->
<!--            <el-option label="请选择字典生成" value="" />-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="关注者人数" prop="followers">-->
<!--          <el-input v-model="form.followers" placeholder="请输入关注者人数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="艺人描述" prop="description">-->
<!--          <el-input v-model="form.description" placeholder="请输入艺人描述" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Playlist Count" prop="playlistCount">-->
<!--          <el-input v-model="form.playlistCount" placeholder="请输入歌单总数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="Track count" prop="trackCount">-->
<!--          <el-input v-model="form.trackCount" placeholder="请输入歌曲总数" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="状态:-1 未激活 0正常 1冻结 2禁用">-->
<!--          <el-radio-group v-model="form.status">-->
<!--            <el-radio label="1">请选择字典生成</el-radio>-->
<!--          </el-radio-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="赚取的rocki" prop="rockiEarned">-->
<!--          <el-input v-model="form.rockiEarned" placeholder="请输入赚取的rocki" />-->
<!--        </el-form-item>-->
        <el-form-item label="Lifetime earned ROCKS" prop="notesbalance">
          <el-input v-model="form.notesbalance" placeholder="Enter count" />
        </el-form-item>
<!--        <el-form-item label="是否是提供艺人服务的艺人 1 提供" prop="videoServer">-->
<!--          <el-input v-model="form.videoServer" placeholder="请输入是否是提供艺人服务的艺人 1 提供" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="国家" prop="country">-->
<!--          <el-input v-model="form.country" placeholder="请输入国家" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="生平" prop="bio">-->
<!--          <el-input v-model="form.bio" placeholder="请输入生平" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="生日" prop="birth">-->
<!--          <el-date-picker clearable size="small" style="width: 200px"-->
<!--            v-model="form.birth"-->
<!--            type="date"-->
<!--            value-format="yyyy-MM-dd"-->
<!--            placeholder="选择生日">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="社交链接" prop="socialLink">-->
<!--          <el-input v-model="form.socialLink" placeholder="请输入社交链接" />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="用户社会ID存储链接" prop="passport">-->
<!--          <el-input v-model="form.passport" placeholder="请输入用户社会ID存储链接" />-->
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
import { listUser, getUser, delUser, addUser, updateUser, exportUser } from "@/api/user/user";

export default {
  name: "User",
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
      // 用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        email: null,
        username: null,
        fullName: null,
        mobile: null,
        invitationCode: null,
        totalInvites: null,
        parentId: null,
        password: null,
        tradersPassword: null,
        lastLoginTime: null,
        lastLoginIp: null,
        address: null,
        privateKey: null,
        headImageUrl: null,
        avatarUrl: null,
        artistsType: null,
        followers: null,
        description: null,
        playlistCount: null,
        trackCount: null,
        status: null,
        rockiEarned: null,
        notesbalance: null,
        videoServer: null,
        country: null,
        bio: null,
        birth: null,
        socialLink: null,
        passport: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        email: [
          { required: true, message: "Email address cannot be null", trigger: "blur" }
        ],
        username: [
          { required: true, message: "Username cannot be null", trigger: "blur" }
        ],
        fullName: [
          { required: true, message: "Full name cannot be null", trigger: "blur" }
        ],
        // mobile: [
        //   { required: true, message: "手机号不能为空", trigger: "blur" }
        // ],
        invitationCode: [
          { required: true, message: "invitation code cannot be null", trigger: "blur" }
        ],
        // totalInvites: [
        //   { required: true, message: "邀请的人数不能为空", trigger: "blur" }
        // ],
        parentId: [
          { required: true, message: "parent id cannot be null", trigger: "blur" }
        ],
        // password: [
        //   { required: true, message: "登陆密码不能为空", trigger: "blur" }
        // ],
        // tradersPassword: [
        //   { required: true, message: "交易密码不能为空", trigger: "blur" }
        // ],
        // createTime: [
        //   { required: true, message: "注册时间不能为空", trigger: "blur" }
        // ],
        // updateTime: [
        //   { required: true, message: "修改日期不能为空", trigger: "blur" }
        // ],
        // lastLoginTime: [
        //   { required: true, message: "最后一次登录时间不能为空", trigger: "blur" }
        // ],
        // lastLoginIp: [
        //   { required: true, message: "最后一次登录ip不能为空", trigger: "blur" }
        // ],
        // address: [
        //   { required: true, message: "用户ERC20地址不能为空", trigger: "blur" }
        // ],
        // privateKey: [
        //   { required: true, message: "加密私钥不能为空", trigger: "blur" }
        // ],
        // headImageUrl: [
        //   { required: true, message: "文件链接不能为空", trigger: "blur" }
        // ],
        // avatarUrl: [
        //   { required: true, message: "头像链接不能为空", trigger: "blur" }
        // ],
        artistsType: [
          { required: true, message: "是否是艺人 0 不是 1 是艺人不能为空", trigger: "change" }
        ],
        followers: [
          { required: true, message: "关注者人数不能为空", trigger: "blur" }
        ],
        // description: [
        //   { required: true, message: "艺人描述不能为空", trigger: "blur" }
        // ],
        // playlistCount: [
        //   { required: true, message: "歌单总数不能为空", trigger: "blur" }
        // ],
        // trackCount: [
        //   { required: true, message: "歌曲总数不能为空", trigger: "blur" }
        // ],
        // status: [
        //   { required: true, message: "状态:-1 未激活 0正常 1冻结 2禁用不能为空", trigger: "blur" }
        // ],
        // rockiEarned: [
        //   { required: true, message: "赚取的rocki不能为空", trigger: "blur" }
        // ],
        notesbalance: [
          { required: true, message: "Cannot be null", trigger: "blur" }
        ],
        // videoServer: [
        //   { required: true, message: "是否是提供艺人服务的艺人 1 提供不能为空", trigger: "blur" }
        // ],
        // country: [
        //   { required: true, message: "国家不能为空", trigger: "blur" }
        // ],
        // bio: [
        //   { required: true, message: "生平不能为空", trigger: "blur" }
        // ],
        // birth: [
        //   { required: true, message: "生日不能为空", trigger: "blur" }
        // ],
        socialLink: [
          { required: true, message: "Cannot be null", trigger: "blur" }
        ]
        // passport: [
        //   { required: true, message: "用户社会ID存储链接不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
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
        userId: null,
        email: null,
        username: null,
        fullName: null,
        mobile: null,
        invitationCode: null,
        totalInvites: null,
        parentId: null,
        password: null,
        tradersPassword: null,
        createTime: null,
        updateTime: null,
        lastLoginTime: null,
        lastLoginIp: null,
        address: null,
        privateKey: null,
        headImageUrl: null,
        avatarUrl: null,
        artistsType: null,
        followers: null,
        description: null,
        playlistCount: null,
        trackCount: null,
        status: 0,
        rockiEarned: null,
        notesbalance: null,
        videoServer: null,
        country: null,
        bio: null,
        birth: null,
        socialLink: null,
        passport: null
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
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    // /** 新增按钮操作 */
    // handleAdd() {
    //   this.reset();
    //   this.open = true;
    //   this.title = "Add an user account info";
    // },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids
      getUser(userId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "Modify user account info";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != null) {
            updateUser(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("MODIFY SUCCESS");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUser(this.form).then(response => {
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
      const userIds = row.userId || this.ids;
      this.$confirm('Are you sure to delete the user whose id is"' + userIds + '"?', "WARNING", {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }).then(function() {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("DELETE SUCCESS");
        }).catch(function() {});
    }
    /** 导出按钮操作 */
    // handleExport() {
    //   const queryParams = this.queryParams;
    //   this.$confirm('是否确认导出所有用户数据项?', "警告", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(function() {
    //       return exportUser(queryParams);
    //     }).then(response => {
    //       this.download(response.msg);
    //     }).catch(function() {});
    // }
  }
};
</script>
