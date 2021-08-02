import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import BasicLayout from '@/layout/BasicLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Index',
    component: BasicLayout,
    redirect: "/Home",
    children: [
      {
        path: '/Home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
        meta: { title: '主页', icon: 'home' },

      }, {
        path: '/WebSocket',
        name: 'WebSocket',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "Home" */ '../views/About.vue'),
        meta: { title: 'WebSocket', icon: 'home' },

      },
      {
        path: '/project',
        name: 'Project',
        meta: { title: '项目', icon: 'dashboard' },

        component: () => import(/* webpackChunkName: "Second" */ '../layout/Second.vue'),
        redirect: "/project/list",
        children: [
          {
            path: "/component",
            meta: { title: '所有项目', icon: 'dashboard' },
            component: () => import(/* webpackChunkName: "Empty" */ '../layout/Empty.vue'),
            children: [
              {
                path: '/project/list',
                name: 'Project_list',
                meta: { title: '项目列表', icon: 'dashboard', parentPath: "/project", display: true },
                component: () => import(/* webpackChunkName: "Project_list" */ '../views/project/list.vue'),
              }, {
                path: '/project/add',
                name: 'Project_add',
                meta: { title: '添加项目', icon: 'dashboard', parentPath: "/project", display: true },
                component: () => import(/* webpackChunkName: "Project_add" */ '../views/project/add.vue'),
              },
              {
                path: '/project/update',
                name: 'Project_update',
                meta: { title: '更新项目', icon: 'dashboard', parentPath: "/project" },
                component: () => import(/* webpackChunkName: "Project_update" */ '../views/project/update.vue'),
              }, {
                path: '/project/detial',
                name: 'Project_detial',
                meta: { title: '项目细节', icon: 'dashboard', parentPath: "/project" },
                component: () => import(/* webpackChunkName: "Project_detial" */ '../views/project/detial.vue'),
              }, {
                path: '/project/content',
                name: 'Project_content',
                meta: { title: '项目内容编辑', icon: 'dashboard', parentPath: "/project" },
                component: () => import(/* webpackChunkName: "Project_detial" */ '../views/project/content.vue'),
              }
            ]
          }
        ]
      }, {
        path: '/cancer',
        name: 'Cancer',
        meta: { title: '癌症研究', icon: 'dashboard' },

        component: () => import(/* webpackChunkName: "Second" */ '../layout/Second.vue'),
        redirect: "/cancer/list",
        children: [
          {
            path: "/component",
            meta: { title: '癌症管理', icon: 'dashboard' },
            component: () => import(/* webpackChunkName: "Empty" */ '../layout/Empty.vue'),
            children: [
              {
                path: '/cancer/list',
                name: 'cancer_list',
                meta: { title: '癌症列表', icon: 'dashboard', parentPath: "/cancer", display: true },
                component: () => import(/* webpackChunkName: "cancer_list" */ '../views/cancer/CancerList.vue'),
              }, {
                path: '/cancer/study',
                name: 'cancer_study',
                meta: { title: '研究列表', icon: 'dashboard', parentPath: "/cancer", display: true },
                component: () => import(/* webpackChunkName: "cancer_study" */ '../views/cancer/StudyList.vue'),
              },
              {
                path: '/cancer/dataOrigin',
                name: 'dataOrigin',
                meta: { title: '数据来源', icon: 'dashboard', parentPath: "/cancer", display: true },
                component: () => import(/* webpackChunkName: "dataOrigin" */ '../views/cancer/DataOrigin.vue'),
              },{
                path: '/cancer/cancer_detial',
                name: 'cancer_cancer_detial',
                meta: { title: '癌症分析', icon: 'dashboard', parentPath: "/cancer", display: false },
                component: () => import(/* webpackChunkName: "cancer_detial" */ '../views/cancer/CancerDetial.vue'),
              }
            ]
          },
        ]

      }, {
        path: '/RNA',
        name: 'RNA',
        meta: { title: '研究对象', icon: 'dashboard' },

        component: () => import(/* webpackChunkName: "Second" */ '../layout/Second.vue'),
        redirect: "/RNA/mRNA",
        children: [
          {
            path: "/component",
            meta: { title: '研究对象', icon: 'dashboard' },
            component: () => import(/* webpackChunkName: "Empty" */ '../layout/Empty.vue'),
            children: [
              {
                path: '/RNA/mRNA',
                name: 'RNA_MRNA',
                meta: { title: 'mRNA', icon: 'dashboard', parentPath: "/RNA", display: true },
                component: () => import(/* webpackChunkName: "RNA_MRNA" */ '../views/RNA/mRNA.vue'),
              }, {
                path: '/RNA/lncRNA',
                name: 'RNA_LNCNRA',
                meta: { title: 'lncRNA', icon: 'dashboard', parentPath: "/RNA", display: true },
                component: () => import(/* webpackChunkName: "RNA_LNCNRA" */ '../views/RNA/lncRNA.vue'),
              }, {
                path: '/RNA/miRNA',
                name: 'RNA_MIRNA',
                meta: { title: 'miRNA', icon: 'dashboard', parentPath: "/RNA", display: true },
                component: () => import(/* webpackChunkName: "RNA_MIRNA" */ '../views/RNA/miRNA.vue'),
              },
              {
                path: '/RNA/circRNA',
                name: 'RNA_circRNA',
                meta: { title: 'circRNA', icon: 'dashboard', parentPath: "/RNA", display: true },
                component: () => import(/* webpackChunkName: "RNA_circRNA" */ '../views/RNA/circRNA.vue'),
              }
            ]
          }, {
            path: "/component",
            meta: { title: '初始化', icon: 'dashboard' },
            component: () => import(/* webpackChunkName: "Empty" */ '../layout/Empty.vue'),
            children: [
              {
                path: '/RNA/init',
                name: 'RNA_init',
                meta: { title: '初始化', icon: 'dashboard', parentPath: "/RNA", display: true },
                component: () => import(/* webpackChunkName: "RNA_init" */ '../views/RNA/init.vue'),
              }
            ]
          }
        ]
      },{
        path: '/file',
        name: 'FILE',
        meta: { title: '文件管理', icon: 'dashboard' },
        component: () => import(/* webpackChunkName: "Second" */ '../layout/Second.vue'),
        redirect: "/file/organize",
        children:[
          {
            path: "/component",
            meta: { title: '文件管理', icon: 'dashboard' },
            component: () => import(/* webpackChunkName: "Empty" */ '../layout/Empty.vue'),
            children: [
              {
                path: '/file/organize',
                name: 'file_organize',
                meta: { title: '文件归档', icon: 'dashboard', parentPath: "/file", display: true },
                component: () => import(/* webpackChunkName: "file_organize" */ '../views/file/organize.vue'),
              },{
                path: '/file/cancer_study',
                name: 'file_cancer_study',
                meta: { title: '资源文件', icon: 'dashboard', parentPath: "/file", display: true },
                component: () => import(/* webpackChunkName: "file_cancer_study" */ '../views/file/CancerStudyList.vue'),
              },{
                path: '/file/attachment',
                name: 'file_attachment',
                meta: { title: '附件管理', icon: 'dashboard', parentPath: "/file", display: true },
                component: () => import(/* webpackChunkName: "file_attachment" */ '../views/file/attachment.vue'),
              }
            ]
          }
        ]

      }
      // {
      //   path: '/TCGA',
      //   name: 'TCGA',
      //   meta: { title: 'TCGA', icon: 'dashboard' },
      //   component: () => import(/* webpackChunkName: "Second" */ '../layout/Second.vue'),
      //   redirect: "/TCGA/Test",
      //   children: [
      //     {
      //       path: "/component",
      //       meta: { title: 'TCGA', icon: 'dashboard' },
      //       component: () => import(/* webpackChunkName: "TCGA" */ '../layout/Empty.vue'),
      //       children: [
      //         {
      //           path: '/TCGA/count',
      //           name: 'TCGA_count',
      //           component: () => import(/* webpackChunkName: "TCGA_count" */ '../views/TCGA/count.vue'),
      //           meta: { title: 'count', icon: 'dashboard', parentPath: "/TCGA" },
      //         }, {
      //           path: '/TCGA/Test',
      //           name: 'TCGA_test',
      //           component: () => import(/* webpackChunkName: "Test" */ '../views/TCGA/Test.vue'),
      //           meta: { title: 'Test', icon: 'dashboard', parentPath: "/TCGA" },
      //         }
      //       ]

      //     },

      //   ]
      // },
    ]
  },

  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "TCGA" */ '../views/User.vue'),
    children: [
      {
        path: 'user_list',
        name: 'user_list',
        component: () => import(/* webpackChunkName: "user_list" */ '../views/User/user_list.vue'),
      }, {
        path: 'role_list',
        name: 'role_list',
        component: () => import(/* webpackChunkName: "role_list" */ '../views/User/role_list.vue'),
      }, {
        path: 'Test',
        name: 'TCGA_test',
        component: () => import(/* webpackChunkName: "Test" */ '../views/User/Test.vue'),
      }
    ]
  },

]



const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem("jwtToken");

  if (token == null && to.name != 'Login') {
    next('/login')
    return
  }
  // 已登录状态；当路由到 UserLogIn 时，跳转至 Home
  if (to.name === 'Login') {
    if (token != null) {
      next('/')
      return
    }
  }
  next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
})

export default router
