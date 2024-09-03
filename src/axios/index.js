import axios from 'axios'
import qs from 'qs'

const config = {
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 30000,
  withCredentials: false,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    ajaxRequested: 'ajaxRequested',
    'X-Requested-With': 'XMLHttpRequest',
  },
}

const axiosIns = axios.create(config)
axiosIns.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  },
)
axiosIns.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    return error
  },
)
export default {
  get(url, params = {}) {
    return axiosIns({
      method: 'get',
      url,
      params,
    })
  },
  post(url, params = {}, headers = config.headers) {
    return axiosIns({
      method: 'post',
      url,
      data: qs.stringify(params), // qs.stringify(params),
      headers,
    })
  },
}
