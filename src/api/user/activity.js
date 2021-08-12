import request from '@/utils/request'

// 查询dapp-stake-activity列表
export function listActivity(query) {
  return request({
    url: '/user/activity/list',
    method: 'get',
    params: query
  })
}

// 查询dapp-stake-activity详细
export function getActivity(id) {
  return request({
    url: '/user/activity/' + id,
    method: 'get'
  })
}

// 新增dapp-stake-activity
export function addActivity(data) {
  return request({
    url: '/user/activity',
    method: 'post',
    data: data
  })
}

// 修改dapp-stake-activity
export function updateActivity(data) {
  return request({
    url: '/user/activity',
    method: 'put',
    data: data
  })
}

// 删除dapp-stake-activity
export function delActivity(id) {
  return request({
    url: '/user/activity/' + id,
    method: 'delete'
  })
}

// 导出dapp-stake-activity
export function exportActivity(query) {
  return request({
    url: '/user/activity/export',
    method: 'get',
    params: query
  })
}