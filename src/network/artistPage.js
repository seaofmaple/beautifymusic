import { require } from './axios'

//获取歌手单曲
export function getArtistSongs(id) {
  return require({
    url: 'artists',
    params: {
      id
    }
  })
}

//获取歌手的专辑
export function getArtistAlbum(id,page,limit) {
  return require({
    url: '/artist/album',
    params: {
      id,
      offset: page * limit,
      limit
    }
  })
}

//获取专辑的内容
export function getAlbumInfo(id) {
  return require({
    url: '/album',
    params: {
      id
    }
  })
}

//获取专辑评论
export function getAlbumComments(id, page, limit) {
  return require({
    url: '/comment/album',
    params: {
      id,
      offset: page *limit,
      limit
    }
  })
}

//获取歌手描述
export function getArtistDesc(id) {
  return require({
    url:  '/artist/desc',
    params: {
      id
    }
  })
}

//获取歌手mv
export function getArtistMv(id, page, limit) {
  return require({
    url: '/artist/mv',
    params: {
      id,
      offset: page * limit,
      limit
    }
  })
}

//获取相似歌手
export function getSimilarArtists(id) {
  return require({
    url: '/simi/artist',
    params: {
      id
    }
  })
}