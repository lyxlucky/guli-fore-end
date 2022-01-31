import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '主页', icon: 'dashboard' }
        }]
    },

    {
        path: '/teacher',
        component: Layout,
        redirect: '/teacher/table',
        name: '讲师管理',
        meta: { title: '讲师管理', icon: 'el-icon-user-solid' },
        children: [{
                path: 'table',
                name: '讲师列表',
                component: () =>
                    import ('@/views/edu/teacher/list'),
                meta: { title: '讲师列表', icon: 'el-icon-s-grid' }
            },
            {
                path: 'save',
                name: '添加讲师',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '添加讲师', icon: 'el-icon-s-grid' }
            },
            {
                path: 'edit/:id',
                name: 'eduTeacherEdit',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '修改讲师', noCache: true },
                hidden: true
            }
        ]
    },

    {
        path: '/subject',
        component: Layout,
        redirect: '/subject/table',
        name: '课程分类管理',
        meta: { title: '课程分类管理', icon: 'el-icon-s-management' },
        children: [{
                path: 'list',
                name: '课程分类列表',
                component: () =>
                    import ('@/views/edu/subject/list'),
                meta: { title: '课程分类列表', icon: 'el-icon-s-grid' }
            },
            {
                path: 'save',
                name: '添加课程',
                component: () =>
                    import ('@/views/edu/subject/save'),
                meta: { title: '添加课程', icon: 'el-icon-s-grid' }
            },
            {
                path: 'save/:id',
                name: 'eduTeacherEdit',
                component: () =>
                    import ('@/views/edu/teacher/save'),
                meta: { title: '修改讲师', noCache: true },
                hidden: true
            }
        ]
    },

    {
        path: '/course',
        component: Layout,
        redirect: '/course/table',
        name: '课程管理',
        meta: { title: '课程管理', icon: 'el-icon-edit-outline' },
        children: [{
                path: 'list',
                name: 'EduCourseList',
                component: () =>
                    import ('@/views/edu/course/list'),
                meta: { title: '课程列表', icon: 'el-icon-s-grid' }
            },
            {
                path: 'info',
                name: 'EduCourseInfo',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '发布课程', icon: "el-icon-s-grid" }
            },
            {
                path: 'info/:id',
                name: 'EduCourseInfoEdit',
                component: () =>
                    import ('@/views/edu/course/info'),
                meta: { title: '编辑课程基本信息', noCache: true },
                hidden: true
            },
            {
                path: 'chapter/:id',
                name: 'EduCourseChapterEdit',
                component: () =>
                    import ('@/views/edu/course/chapter'),
                meta: { title: '编辑课程大纲', noCache: true },
                hidden: true
            },
            {
                path: 'publish/:id',
                name: 'EduCoursePublishEdit',
                component: () =>
                    import ('@/views/edu/course/publish'),
                meta: { title: '发布课程', noCache: true },
                hidden: true
            }
        ]
    },
    {
        path: '/swagger',
        component: Layout,
        redirect: '/swagger/table',
        name: 'API管理',
        meta: { title: 'API管理', icon: 'el-icon-edit-outline' },
        children: [{
            path: 'index',
            name: 'swagger',
            component: () =>
                import ('@/views/edu/swagger/index'),
            meta: { title: 'API列表', icon: 'el-icon-s-grid' }
        }, ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router