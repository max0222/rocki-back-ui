import request from '@/utils/request'

// 查询用户社交链接列表
export function listUserSocialLink(query) {
  return request({
    url: '/user/userSocialLink/list',
    method: 'get',
    params: query
  })
}

// 查询用户社交链接详细
export function getUserSocialLink(id) {
  return request({
    url: '/user/userSocialLink/' + id,
    method: 'get'
  })
}

// 新增用户社交链接
export function addUserSocialLink(data) {
  return request({
    url: '/user/userSocialLink',
    method: 'post',
    data: data
  })
}

// 修改用户社交链接
export function updateUserSocialLink(data) {
  return request({
    url: '/user/userSocialLink',
    method: 'put',
    data: data
  })
}

// 删除用户社交链接
export function delUserSocialLink(id) {
  return request({
    url: '/user/userSocialLink/' + id,
    method: 'delete'
  })
}

// 导出用户社交链接
export function exportUserSocialLink(query) {
  return request({
    url: '/user/userSocialLink/export',
    method: 'get',
    params: query
  })
}