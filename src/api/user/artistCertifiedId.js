import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listArtistCertifiedId(query) {
  return request({
    url: '/user/artistCertifiedId/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getArtistCertifiedId(id) {
  return request({
    url: '/user/artistCertifiedId/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addArtistCertifiedId(data) {
  return request({
    url: '/user/artistCertifiedId',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateArtistCertifiedId(data) {
  return request({
    url: '/user/artistCertifiedId',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delArtistCertifiedId(id) {
  return request({
    url: '/user/artistCertifiedId/' + id,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportArtistCertifiedId(query) {
  return request({
    url: '/user/artistCertifiedId/export',
    method: 'get',
    params: query
  })
}
