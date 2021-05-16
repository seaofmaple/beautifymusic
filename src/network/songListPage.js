import {require} from './axios';

//获取歌单详情
export function getSongListDetail(id) {
  return require({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

//获取歌曲详情
export function getSongDetail(param) {
  return require({
    url: 'song/detail',
    params: {
      ids: param
    }
  })
}

//获取音乐的url
export function getMusicUrl(id) {
  return require({
    url: 'song/url',
    params: {
      id
    }
  })
}

//获取歌单评论
export function getSongListComment(id,page,limit) {
  return require({
    url: '/comment/playlist',
    params: {
      id,
      offset: page * limit,
      limit
    }
  })
}

//发表评论
export function sendComment(t, type, id, content) {
  return require({
    url: '/comment',
    params: {
      t,
      type,
      id,
      content,
    },
  })
}