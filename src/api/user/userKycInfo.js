import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listUserKycInfo(query) {
  return request({
    url: '/user/userKycInfo/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getUserKycInfo(kycId) {
  return request({
    url: '/user/userKycInfo/' + kycId,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addUserKycInfo(data) {
  return request({
    url: '/user/userKycInfo',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateUserKycInfo(data) {
  return request({
    url: '/user/userKycInfo',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delUserKycInfo(kycId) {
  return request({
    url: '/user/userKycInfo/' + kycId,
    method: 'delete'
  })
}

// 导出【请填写功能名称】
export function exportUserKycInfo(query) {
  return request({
    url: '/user/userKycInfo/export',
    method: 'get',
    params: query
  })
}