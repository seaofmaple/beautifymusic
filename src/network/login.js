import {require} from './axios'

//登录确认
export function checkLogin(phone, password) {
  return require({
    url: '/login/cellphone',
    method: 'post',
    params: {
      phone,
      password
    }
  })
}

//获取用户私人歌单
export function getUserPrivatePlayList(uid) {
  return require({
    url: 'user/playlist',
    params: {
      uid
    }
  })
}

//获取用户详细信息
export function getUserDetail(uid) {
  return require({
    url: '/user/detail',
    params: {
      uid
    }
  })
}