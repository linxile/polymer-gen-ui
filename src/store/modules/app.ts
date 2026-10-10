import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import type { ITheme } from '@/store/theme/interface'

/** 组件大小 */
type ComponentSize = 'large' | 'default' | 'small'

/** 应用状态 */
interface AppState {
	/** sidebar 是否展开 */
	sidebarOpened: boolean
	/** 国际化 */
	language: string
	/** 组件大小 */
	componentSize: ComponentSize
	/** 主题 */
	theme: ITheme
}

export const useAppStore = defineStore('appStore', {
	state: (): AppState => ({
		// sidebar 是否展开
		sidebarOpened: cache.getSidebarOpened(),
		// 国际化
		language: cache.getLanguage(),
		// 组件大小
		componentSize: cache.getComponentSize() as ComponentSize,
		// 字典列表
		// 主题
		theme: cache.getTheme()
	}),
	actions: {
		/** 切换 sidebar 展开/收起 */
		setSidebarOpened() {
			this.sidebarOpened = !this.sidebarOpened
			cache.setSidebarOpened(this.sidebarOpened)
		},
		/** 设置 sidebar 展开状态 */
		setSidebarStatus(status: boolean) {
			this.sidebarOpened = status
			cache.setSidebarOpened(this.sidebarOpened)
		},
		/** 设置语言 */
		setLanguage(locale: string) {
			this.language = locale
			cache.setLanguage(locale)
		},
		/** 设置组件大小 */
		setComponentSize(size: ComponentSize) {
			this.componentSize = size
			cache.setComponentSize(size)
		},
		/** 设置主题 */
		setTheme(theme: ITheme) {
			this.theme = theme
			cache.setTheme(theme)
		}
	}
})
