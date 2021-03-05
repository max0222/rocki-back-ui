import request from '@/utils/request'

// 查询用户反馈列表
export function listUserFeedback(query) {
  return request({
    url: '/user/userFeedback/list',
    method: 'get',
    params: query
  })
}

// 查询用户反馈详细
export function getUserFeedback(id) {
  return request({
    url: '/user/userFeedback/' + id,
    method: 'get'
  })
}

// 新增用户反馈
export function addUserFeedback(data) {
  return request({
    url: '/user/userFeedback',
    method: 'post',
    data: data
  })
}

// 修改用户反馈
export function updateUserFeedback(data) {
  return request({
    url: '/user/userFeedback',
    method: 'put',
    data: data
  })
}

// 删除用户反馈
export function delUserFeedback(id) {
  return request({
    url: '/user/userFeedback/' + id,
    method: 'delete'
  })
}

// 导出用户反馈
export function exportUserFeedback(query) {
  return request({
    url: '/user/userFeedback/export',
    method: 'get',
    params: query
  })
}