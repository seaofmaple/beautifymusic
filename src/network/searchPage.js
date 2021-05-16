import {require} from './axios'

//搜索到的信息
export function getSearchInfo(keywords, page, limit, type) {
  return require({
    url: '/cloudsearch',
    params: {
      keywords,
      type,
      offset: limit * page,
      limit
    }
  })
}
