import request from '@/utils/request'

// 查询USER-SNS-VERIFICATION列表
export function listUserSnsInfo(query) {
  return request({
    url: '/user/userSnsInfo/list',
    method: 'get',
    params: query
  })
}

// 查询USER-SNS-VERIFICATION详细
export function getUserSnsInfo(snsId) {
  return request({
    url: '/user/userSnsInfo/' + snsId,
    method: 'get'
  })
}

// 新增USER-SNS-VERIFICATION
export function addUserSnsInfo(data) {
  return request({
    url: '/user/userSnsInfo',
    method: 'post',
    data: data
  })
}

// 修改USER-SNS-VERIFICATION
export function updateUserSnsInfo(data) {
  return request({
    url: '/user/userSnsInfo',
    method: 'put',
    data: data
  })
}

// 删除USER-SNS-VERIFICATION
export function delUserSnsInfo(snsId) {
  return request({
    url: '/user/userSnsInfo/' + snsId,
    method: 'delete'
  })
}

// 导出USER-SNS-VERIFICATION
export function exportUserSnsInfo(query) {
  return request({
    url: '/user/userSnsInfo/export',
    method: 'get',
    params: query
  })
}