import request from '@/utils/request'

// 查询歌曲歌单标签列表
export function listTag(query) {
  return request({
    url: '/music/tag/list',
    method: 'get',
    params: query
  })
}

// 查询歌曲歌单标签详细
export function getTag(id) {
  return request({
    url: '/music/tag/' + id,
    method: 'get'
  })
}

// 新增歌曲歌单标签
export function addTag(data) {
  return request({
    url: '/music/tag',
    method: 'post',
    data: data
  })
}

// 修改歌曲歌单标签
export function updateTag(data) {
  return request({
    url: '/music/tag',
    method: 'put',
    data: data
  })
}

// 删除歌曲歌单标签
export function delTag(id) {
  return request({
    url: '/music/tag/' + id,
    method: 'delete'
  })
}

// 导出歌曲歌单标签
export function exportTag(query) {
  return request({
    url: '/music/tag/export',
    method: 'get',
    params: query
  })
}