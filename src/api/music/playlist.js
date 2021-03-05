import request from '@/utils/request'

// 查询用户歌单列表
export function listPlaylist(query) {
  return request({
    url: '/music/playlist/list',
    method: 'get',
    params: query
  })
}

// 查询用户歌单详细
export function getPlaylist(id) {
  return request({
    url: '/music/playlist/' + id,
    method: 'get'
  })
}

// 新增用户歌单
export function addPlaylist(data) {
  return request({
    url: '/music/playlist',
    method: 'post',
    data: data
  })
}

// 修改用户歌单
export function updatePlaylist(data) {
  return request({
    url: '/music/playlist',
    method: 'put',
    data: data
  })
}

// 删除用户歌单
export function delPlaylist(id) {
  return request({
    url: '/music/playlist/' + id,
    method: 'delete'
  })
}

// 导出用户歌单
export function exportPlaylist(query) {
  return request({
    url: '/music/playlist/export',
    method: 'get',
    params: query
  })
}
