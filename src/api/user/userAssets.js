import request from '@/utils/request'

// 查询用户资产列表
export function listUserAssets(query) {
  return request({
    url: '/user/userAssets/list',
    method: 'get',
    params: query
  })
}

// 查询用户资产详细
export function getUserAssets(assetsId) {
  return request({
    url: '/user/userAssets/' + assetsId,
    method: 'get'
  })
}

// 新增用户资产
export function addUserAssets(data) {
  return request({
    url: '/user/userAssets',
    method: 'post',
    data: data
  })
}

// 修改用户资产
export function updateUserAssets(data) {
  return request({
    url: '/user/userAssets',
    method: 'put',
    data: data
  })
}

// 删除用户资产
export function delUserAssets(assetsId) {
  return request({
    url: '/user/userAssets/' + assetsId,
    method: 'delete'
  })
}

// 导出用户资产
export function exportUserAssets(query) {
  return request({
    url: '/user/userAssets/export',
    method: 'get',
    params: query
  })
}