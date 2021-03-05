import request from '@/utils/request'

// 查询币种管理列表
export function listCurrency(query) {
  return request({
    url: '/currency/currency/list',
    method: 'get',
    params: query
  })
}

// 查询币种管理详细
export function getCurrency(currencyId) {
  return request({
    url: '/currency/currency/' + currencyId,
    method: 'get'
  })
}

// 新增币种管理
export function addCurrency(data) {
  return request({
    url: '/currency/currency',
    method: 'post',
    data: data
  })
}

// 修改币种管理
export function updateCurrency(data) {
  return request({
    url: '/currency/currency',
    method: 'put',
    data: data
  })
}

// 删除币种管理
export function delCurrency(currencyId) {
  return request({
    url: '/currency/currency/' + currencyId,
    method: 'delete'
  })
}

// 导出币种管理
export function exportCurrency(query) {
  return request({
    url: '/currency/currency/export',
    method: 'get',
    params: query
  })
}