import request from '@/utils/request'

// 查询歌曲贡献者列表
export function listCollaborator(query) {
  return request({
    url: '/music/collaborator/list',
    method: 'get',
    params: query
  })
}

// 查询歌曲贡献者详细
export function getCollaborator(id) {
  return request({
    url: '/music/collaborator/' + id,
    method: 'get'
  })
}

// 新增歌曲贡献者
export function addCollaborator(data) {
  return request({
    url: '/music/collaborator',
    method: 'post',
    data: data
  })
}

// 修改歌曲贡献者
export function updateCollaborator(data) {
  return request({
    url: '/music/collaborator',
    method: 'put',
    data: data
  })
}

// 删除歌曲贡献者
export function delCollaborator(id) {
  return request({
    url: '/music/collaborator/' + id,
    method: 'delete'
  })
}

// 导出歌曲贡献者
export function exportCollaborator(query) {
  return request({
    url: '/music/collaborator/export',
    method: 'get',
    params: query
  })
}