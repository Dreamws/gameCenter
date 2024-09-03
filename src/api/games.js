import axios from '@/axios'
// 获取推荐列表
export const getRecommendList = ({ limit }) => {
  return axios.get(`/rss/topgrossingapplications/limit=${limit}/json`)
}
// 获取游戏列表
export const getGameList = ({ limit }) => {
  return axios.get(`/rss/topfreeapplications/limit=${limit}/json`)
}
// 获取游戏列表
export const getSearchGames = ({ ids }) => {
  return axios.get(`https://itunes.apple.com/hk/lookup?id=${ids}`)
}
