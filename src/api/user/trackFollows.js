import request from '@/utils/request'

// 查询用户关注的歌曲表列表
export function listTrackFollows(query) {
  return request({
    url: '/user/trackFollows/list',
    method: 'get',
    params: query
  })
}

// 查询用户关注的歌曲表详细
export function getTrackFollows(id) {
  return request({
    url: '/user/trackFollows/' + id,
    method: 'get'
  })
}

// 新增用户关注的歌曲表
export function addTrackFollows(data) {
  return request({
    url: '/user/trackFollows',
    method: 'post',
    data: data
  })
}

// 修改用户关注的歌曲表
export function updateTrackFollows(data) {
  return request({
    url: '/user/trackFollows',
    method: 'put',
    data: data
  })
}

// 删除用户关注的歌曲表
export function delTrackFollows(id) {
  return request({
    url: '/user/trackFollows/' + id,
    method: 'delete'
  })
}

// 导出用户关注的歌曲表
export function exportTrackFollows(query) {
  return request({
    url: '/user/trackFollows/export',
    method: 'get',
    params: query
  })
}