import request from '@/utils/request'

// 查询token列列表
export function listToken(query) {
  return request({
    url: '/currency/token/list',
    method: 'get',
    params: query
  })
}

// 查询token列详细
export function getToken(id) {
  return request({
    url: '/currency/token/' + id,
    method: 'get'
  })
}

// 新增token列
export function addToken(data) {
  return request({
    url: '/currency/token',
    method: 'post',
    data: data
  })
}

// 修改token列
export function updateToken(data) {
  return request({
    url: '/currency/token',
    method: 'put',
    data: data
  })
}

// 删除token列
export function delToken(id) {
  return request({
    url: '/currency/token/' + id,
    method: 'delete'
  })
}

// 导出token列
export function exportToken(query) {
  return request({
    url: '/currency/token/export',
    method: 'get',
    params: query
  })
}