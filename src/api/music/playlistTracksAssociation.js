import request from '@/utils/request'

// 查询歌单和歌曲关联列表
export function listPlaylistTracksAssociation(query) {
  return request({
    url: '/music/playlistTracksAssociation/list',
    method: 'get',
    params: query
  })
}

// 查询歌单和歌曲关联详细
export function getPlaylistTracksAssociation(id) {
  return request({
    url: '/music/playlistTracksAssociation/' + id,
    method: 'get'
  })
}

// 新增歌单和歌曲关联
export function addPlaylistTracksAssociation(data) {
  return request({
    url: '/music/playlistTracksAssociation',
    method: 'post',
    data: data
  })
}

// 修改歌单和歌曲关联
export function updatePlaylistTracksAssociation(data) {
  return request({
    url: '/music/playlistTracksAssociation',
    method: 'put',
    data: data
  })
}

// 删除歌单和歌曲关联
export function delPlaylistTracksAssociation(id) {
  return request({
    url: '/music/playlistTracksAssociation/' + id,
    method: 'delete'
  })
}

// 导出歌单和歌曲关联
export function exportPlaylistTracksAssociation(query) {
  return request({
    url: '/music/playlistTracksAssociation/export',
    method: 'get',
    params: query
  })
}
