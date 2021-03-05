import request from '@/utils/request'

// 查询歌曲标签列表
export function listTrackTag(query) {
  return request({
    url: '/music/trackTag/list',
    method: 'get',
    params: query
  })
}

// 查询歌曲标签详细
export function getTrackTag(trackId) {
  return request({
    url: '/music/trackTag/' + trackId,
    method: 'get'
  })
}

// 新增歌曲标签
export function addTrackTag(data) {
  return request({
    url: '/music/trackTag',
    method: 'post',
    data: data
  })
}

// 修改歌曲标签
export function updateTrackTag(data) {
  return request({
    url: '/music/trackTag',
    method: 'put',
    data: data
  })
}

// 删除歌曲标签
export function delTrackTag(trackId) {
  return request({
    url: '/music/trackTag/' + trackId,
    method: 'delete'
  })
}

// 导出歌曲标签
export function exportTrackTag(query) {
  return request({
    url: '/music/trackTag/export',
    method: 'get',
    params: query
  })
}