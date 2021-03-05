import request from '@/utils/request'

// 查询用户操作权限列表
export function listUserOperationPermissions(query) {
  return request({
    url: '/user/userOperationPermissions/list',
    method: 'get',
    params: query
  })
}

// 查询用户操作权限详细
export function getUserOperationPermissions(id) {
  return request({
    url: '/user/userOperationPermissions/' + id,
    method: 'get'
  })
}

// 新增用户操作权限
export function addUserOperationPermissions(data) {
  return request({
    url: '/user/userOperationPermissions',
    method: 'post',
    data: data
  })
}

// 修改用户操作权限
export function updateUserOperationPermissions(data) {
  return request({
    url: '/user/userOperationPermissions',
    method: 'put',
    data: data
  })
}

// 删除用户操作权限
export function delUserOperationPermissions(id) {
  return request({
    url: '/user/userOperationPermissions/' + id,
    method: 'delete'
  })
}

// 导出用户操作权限
export function exportUserOperationPermissions(query) {
  return request({
    url: '/user/userOperationPermissions/export',
    method: 'get',
    params: query
  })
}