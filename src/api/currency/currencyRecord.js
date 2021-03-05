import request from '@/utils/request'

// 查询交易记录列表
export function listCurrencyRecord(query) {
  return request({
    url: '/currency/currencyRecord/list',
    method: 'get',
    params: query
  })
}

// 查询交易记录详细
export function getCurrencyRecord(currencyRecordId) {
  return request({
    url: '/currency/currencyRecord/' + currencyRecordId,
    method: 'get'
  })
}

// 新增交易记录
export function addCurrencyRecord(data) {
  return request({
    url: '/currency/currencyRecord',
    method: 'post',
    data: data
  })
}

// 修改交易记录
export function updateCurrencyRecord(data) {
  return request({
    url: '/currency/currencyRecord',
    method: 'put',
    data: data
  })
}

// 删除交易记录
export function delCurrencyRecord(currencyRecordId) {
  return request({
    url: '/currency/currencyRecord/' + currencyRecordId,
    method: 'delete'
  })
}

// 导出交易记录
export function exportCurrencyRecord(query) {
  return request({
    url: '/currency/currencyRecord/export',
    method: 'get',
    params: query
  })
}