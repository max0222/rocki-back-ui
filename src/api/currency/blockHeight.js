import request from '@/utils/request'

// 查询区块链高度列表
export function listBlockHeight(query) {
  return request({
    url: '/currency/blockHeight/list',
    method: 'get',
    params: query
  })
}

// 查询区块链高度详细
export function getBlockHeight(id) {
  return request({
    url: '/currency/blockHeight/' + id,
    method: 'get'
  })
}

// 新增区块链高度
export function addBlockHeight(data) {
  return request({
    url: '/currency/blockHeight',
    method: 'post',
    data: data
  })
}

// 修改区块链高度
export function updateBlockHeight(data) {
  return request({
    url: '/currency/blockHeight',
    method: 'put',
    data: data
  })
}

// 删除区块链高度
export function delBlockHeight(id) {
  return request({
    url: '/currency/blockHeight/' + id,
    method: 'delete'
  })
}

// 导出区块链高度
export function exportBlockHeight(query) {
  return request({
    url: '/currency/blockHeight/export',
    method: 'get',
    params: query
  })
}