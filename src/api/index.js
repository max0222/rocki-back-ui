import request from '@/utils/request'

export function listUserStatistics() {
  return request({
    url: '/home/list/newUserStatistics',
    method: 'get'
  })
}

export function listTrackStatistics() {
  return request({
    url: '/home/list/newTrackStatistics',
    method: 'get'
  })
}
