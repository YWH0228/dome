import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

import { ElLoading } from 'element-plus'
class Server {
  instance: AxiosInstance
  constructor(beasConfig: AxiosRequestConfig) {
    this.instance = axios.create(beasConfig)
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        ElLoading.service()
        return config
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        ElLoading.service().close()
        return response
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }
  get(url: string, params = {}) {
    return this.instance.get(url, { params })
  }
  post(url: string, data = {}) {
    return this.instance.post(url, data)
  }
  put(url: string, data = {}) {
    return this.instance.put(url, data)
  }
  delete(url: string) {
    return this.instance.delete(url)
  }
}
export default new Server({
  baseURL: import.meta.env.VITE_PROXY_URL,
  timeout: 36 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
