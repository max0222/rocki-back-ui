import request from '@/utils/request'

// 查询activity apply列表
export function listActivityApply(query) {
  return request({
    url: '/sys/activityApply/list',
    method: 'get',
    params: query
  })
}

// 查询activity apply详细
export function getActivityApply(id) {
  return request({
    url: '/sys/activityApply/' + id,
    method: 'get'
  })
}

// 新增activity apply
export function addActivityApply(data) {
  return request({
    url: '/sys/activityApply',
    method: 'post',
    data: data
  })
}

// 修改activity apply
export function updateActivityApply(data) {
  return request({
    url: '/sys/activityApply',
    method: 'put',
    data: data
  })
}

// 删除activity apply
export function delActivityApply(id) {
  return request({
    url: '/sys/activityApply/' + id,
    method: 'delete'
  })
}

// 导出activity apply
export function exportActivityApply(query) {
  return request({
    url: '/sys/activityApply/export',
    method: 'get',
    params: query
  })
}