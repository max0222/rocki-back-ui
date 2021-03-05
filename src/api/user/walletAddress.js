import request from '@/utils/request'

// 查询钱包地址列表
export function listWalletAddress(query) {
  return request({
    url: '/user/walletAddress/list',
    method: 'get',
    params: query
  })
}

// 查询钱包地址详细
export function getWalletAddress(id) {
  return request({
    url: '/user/walletAddress/' + id,
    method: 'get'
  })
}

// 新增钱包地址
export function addWalletAddress(data) {
  return request({
    url: '/user/walletAddress',
    method: 'post',
    data: data
  })
}

// 修改钱包地址
export function updateWalletAddress(data) {
  return request({
    url: '/user/walletAddress',
    method: 'put',
    data: data
  })
}

// 删除钱包地址
export function delWalletAddress(id) {
  return request({
    url: '/user/walletAddress/' + id,
    method: 'delete'
  })
}

// 导出钱包地址
export function exportWalletAddress(query) {
  return request({
    url: '/user/walletAddress/export',
    method: 'get',
    params: query
  })
}