import Vue from 'vue'
import VueRouter from 'vue-router'
const FindMusic = () =>  import('../views/home/homecomponents/contentcomponents/findMusic/Findmusic')
const SongList = () => import('../views/home/homecomponents/contentcomponents/songlist/SongList')
const HomeContent = () => import('../views/home/homecomponents/HomeContent')
const RankingList = () => import('../views/home/homecomponents/contentcomponents/rankinglist/RankingList')
const SingerList = () => import('../views/home/homecomponents/contentcomponents/singer/SingerList')
const NewSongsList = () => import('../views/home/homecomponents/contentcomponents/newsongs/NewSongsList')
const Video = () => import('../views/home/homecomponents/contentcomponents/recommendvideo/Video')
const Mv = () => import('../views/home/homecomponents/contentcomponents/recommendvideo/Mv')
const AllMv = () => import('../views/home/homecomponents/contentcomponents/recommendvideo/AllMv')
const AllMvRankList = () => import('../views/home/homecomponents/contentcomponents/recommendvideo/AllMvRankList')
const RecommendVideo = () => import('../views/home/homecomponents/contentcomponents/recommendvideo/RecommendVideo')
const SongListInfo = () => import('../components/content/songListInfo/SongListInfo')
const MvPage = () => import('../components/content/mvPage/MvPage')
const ArtistPage = () => import('../components/content/artistPage/ArtistPage')
const Album = () => import('../components/content/album/Album')
const VideoPage = () => import('../components/content/videoPage/videoPage')
const SearchPage = () => import('../components/content/searchPage/SearchPage')
const Lyric = () => import('../components/content/lyric/Lyric')

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '',
    redirect: '/home/homeContent/findMusic'
  },
  //发现音乐页面
  {
    path: '/home/homeContent',
    component: HomeContent,
    redirect: '/home/homeContent/findMusic',
    children: [
      {
        path: 'findMusic',
        component: FindMusic,
      },
      {
        path: 'songList',
        component: SongList
      }, 
      {
        path: 'rankingList',
        component: RankingList
      },
      {
        path: 'singerList',
        component: SingerList
      },
      {
        path: 'newSong',
        component: NewSongsList
      },
    ]
  },
  //推荐视频页面
  {
    path: '/home/RecommendVideo',
    component: RecommendVideo,
    redirect: '/home/RecommendVideo/mv',
    children: [
      {
        path: 'video',
        component: Video
      },
      {
        path: 'mv',
        component: Mv
      }, 
      {
        path: 'allMv',
        component: AllMv
      },
      {
        path: 'allMvRankList',
        component: AllMvRankList
      }
    ]
  },
  //歌单详情页面
  {
    path: '/home/songsListInfo',
    component: SongListInfo
  },
  //mv播放页面
  {
    path: '/home/mvPage',
    component: MvPage
  },
  //歌手界面
  {
    path: '/home/artistPage',
    component: ArtistPage
  },
  //歌手专辑页面
  {
    path: '/home/album',
    component: Album
  },
  //视频页面
  {
    path: '/home/videoPage',
    component: VideoPage
  },
  //搜索信息页面
  {
    path: '/home/searchPage',
    component: SearchPage
  },
  //歌词页面
  {
    path: '/home/lyric',
    component: Lyric
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
