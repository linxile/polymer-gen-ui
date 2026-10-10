import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

// ==================== axios 类型扩展 ====================
// 拦截器已把 response 处理成 res.data，这里让 service.get<T>() 直接返回 T
declare module 'axios' {
	export interface AxiosInstance {
		get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
		post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
		put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
		delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
	}
}

// axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 60000,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// ==================== 请求拦截器 ====================
service.interceptors.request.use(
	config => {
		// 追加时间戳，防止 GET 请求缓存
		if (config.method?.toUpperCase() === 'GET' && config.responseType !== 'blob') {
			config.params = { ...config.params, t: Date.now() }
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// ==================== 响应拦截器 ====================
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status !== 200) {
			return Promise.reject(new Error(response.statusText || 'Error'))
		}

		const res = response.data

		// Blob 直接返回
		if (Object.prototype.toString.call(res) === '[object Blob]') {
			return response
		}

		// 响应成功
		if (res.code === 0) {
			return res
		}

		// 错误提示
		ElMessage.error(res.msg || '请求失败')
		return Promise.reject(new Error(res.msg || 'Error'))
	},
	error => {
		ElMessage.error(error.message)
		return Promise.reject(error)
	}
)

// 导出 axios 实例
export default service
