import http from '../utils/http'

//请求验证码
export const getCodeApi = (params: any) => {
  return http.get('/auth/code', params)
}
