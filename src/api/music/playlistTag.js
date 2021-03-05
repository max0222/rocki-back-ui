import request from '@/utils/request'

// 查询歌单标签列表
export function listPlaylistTag(query) {
  return request({
    url: '/music/playlistTag/list',
    method: 'get',
    params: query
  })
}

// 查询歌单标签详细
export function getPlaylistTag(playlistId) {
  return request({
    url: '/music/playlistTag/' + playlistId,
    method: 'get'
  })
}

// 新增歌单标签
export function addPlaylistTag(data) {
  return request({
    url: '/music/playlistTag',
    method: 'post',
    data: data
  })
}

// 修改歌单标签
export function updatePlaylistTag(data) {
  return request({
    url: '/music/playlistTag',
    method: 'put',
    data: data
  })
}

// 删除歌单标签
export function delPlaylistTag(playlistId) {
  return request({
    url: '/music/playlistTag/' + playlistId,
    method: 'delete'
  })
}

// 导出歌单标签
export function exportPlaylistTag(query) {
  return request({
    url: '/music/playlistTag/export',
    method: 'get',
    params: query
  })
}