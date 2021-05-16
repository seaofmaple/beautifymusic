import {require} from './axios'

//获取banner数据
export function getHomeMessage() {
  return require({
    url: '/homepage/block/page'
  })
}

//获取热搜数据
export function getHotSearch() {
  return require({
    url: '/search/hot/detail'
  })
}

//获取推荐歌单数据
export function getRecommendSongs(limit) {
  return require({
    url: '/personalized',
    params: {
      limit
    }
  })
}

//获取推荐mv
export function getRecommendMv() {
  return require({
    url: '/personalized/mv',
  })
}

//获取个人推荐
export function getPrivateSend(limit) {
  return require({
    url: '/personalized/privatecontent/list',
    params: {
      limit
    }
  })
}

//获取新歌
export function getNewMusic(limit) {
  return require({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}

//获取歌单
export function getSongList(cat,offset,limit) {
  return require({
    url: '/top/playlist',
    params: {
      cat,
      offset: offset * limit,
      limit
    }
  })
}

//获取歌单标签
export function getListTags(cat) {
  return require({
    url: '/playlist/catlist',
    params: {
      cat
    }
  })
}

//获取榜单的名字以及图片
export function getRankingTags() {
  return require({
    url: '/toplist/detail'
  })
}

//获取歌手数据
export function getSingerList(area, type, initial, page) {
  return require({
    url: 'artist/list',
    params: {
      area,
      type,
      initial,
      offset : page * 12
    }
  })
}

//获取新碟上架数据
export function getAlbums(area, limit, page, year, month) {
  return require({
    url: '/top/album',
    params: {
      area,
      limit,
      offset: page * limit,
      year,
      month
    }
  })
}

//获取新歌速递数据
export function getNewSongs(type) {
  return require({
    url: '/top/song',
    params: {
      type
    }
  })
}

//获取视频标签列表
export function getVideoTags() {
  return require({
    url: '/video/group/list'
  })
}

//获取全部视频
export function getAllVideo(offset) {
  return require({
    url: '/video/timeline/all',
    params: {
      offset
    }
  })
}

//获取视频标签/分类下的视频
export function getVideoGroup(id) {
  return require({
    url: '/video/group',
    params: {
      id
    }
  })
}

//获取最新mv数据
export function getNewMv(area, limit) {
  return require({
    url: '/mv/first',
    params: {
      area,
      limit
    }
  })
}

//获取网易出品mv
export function getOriginMv(limit, offset) {
  return require({
    url: '/mv/exclusive/rcmd',
    params: { 
      limit, 
      offset
    }
  })
}

//获取mv排行榜
export function getMvRank(area,limit) {
  return require({
    url: '/top/mv',
    params: {
      area,
      limit
    }
  })
}

//获取mv数据
export function getMvList(area, order, type, limit, offset) {
  return require({
    url: '/mv/all',
    params: {
      area, 
      type,
      order, 
      limit, 
      offset: offset * limit
    }
  })
}

//获取音乐的URL
export function getMusicUrl(id) {
  return require({
    url: '/song/url', 
    params: {
      id
    }
  })
}

//获取歌词
export function getLyric(id) {
  return require({
    url: '/lyric',
    params: {
      id
    }
  })
}

//获取歌曲评论
export function getSongComments(id, page) {
  return require({
    url: '/comment/music',
    params: {
      id,
      limit: 20, 
      offset: page * 20
    }
  })
}