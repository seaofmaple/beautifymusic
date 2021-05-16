import { require } from './axios'

//视频播放地址
export function getVideoUrl(id) {
  return require({
    url: '/video/url',
    params: {
      id
    }
  })
}
//视频详细信息
export function getVideoDetail(id) {
  return require({
    url: '/video/detail',
    params: {
      id
    }
  })
}

//
export function getVideoRelative(id) {
  return require({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}

//获取视频评论
export function getVideoComment(id, page, limit) {
  return require({
    url: '/comment/video',
    params: {
      id,
      offset: page * limit,
      limit
    }
  })
}