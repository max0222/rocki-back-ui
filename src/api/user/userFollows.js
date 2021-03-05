import request from '@/utils/request'

// 查询用户关注者列表
export function listUserFollows(query) {
  return request({
    url: '/user/userFollows/list',
    method: 'get',
    params: query
  })
}

// 查询用户关注者详细
export function getUserFollows(id) {
  return request({
    url: '/user/userFollows/' + id,
    method: 'get'
  })
}

// 新增用户关注者
export function addUserFollows(data) {
  return request({
    url: '/user/userFollows',
    method: 'post',
    data: data
  })
}

// 修改用户关注者
export function updateUserFollows(data) {
  return request({
    url: '/user/userFollows',
    method: 'put',
    data: data
  })
}

// 删除用户关注者
export function delUserFollows(id) {
  return request({
    url: '/user/userFollows/' + id,
    method: 'delete'
  })
}

// 导出用户关注者
export function exportUserFollows(query) {
  return request({
    url: '/user/userFollows/export',
    method: 'get',
    params: query
  })
}