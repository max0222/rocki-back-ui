import request from '@/utils/request'

// 查询收益记录列表
export function listIncomeRecord(query) {
  return request({
    url: '/user/incomeRecord/list',
    method: 'get',
    params: query
  })
}

// 查询收益记录详细
export function getIncomeRecord(id) {
  return request({
    url: '/user/incomeRecord/' + id,
    method: 'get'
  })
}

// 新增收益记录
export function addIncomeRecord(data) {
  return request({
    url: '/user/incomeRecord',
    method: 'post',
    data: data
  })
}

// 修改收益记录
export function updateIncomeRecord(data) {
  return request({
    url: '/user/incomeRecord',
    method: 'put',
    data: data
  })
}

// 删除收益记录
export function delIncomeRecord(id) {
  return request({
    url: '/user/incomeRecord/' + id,
    method: 'delete'
  })
}

// 导出收益记录
export function exportIncomeRecord(query) {
  return request({
    url: '/user/incomeRecord/export',
    method: 'get',
    params: query
  })
}