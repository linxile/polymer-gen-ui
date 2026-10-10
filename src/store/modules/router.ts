import { defineStore } from 'pinia'
import { generateRoutes, constantMenu, getKeepAliveRoutes } from '@/router'
import { router } from '@/router'

const menuRoutes = generateRoutes(constantMenu)
const keepAliveRoutes = getKeepAliveRoutes(menuRoutes, [])

export const useRouterStore = defineStore('routerStore', {
	state: () => ({
		menuRoutes,
		searchMenu: keepAliveRoutes,
		routes: router.getRoutes()
	})
})
