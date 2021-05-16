import { require } from './axios' 

//获取mv详情
export function getMvDetail(mvid) {
  return require({
    url: '/mv/detail',
    params: {
      mvid
    }
  })
}

//获取mv的url
export function getMvUrl(id) {
  return require({
    url: '/mv/url',
    params: {
      id
    }
  })
}

//获取mv的评论
export function getMvComments(id, page, limit=20) {
  return require({
    url: '/comment/mv',
    params: {
      id,
      offset: page * limit,
      limit
    }
  })
}

//获取相似mv
export function getSimilarMv(mvid) {
  return require({
    url: '/simi/mv',
    params: {
      mvid
    }
  })
}