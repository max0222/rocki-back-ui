import request from '@/utils/request'

// 查询token资产列表
export function listTokenAssets(query) {
  return request({
    url: '/currency/tokenAssets/list',
    method: 'get',
    params: query
  })
}

// 查询token资产详细
export function getTokenAssets(id) {
  return request({
    url: '/currency/tokenAssets/' + id,
    method: 'get'
  })
}

// 新增token资产
export function addTokenAssets(data) {
  return request({
    url: '/currency/tokenAssets',
    method: 'post',
    data: data
  })
}

// 修改token资产
export function updateTokenAssets(data) {
  return request({
    url: '/currency/tokenAssets',
    method: 'put',
    data: data
  })
}

// 删除token资产
export function delTokenAssets(id) {
  return request({
    url: '/currency/tokenAssets/' + id,
    method: 'delete'
  })
}

// 导出token资产
export function exportTokenAssets(query) {
  return request({
    url: '/currency/tokenAssets/export',
    method: 'get',
    params: query
  })
}