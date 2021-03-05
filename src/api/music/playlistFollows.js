import request from '@/utils/request'

// 查询关注歌单列表
export function listPlaylistFollows(query) {
  return request({
    url: '/music/playlistFollows/list',
    method: 'get',
    params: query
  })
}

// 查询关注歌单详细
export function getPlaylistFollows(id) {
  return request({
    url: '/music/playlistFollows/' + id,
    method: 'get'
  })
}

// 新增关注歌单
export function addPlaylistFollows(data) {
  return request({
    url: '/music/playlistFollows',
    method: 'post',
    data: data
  })
}

// 修改关注歌单
export function updatePlaylistFollows(data) {
  return request({
    url: '/music/playlistFollows',
    method: 'put',
    data: data
  })
}

// 删除关注歌单
export function delPlaylistFollows(id) {
  return request({
    url: '/music/playlistFollows/' + id,
    method: 'delete'
  })
}

// 导出关注歌单
export function exportPlaylistFollows(query) {
  return request({
    url: '/music/playlistFollows/export',
    method: 'get',
    params: query
  })
}
