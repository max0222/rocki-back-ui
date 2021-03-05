import request from '@/utils/request'

// 查询歌单列表
export function listTrack(query) {
  return request({
    url: '/music/track/list',
    method: 'get',
    params: query
  })
}

// 查询歌单详细
export function getTrack(id) {
  return request({
    url: '/music/track/' + id,
    method: 'get'
  })
}

// 新增歌单
export function addTrack(data) {
  return request({
    url: '/music/track',
    method: 'post',
    data: data
  })
}

// 修改歌单
export function updateTrack(data) {
  return request({
    url: '/music/track',
    method: 'put',
    data: data
  })
}

// 删除歌单
export function delTrack(id) {
  return request({
    url: '/music/track/' + id,
    method: 'delete'
  })
}

// 导出歌单
export function exportTrack(query) {
  return request({
    url: '/music/track/export',
    method: 'get',
    params: query
  })
}