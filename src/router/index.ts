import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { i18n } from '@/i18n'
import { isExternalLink, pathToCamel } from '@/utils/tool'

NProgress.configure({ showSpinner: false })

/* ============ 1. 先把 import.meta.glob 和工具函数放到最上面 ============ */
// 加载 vue 组件
const layoutModules = import.meta.glob('/src/views/**/*.vue')

function getDynamicComponent(path: string): (() => Promise<any>) | undefined {
	return layoutModules[`/src/views/${path}.vue`] as (() => Promise<any>) | undefined
}

function isIframeUrl(menu: any): boolean {
	if (menu.openStyle === 1) return false
	return isExternalLink(menu.url)
}

export function getKeepAliveRoutes(routes: RouteRecordRaw[], breadcrumb: string[]): RouteRecordRaw[] {
	const routerList: RouteRecordRaw[] = []

	routes.forEach((item: any) => {
		if (item.meta?.title) {
			breadcrumb.push(item.meta.title)
		}

		if (item.children && item.children.length > 0) {
			routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
		} else {
			if (!item.meta.breadcrumb) item.meta.breadcrumb = []
			item.meta.breadcrumb.push(...breadcrumb)
			routerList.push(item)
		}

		breadcrumb.pop()
	})

	return routerList
}

export function generateRoutes(menuList: any[]): RouteRecordRaw[] {
	const routerList: RouteRecordRaw[] = []

	menuList.forEach(menu => {
		let component
		let path: string

		if (menu.children && menu.children.length > 0) {
			component = () => import('@/layout/index.vue')
			path = '/p/' + menu.id
		} else {
			if (isIframeUrl(menu)) {
				component = () => import('@/layout/components/Router/Iframe.vue')
				path = '/iframe/' + menu.id
			} else {
				component = getDynamicComponent(menu.url)
				path = '/' + menu.url
			}
		}

		const route: RouteRecordRaw = {
			path,
			name: pathToCamel(path),
			component,
			children: [],
			meta: {
				title: menu.name,
				icon: menu.icon && menu.icon !== 'null' && menu.icon !== 'undefined' ? menu.icon : '',
				id: '' + menu.id,
				url: menu.url,
				cache: true,
				newOpen: menu.openStyle === 1,
				breadcrumb: []
			}
		}

		if (menu.children && menu.children.length > 0) {
			route.children?.push(...generateRoutes(menu.children))
		}

		routerList.push(route)
	})

	return routerList
}

/* ============ 2. 再定义常量菜单 ============ */
export const constantMenu = [
	{
		id: 1000,
		name: '代码生成器',
		url: null,
		openStyle: 0,
		icon: 'icon-windows',
		children: [
			{
				id: 1001,
				name: '代码生成',
				url: 'gen/generator/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1002,
				name: '数据源管理',
				url: 'gen/datasource/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1003,
				name: '字段类型映射',
				url: 'gen/field-type/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1004,
				name: '基类管理',
				url: 'gen/base-class/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			},
			{
				id: 1005,
				name: '项目名变更',
				url: 'gen/project/index',
				openStyle: 0,
				icon: 'icon-unorderedlist'
			}
		]
	}
]

/* ============ 3. 常量路由 ============ */
const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/redirect',
		component: () => import('../layout/index.vue'),
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('../layout/components/Router/Redirect.vue')
			}
		]
	},
	{
		path: '/iframe/:query?',
		component: () => import('../layout/components/Router/Iframe.vue')
	},
	{
		path: '/404',
		component: () => import('../views/404.vue')
	}
]

/* ============ 4. 基础布局路由 ============ */
const asyncRoutes: RouteRecordRaw = {
	path: '/',
	component: () => import('../layout/index.vue'),
	redirect: '/home',
	children: [
		{
			path: '/home',
			name: 'Home',
			component: () => import('../views/home.vue'),
			meta: {
				title: i18n.global.t('router.home'),
				affix: true
			}
		}
	]
}

/* ============ 5. 404 兜底 ============ */
export const errorRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)',
	redirect: '/404'
}

/* ============ 6. 现在所有依赖都就绪，再执行生成逻辑 ============ */
const menuRoutes = generateRoutes(constantMenu)
const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])
asyncRoutes.children?.push(...keepAliveRoutes)

/* ============ 7. 创建 router ============ */
export const router = createRouter({
	history: createWebHashHistory(),
	routes: [...constantRoutes, asyncRoutes, errorRoute]
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

router.afterEach(() => {
	NProgress.done()
})
