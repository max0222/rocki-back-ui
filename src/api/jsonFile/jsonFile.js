import request from '@/utils/request'

// 查询视频Json数据文件列表
export function listJsonFile(query) {
  return request({
    url: '/jsonFile/jsonFile/list',
    method: 'get',
    params: query
  })
}

// 查询视频Json数据文件详细
export function getJsonFile(id) {
  return request({
    url: '/jsonFile/jsonFile/' + id,
    method: 'get'
  })
}

// 新增视频Json数据文件
export function addJsonFile(data) {
  return request({
    url: '/jsonFile/jsonFile',
    method: 'post',
    data: data
  })
}

// 修改视频Json数据文件
export function updateJsonFile(data) {
  return request({
    url: '/jsonFile/jsonFile',
    method: 'put',
    data: data
  })
}

// 删除视频Json数据文件
export function delJsonFile(id) {
  return request({
    url: '/jsonFile/jsonFile/' + id,
    method: 'delete'
  })
}

// 导出视频Json数据文件
export function exportJsonFile(query) {
  return request({
    url: '/jsonFile/jsonFile/export',
    method: 'get',
    params: query
  })
}