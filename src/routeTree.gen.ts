/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthAuthLayoutImport } from './routes/auth/_auth-layout'
import { Route as AdminAdminLayoutImport } from './routes/admin/_admin-layout'
import { Route as PublicUserFailImport } from './routes/_public/user/fail'
import { Route as PublicUserAccessImport } from './routes/_public/user/access'
import { Route as PublicUserContactImport } from './routes/_public/user/Contact'
import { Route as PublicUserCheckoutImport } from './routes/_public/user/Checkout'
import { Route as PublicUserAccessoriesImport } from './routes/_public/user/Accessories'
import { Route as PublicProductIdImport } from './routes/_public/product.$id'

// Create Virtual Routes

const AuthImport = createFileRoute('/auth')()
const AdminImport = createFileRoute('/admin')()
const R404LazyImport = createFileRoute('/404')()
const PublicIndexLazyImport = createFileRoute('/_public/')()
const AdminAdminLayoutIndexLazyImport = createFileRoute(
  '/admin/_admin-layout/',
)()
const AuthAuthLayoutSignUpLazyImport = createFileRoute(
  '/auth/_auth-layout/sign-up',
)()
const AuthAuthLayoutSignInLazyImport = createFileRoute(
  '/auth/_auth-layout/sign-in',
)()
const AdminAdminLayoutVoucherLazyImport = createFileRoute(
  '/admin/_admin-layout/voucher',
)()
const AdminAdminLayoutSettingsLazyImport = createFileRoute(
  '/admin/_admin-layout/settings',
)()
const AdminAdminLayoutRolesLazyImport = createFileRoute(
  '/admin/_admin-layout/roles',
)()
const AdminAdminLayoutProductsLazyImport = createFileRoute(
  '/admin/_admin-layout/products',
)()
const AdminAdminLayoutProductAddLazyImport = createFileRoute(
  '/admin/_admin-layout/product-add',
)()
const AdminAdminLayoutCustomerLazyImport = createFileRoute(
  '/admin/_admin-layout/customer',
)()
const AdminAdminLayoutContactLazyImport = createFileRoute(
  '/admin/_admin-layout/contact',
)()
const AdminAdminLayoutChangePasswordLazyImport = createFileRoute(
  '/admin/_admin-layout/change-password',
)()
const AdminAdminLayoutCategoryLazyImport = createFileRoute(
  '/admin/_admin-layout/category',
)()
const AdminAdminLayoutCartLazyImport = createFileRoute(
  '/admin/_admin-layout/cart',
)()
const AdminAdminLayoutAccountsLazyImport = createFileRoute(
  '/admin/_admin-layout/accounts',
)()
const AdminAdminLayoutProductDetailIdLazyImport = createFileRoute(
  '/admin/_admin-layout/product-detail/$id',
)()
const AdminAdminLayoutCustomerHistoryIdLazyImport = createFileRoute(
  '/admin/_admin-layout/customer-history/$id',
)()

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any)

const R404LazyRoute = R404LazyImport.update({
  id: '/404',
  path: '/404',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/404.lazy').then((d) => d.Route))

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const PublicIndexLazyRoute = PublicIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PublicRoute,
} as any).lazy(() => import('./routes/_public/index.lazy').then((d) => d.Route))

const AuthAuthLayoutRoute = AuthAuthLayoutImport.update({
  id: '/_auth-layout',
  getParentRoute: () => AuthRoute,
} as any)

const AdminAdminLayoutRoute = AdminAdminLayoutImport.update({
  id: '/_admin-layout',
  getParentRoute: () => AdminRoute,
} as any)

const AdminAdminLayoutIndexLazyRoute = AdminAdminLayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AdminAdminLayoutRoute,
} as any).lazy(() =>
  import('./routes/admin/_admin-layout/index.lazy').then((d) => d.Route),
)

const AuthAuthLayoutSignUpLazyRoute = AuthAuthLayoutSignUpLazyImport.update({
  id: '/sign-up',
  path: '/sign-up',
  getParentRoute: () => AuthAuthLayoutRoute,
} as any).lazy(() =>
  import('./routes/auth/_auth-layout/sign-up.lazy').then((d) => d.Route),
)

const AuthAuthLayoutSignInLazyRoute = AuthAuthLayoutSignInLazyImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthAuthLayoutRoute,
} as any).lazy(() =>
  import('./routes/auth/_auth-layout/sign-in.lazy').then((d) => d.Route),
)

const AdminAdminLayoutVoucherLazyRoute =
  AdminAdminLayoutVoucherLazyImport.update({
    id: '/voucher',
    path: '/voucher',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/voucher.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutSettingsLazyRoute =
  AdminAdminLayoutSettingsLazyImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/settings.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutRolesLazyRoute = AdminAdminLayoutRolesLazyImport.update({
  id: '/roles',
  path: '/roles',
  getParentRoute: () => AdminAdminLayoutRoute,
} as any).lazy(() =>
  import('./routes/admin/_admin-layout/roles.lazy').then((d) => d.Route),
)

const AdminAdminLayoutProductsLazyRoute =
  AdminAdminLayoutProductsLazyImport.update({
    id: '/products',
    path: '/products',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/products.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutProductAddLazyRoute =
  AdminAdminLayoutProductAddLazyImport.update({
    id: '/product-add',
    path: '/product-add',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/product-add.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAdminLayoutCustomerLazyRoute =
  AdminAdminLayoutCustomerLazyImport.update({
    id: '/customer',
    path: '/customer',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/customer.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutContactLazyRoute =
  AdminAdminLayoutContactLazyImport.update({
    id: '/contact',
    path: '/contact',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/contact.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutChangePasswordLazyRoute =
  AdminAdminLayoutChangePasswordLazyImport.update({
    id: '/change-password',
    path: '/change-password',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/change-password.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAdminLayoutCategoryLazyRoute =
  AdminAdminLayoutCategoryLazyImport.update({
    id: '/category',
    path: '/category',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/category.lazy').then((d) => d.Route),
  )

const AdminAdminLayoutCartLazyRoute = AdminAdminLayoutCartLazyImport.update({
  id: '/cart',
  path: '/cart',
  getParentRoute: () => AdminAdminLayoutRoute,
} as any).lazy(() =>
  import('./routes/admin/_admin-layout/cart.lazy').then((d) => d.Route),
)

const AdminAdminLayoutAccountsLazyRoute =
  AdminAdminLayoutAccountsLazyImport.update({
    id: '/accounts',
    path: '/accounts',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/accounts.lazy').then((d) => d.Route),
  )

const PublicUserFailRoute = PublicUserFailImport.update({
  id: '/user/fail',
  path: '/user/fail',
  getParentRoute: () => PublicRoute,
} as any)

const PublicUserAccessRoute = PublicUserAccessImport.update({
  id: '/user/access',
  path: '/user/access',
  getParentRoute: () => PublicRoute,
} as any)

const PublicUserContactRoute = PublicUserContactImport.update({
  id: '/user/Contact',
  path: '/user/Contact',
  getParentRoute: () => PublicRoute,
} as any)

const PublicUserCheckoutRoute = PublicUserCheckoutImport.update({
  id: '/user/Checkout',
  path: '/user/Checkout',
  getParentRoute: () => PublicRoute,
} as any)

const PublicUserAccessoriesRoute = PublicUserAccessoriesImport.update({
  id: '/user/Accessories',
  path: '/user/Accessories',
  getParentRoute: () => PublicRoute,
} as any)

const PublicProductIdRoute = PublicProductIdImport.update({
  id: '/product/$id',
  path: '/product/$id',
  getParentRoute: () => PublicRoute,
} as any)

const AdminAdminLayoutProductDetailIdLazyRoute =
  AdminAdminLayoutProductDetailIdLazyImport.update({
    id: '/product-detail/$id',
    path: '/product-detail/$id',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/product-detail.$id.lazy').then(
      (d) => d.Route,
    ),
  )

const AdminAdminLayoutCustomerHistoryIdLazyRoute =
  AdminAdminLayoutCustomerHistoryIdLazyImport.update({
    id: '/customer-history/$id',
    path: '/customer-history/$id',
    getParentRoute: () => AdminAdminLayoutRoute,
  } as any).lazy(() =>
    import('./routes/admin/_admin-layout/customer-history.$id.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/404': {
      id: '/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof R404LazyImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/admin/_admin-layout': {
      id: '/admin/_admin-layout'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminAdminLayoutImport
      parentRoute: typeof AdminRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_auth-layout': {
      id: '/auth/_auth-layout'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthLayoutImport
      parentRoute: typeof AuthRoute
    }
    '/_public/': {
      id: '/_public/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PublicIndexLazyImport
      parentRoute: typeof PublicImport
    }
    '/_public/product/$id': {
      id: '/_public/product/$id'
      path: '/product/$id'
      fullPath: '/product/$id'
      preLoaderRoute: typeof PublicProductIdImport
      parentRoute: typeof PublicImport
    }
    '/_public/user/Accessories': {
      id: '/_public/user/Accessories'
      path: '/user/Accessories'
      fullPath: '/user/Accessories'
      preLoaderRoute: typeof PublicUserAccessoriesImport
      parentRoute: typeof PublicImport
    }
    '/_public/user/Checkout': {
      id: '/_public/user/Checkout'
      path: '/user/Checkout'
      fullPath: '/user/Checkout'
      preLoaderRoute: typeof PublicUserCheckoutImport
      parentRoute: typeof PublicImport
    }
    '/_public/user/Contact': {
      id: '/_public/user/Contact'
      path: '/user/Contact'
      fullPath: '/user/Contact'
      preLoaderRoute: typeof PublicUserContactImport
      parentRoute: typeof PublicImport
    }
    '/_public/user/access': {
      id: '/_public/user/access'
      path: '/user/access'
      fullPath: '/user/access'
      preLoaderRoute: typeof PublicUserAccessImport
      parentRoute: typeof PublicImport
    }
    '/_public/user/fail': {
      id: '/_public/user/fail'
      path: '/user/fail'
      fullPath: '/user/fail'
      preLoaderRoute: typeof PublicUserFailImport
      parentRoute: typeof PublicImport
    }
    '/admin/_admin-layout/accounts': {
      id: '/admin/_admin-layout/accounts'
      path: '/accounts'
      fullPath: '/admin/accounts'
      preLoaderRoute: typeof AdminAdminLayoutAccountsLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/cart': {
      id: '/admin/_admin-layout/cart'
      path: '/cart'
      fullPath: '/admin/cart'
      preLoaderRoute: typeof AdminAdminLayoutCartLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/category': {
      id: '/admin/_admin-layout/category'
      path: '/category'
      fullPath: '/admin/category'
      preLoaderRoute: typeof AdminAdminLayoutCategoryLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/change-password': {
      id: '/admin/_admin-layout/change-password'
      path: '/change-password'
      fullPath: '/admin/change-password'
      preLoaderRoute: typeof AdminAdminLayoutChangePasswordLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/contact': {
      id: '/admin/_admin-layout/contact'
      path: '/contact'
      fullPath: '/admin/contact'
      preLoaderRoute: typeof AdminAdminLayoutContactLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/customer': {
      id: '/admin/_admin-layout/customer'
      path: '/customer'
      fullPath: '/admin/customer'
      preLoaderRoute: typeof AdminAdminLayoutCustomerLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/product-add': {
      id: '/admin/_admin-layout/product-add'
      path: '/product-add'
      fullPath: '/admin/product-add'
      preLoaderRoute: typeof AdminAdminLayoutProductAddLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/products': {
      id: '/admin/_admin-layout/products'
      path: '/products'
      fullPath: '/admin/products'
      preLoaderRoute: typeof AdminAdminLayoutProductsLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/roles': {
      id: '/admin/_admin-layout/roles'
      path: '/roles'
      fullPath: '/admin/roles'
      preLoaderRoute: typeof AdminAdminLayoutRolesLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/settings': {
      id: '/admin/_admin-layout/settings'
      path: '/settings'
      fullPath: '/admin/settings'
      preLoaderRoute: typeof AdminAdminLayoutSettingsLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/voucher': {
      id: '/admin/_admin-layout/voucher'
      path: '/voucher'
      fullPath: '/admin/voucher'
      preLoaderRoute: typeof AdminAdminLayoutVoucherLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/auth/_auth-layout/sign-in': {
      id: '/auth/_auth-layout/sign-in'
      path: '/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthAuthLayoutSignInLazyImport
      parentRoute: typeof AuthAuthLayoutImport
    }
    '/auth/_auth-layout/sign-up': {
      id: '/auth/_auth-layout/sign-up'
      path: '/sign-up'
      fullPath: '/auth/sign-up'
      preLoaderRoute: typeof AuthAuthLayoutSignUpLazyImport
      parentRoute: typeof AuthAuthLayoutImport
    }
    '/admin/_admin-layout/': {
      id: '/admin/_admin-layout/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AdminAdminLayoutIndexLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/customer-history/$id': {
      id: '/admin/_admin-layout/customer-history/$id'
      path: '/customer-history/$id'
      fullPath: '/admin/customer-history/$id'
      preLoaderRoute: typeof AdminAdminLayoutCustomerHistoryIdLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
    '/admin/_admin-layout/product-detail/$id': {
      id: '/admin/_admin-layout/product-detail/$id'
      path: '/product-detail/$id'
      fullPath: '/admin/product-detail/$id'
      preLoaderRoute: typeof AdminAdminLayoutProductDetailIdLazyImport
      parentRoute: typeof AdminAdminLayoutImport
    }
  }
}

// Create and export the route tree

interface PublicRouteChildren {
  PublicIndexLazyRoute: typeof PublicIndexLazyRoute
  PublicProductIdRoute: typeof PublicProductIdRoute
  PublicUserAccessoriesRoute: typeof PublicUserAccessoriesRoute
  PublicUserCheckoutRoute: typeof PublicUserCheckoutRoute
  PublicUserContactRoute: typeof PublicUserContactRoute
  PublicUserAccessRoute: typeof PublicUserAccessRoute
  PublicUserFailRoute: typeof PublicUserFailRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicIndexLazyRoute: PublicIndexLazyRoute,
  PublicProductIdRoute: PublicProductIdRoute,
  PublicUserAccessoriesRoute: PublicUserAccessoriesRoute,
  PublicUserCheckoutRoute: PublicUserCheckoutRoute,
  PublicUserContactRoute: PublicUserContactRoute,
  PublicUserAccessRoute: PublicUserAccessRoute,
  PublicUserFailRoute: PublicUserFailRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

interface AdminAdminLayoutRouteChildren {
  AdminAdminLayoutAccountsLazyRoute: typeof AdminAdminLayoutAccountsLazyRoute
  AdminAdminLayoutCartLazyRoute: typeof AdminAdminLayoutCartLazyRoute
  AdminAdminLayoutCategoryLazyRoute: typeof AdminAdminLayoutCategoryLazyRoute
  AdminAdminLayoutChangePasswordLazyRoute: typeof AdminAdminLayoutChangePasswordLazyRoute
  AdminAdminLayoutContactLazyRoute: typeof AdminAdminLayoutContactLazyRoute
  AdminAdminLayoutCustomerLazyRoute: typeof AdminAdminLayoutCustomerLazyRoute
  AdminAdminLayoutProductAddLazyRoute: typeof AdminAdminLayoutProductAddLazyRoute
  AdminAdminLayoutProductsLazyRoute: typeof AdminAdminLayoutProductsLazyRoute
  AdminAdminLayoutRolesLazyRoute: typeof AdminAdminLayoutRolesLazyRoute
  AdminAdminLayoutSettingsLazyRoute: typeof AdminAdminLayoutSettingsLazyRoute
  AdminAdminLayoutVoucherLazyRoute: typeof AdminAdminLayoutVoucherLazyRoute
  AdminAdminLayoutIndexLazyRoute: typeof AdminAdminLayoutIndexLazyRoute
  AdminAdminLayoutCustomerHistoryIdLazyRoute: typeof AdminAdminLayoutCustomerHistoryIdLazyRoute
  AdminAdminLayoutProductDetailIdLazyRoute: typeof AdminAdminLayoutProductDetailIdLazyRoute
}

const AdminAdminLayoutRouteChildren: AdminAdminLayoutRouteChildren = {
  AdminAdminLayoutAccountsLazyRoute: AdminAdminLayoutAccountsLazyRoute,
  AdminAdminLayoutCartLazyRoute: AdminAdminLayoutCartLazyRoute,
  AdminAdminLayoutCategoryLazyRoute: AdminAdminLayoutCategoryLazyRoute,
  AdminAdminLayoutChangePasswordLazyRoute:
    AdminAdminLayoutChangePasswordLazyRoute,
  AdminAdminLayoutContactLazyRoute: AdminAdminLayoutContactLazyRoute,
  AdminAdminLayoutCustomerLazyRoute: AdminAdminLayoutCustomerLazyRoute,
  AdminAdminLayoutProductAddLazyRoute: AdminAdminLayoutProductAddLazyRoute,
  AdminAdminLayoutProductsLazyRoute: AdminAdminLayoutProductsLazyRoute,
  AdminAdminLayoutRolesLazyRoute: AdminAdminLayoutRolesLazyRoute,
  AdminAdminLayoutSettingsLazyRoute: AdminAdminLayoutSettingsLazyRoute,
  AdminAdminLayoutVoucherLazyRoute: AdminAdminLayoutVoucherLazyRoute,
  AdminAdminLayoutIndexLazyRoute: AdminAdminLayoutIndexLazyRoute,
  AdminAdminLayoutCustomerHistoryIdLazyRoute:
    AdminAdminLayoutCustomerHistoryIdLazyRoute,
  AdminAdminLayoutProductDetailIdLazyRoute:
    AdminAdminLayoutProductDetailIdLazyRoute,
}

const AdminAdminLayoutRouteWithChildren =
  AdminAdminLayoutRoute._addFileChildren(AdminAdminLayoutRouteChildren)

interface AdminRouteChildren {
  AdminAdminLayoutRoute: typeof AdminAdminLayoutRouteWithChildren
}

const AdminRouteChildren: AdminRouteChildren = {
  AdminAdminLayoutRoute: AdminAdminLayoutRouteWithChildren,
}

const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren)

interface AuthAuthLayoutRouteChildren {
  AuthAuthLayoutSignInLazyRoute: typeof AuthAuthLayoutSignInLazyRoute
  AuthAuthLayoutSignUpLazyRoute: typeof AuthAuthLayoutSignUpLazyRoute
}

const AuthAuthLayoutRouteChildren: AuthAuthLayoutRouteChildren = {
  AuthAuthLayoutSignInLazyRoute: AuthAuthLayoutSignInLazyRoute,
  AuthAuthLayoutSignUpLazyRoute: AuthAuthLayoutSignUpLazyRoute,
}

const AuthAuthLayoutRouteWithChildren = AuthAuthLayoutRoute._addFileChildren(
  AuthAuthLayoutRouteChildren,
)

interface AuthRouteChildren {
  AuthAuthLayoutRoute: typeof AuthAuthLayoutRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthLayoutRoute: AuthAuthLayoutRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PublicRouteWithChildren
  '/404': typeof R404LazyRoute
  '/admin': typeof AdminAdminLayoutRouteWithChildren
  '/auth': typeof AuthAuthLayoutRouteWithChildren
  '/': typeof PublicIndexLazyRoute
  '/product/$id': typeof PublicProductIdRoute
  '/user/Accessories': typeof PublicUserAccessoriesRoute
  '/user/Checkout': typeof PublicUserCheckoutRoute
  '/user/Contact': typeof PublicUserContactRoute
  '/user/access': typeof PublicUserAccessRoute
  '/user/fail': typeof PublicUserFailRoute
  '/admin/accounts': typeof AdminAdminLayoutAccountsLazyRoute
  '/admin/cart': typeof AdminAdminLayoutCartLazyRoute
  '/admin/category': typeof AdminAdminLayoutCategoryLazyRoute
  '/admin/change-password': typeof AdminAdminLayoutChangePasswordLazyRoute
  '/admin/contact': typeof AdminAdminLayoutContactLazyRoute
  '/admin/customer': typeof AdminAdminLayoutCustomerLazyRoute
  '/admin/product-add': typeof AdminAdminLayoutProductAddLazyRoute
  '/admin/products': typeof AdminAdminLayoutProductsLazyRoute
  '/admin/roles': typeof AdminAdminLayoutRolesLazyRoute
  '/admin/settings': typeof AdminAdminLayoutSettingsLazyRoute
  '/admin/voucher': typeof AdminAdminLayoutVoucherLazyRoute
  '/auth/sign-in': typeof AuthAuthLayoutSignInLazyRoute
  '/auth/sign-up': typeof AuthAuthLayoutSignUpLazyRoute
  '/admin/': typeof AdminAdminLayoutIndexLazyRoute
  '/admin/customer-history/$id': typeof AdminAdminLayoutCustomerHistoryIdLazyRoute
  '/admin/product-detail/$id': typeof AdminAdminLayoutProductDetailIdLazyRoute
}

export interface FileRoutesByTo {
  '/404': typeof R404LazyRoute
  '/admin': typeof AdminAdminLayoutIndexLazyRoute
  '/auth': typeof AuthAuthLayoutRouteWithChildren
  '/': typeof PublicIndexLazyRoute
  '/product/$id': typeof PublicProductIdRoute
  '/user/Accessories': typeof PublicUserAccessoriesRoute
  '/user/Checkout': typeof PublicUserCheckoutRoute
  '/user/Contact': typeof PublicUserContactRoute
  '/user/access': typeof PublicUserAccessRoute
  '/user/fail': typeof PublicUserFailRoute
  '/admin/accounts': typeof AdminAdminLayoutAccountsLazyRoute
  '/admin/cart': typeof AdminAdminLayoutCartLazyRoute
  '/admin/category': typeof AdminAdminLayoutCategoryLazyRoute
  '/admin/change-password': typeof AdminAdminLayoutChangePasswordLazyRoute
  '/admin/contact': typeof AdminAdminLayoutContactLazyRoute
  '/admin/customer': typeof AdminAdminLayoutCustomerLazyRoute
  '/admin/product-add': typeof AdminAdminLayoutProductAddLazyRoute
  '/admin/products': typeof AdminAdminLayoutProductsLazyRoute
  '/admin/roles': typeof AdminAdminLayoutRolesLazyRoute
  '/admin/settings': typeof AdminAdminLayoutSettingsLazyRoute
  '/admin/voucher': typeof AdminAdminLayoutVoucherLazyRoute
  '/auth/sign-in': typeof AuthAuthLayoutSignInLazyRoute
  '/auth/sign-up': typeof AuthAuthLayoutSignUpLazyRoute
  '/admin/customer-history/$id': typeof AdminAdminLayoutCustomerHistoryIdLazyRoute
  '/admin/product-detail/$id': typeof AdminAdminLayoutProductDetailIdLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_public': typeof PublicRouteWithChildren
  '/404': typeof R404LazyRoute
  '/admin': typeof AdminRouteWithChildren
  '/admin/_admin-layout': typeof AdminAdminLayoutRouteWithChildren
  '/auth': typeof AuthRouteWithChildren
  '/auth/_auth-layout': typeof AuthAuthLayoutRouteWithChildren
  '/_public/': typeof PublicIndexLazyRoute
  '/_public/product/$id': typeof PublicProductIdRoute
  '/_public/user/Accessories': typeof PublicUserAccessoriesRoute
  '/_public/user/Checkout': typeof PublicUserCheckoutRoute
  '/_public/user/Contact': typeof PublicUserContactRoute
  '/_public/user/access': typeof PublicUserAccessRoute
  '/_public/user/fail': typeof PublicUserFailRoute
  '/admin/_admin-layout/accounts': typeof AdminAdminLayoutAccountsLazyRoute
  '/admin/_admin-layout/cart': typeof AdminAdminLayoutCartLazyRoute
  '/admin/_admin-layout/category': typeof AdminAdminLayoutCategoryLazyRoute
  '/admin/_admin-layout/change-password': typeof AdminAdminLayoutChangePasswordLazyRoute
  '/admin/_admin-layout/contact': typeof AdminAdminLayoutContactLazyRoute
  '/admin/_admin-layout/customer': typeof AdminAdminLayoutCustomerLazyRoute
  '/admin/_admin-layout/product-add': typeof AdminAdminLayoutProductAddLazyRoute
  '/admin/_admin-layout/products': typeof AdminAdminLayoutProductsLazyRoute
  '/admin/_admin-layout/roles': typeof AdminAdminLayoutRolesLazyRoute
  '/admin/_admin-layout/settings': typeof AdminAdminLayoutSettingsLazyRoute
  '/admin/_admin-layout/voucher': typeof AdminAdminLayoutVoucherLazyRoute
  '/auth/_auth-layout/sign-in': typeof AuthAuthLayoutSignInLazyRoute
  '/auth/_auth-layout/sign-up': typeof AuthAuthLayoutSignUpLazyRoute
  '/admin/_admin-layout/': typeof AdminAdminLayoutIndexLazyRoute
  '/admin/_admin-layout/customer-history/$id': typeof AdminAdminLayoutCustomerHistoryIdLazyRoute
  '/admin/_admin-layout/product-detail/$id': typeof AdminAdminLayoutProductDetailIdLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/404'
    | '/admin'
    | '/auth'
    | '/'
    | '/product/$id'
    | '/user/Accessories'
    | '/user/Checkout'
    | '/user/Contact'
    | '/user/access'
    | '/user/fail'
    | '/admin/accounts'
    | '/admin/cart'
    | '/admin/category'
    | '/admin/change-password'
    | '/admin/contact'
    | '/admin/customer'
    | '/admin/product-add'
    | '/admin/products'
    | '/admin/roles'
    | '/admin/settings'
    | '/admin/voucher'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/admin/'
    | '/admin/customer-history/$id'
    | '/admin/product-detail/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/404'
    | '/admin'
    | '/auth'
    | '/'
    | '/product/$id'
    | '/user/Accessories'
    | '/user/Checkout'
    | '/user/Contact'
    | '/user/access'
    | '/user/fail'
    | '/admin/accounts'
    | '/admin/cart'
    | '/admin/category'
    | '/admin/change-password'
    | '/admin/contact'
    | '/admin/customer'
    | '/admin/product-add'
    | '/admin/products'
    | '/admin/roles'
    | '/admin/settings'
    | '/admin/voucher'
    | '/auth/sign-in'
    | '/auth/sign-up'
    | '/admin/customer-history/$id'
    | '/admin/product-detail/$id'
  id:
    | '__root__'
    | '/_public'
    | '/404'
    | '/admin'
    | '/admin/_admin-layout'
    | '/auth'
    | '/auth/_auth-layout'
    | '/_public/'
    | '/_public/product/$id'
    | '/_public/user/Accessories'
    | '/_public/user/Checkout'
    | '/_public/user/Contact'
    | '/_public/user/access'
    | '/_public/user/fail'
    | '/admin/_admin-layout/accounts'
    | '/admin/_admin-layout/cart'
    | '/admin/_admin-layout/category'
    | '/admin/_admin-layout/change-password'
    | '/admin/_admin-layout/contact'
    | '/admin/_admin-layout/customer'
    | '/admin/_admin-layout/product-add'
    | '/admin/_admin-layout/products'
    | '/admin/_admin-layout/roles'
    | '/admin/_admin-layout/settings'
    | '/admin/_admin-layout/voucher'
    | '/auth/_auth-layout/sign-in'
    | '/auth/_auth-layout/sign-up'
    | '/admin/_admin-layout/'
    | '/admin/_admin-layout/customer-history/$id'
    | '/admin/_admin-layout/product-detail/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  PublicRoute: typeof PublicRouteWithChildren
  R404LazyRoute: typeof R404LazyRoute
  AdminRoute: typeof AdminRouteWithChildren
  AuthRoute: typeof AuthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  PublicRoute: PublicRouteWithChildren,
  R404LazyRoute: R404LazyRoute,
  AdminRoute: AdminRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_public",
        "/404",
        "/admin",
        "/auth"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/",
        "/_public/product/$id",
        "/_public/user/Accessories",
        "/_public/user/Checkout",
        "/_public/user/Contact",
        "/_public/user/access",
        "/_public/user/fail"
      ]
    },
    "/404": {
      "filePath": "404.lazy.tsx"
    },
    "/admin": {
      "filePath": "admin",
      "children": [
        "/admin/_admin-layout"
      ]
    },
    "/admin/_admin-layout": {
      "filePath": "admin/_admin-layout.tsx",
      "parent": "/admin",
      "children": [
        "/admin/_admin-layout/accounts",
        "/admin/_admin-layout/cart",
        "/admin/_admin-layout/category",
        "/admin/_admin-layout/change-password",
        "/admin/_admin-layout/contact",
        "/admin/_admin-layout/customer",
        "/admin/_admin-layout/product-add",
        "/admin/_admin-layout/products",
        "/admin/_admin-layout/roles",
        "/admin/_admin-layout/settings",
        "/admin/_admin-layout/voucher",
        "/admin/_admin-layout/",
        "/admin/_admin-layout/customer-history/$id",
        "/admin/_admin-layout/product-detail/$id"
      ]
    },
    "/auth": {
      "filePath": "auth",
      "children": [
        "/auth/_auth-layout"
      ]
    },
    "/auth/_auth-layout": {
      "filePath": "auth/_auth-layout.tsx",
      "parent": "/auth",
      "children": [
        "/auth/_auth-layout/sign-in",
        "/auth/_auth-layout/sign-up"
      ]
    },
    "/_public/": {
      "filePath": "_public/index.lazy.tsx",
      "parent": "/_public"
    },
    "/_public/product/$id": {
      "filePath": "_public/product.$id.tsx",
      "parent": "/_public"
    },
    "/_public/user/Accessories": {
      "filePath": "_public/user/Accessories.tsx",
      "parent": "/_public"
    },
    "/_public/user/Checkout": {
      "filePath": "_public/user/Checkout.tsx",
      "parent": "/_public"
    },
    "/_public/user/Contact": {
      "filePath": "_public/user/Contact.tsx",
      "parent": "/_public"
    },
    "/_public/user/access": {
      "filePath": "_public/user/access.tsx",
      "parent": "/_public"
    },
    "/_public/user/fail": {
      "filePath": "_public/user/fail.tsx",
      "parent": "/_public"
    },
    "/admin/_admin-layout/accounts": {
      "filePath": "admin/_admin-layout/accounts.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/cart": {
      "filePath": "admin/_admin-layout/cart.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/category": {
      "filePath": "admin/_admin-layout/category.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/change-password": {
      "filePath": "admin/_admin-layout/change-password.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/contact": {
      "filePath": "admin/_admin-layout/contact.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/customer": {
      "filePath": "admin/_admin-layout/customer.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/product-add": {
      "filePath": "admin/_admin-layout/product-add.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/products": {
      "filePath": "admin/_admin-layout/products.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/roles": {
      "filePath": "admin/_admin-layout/roles.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/settings": {
      "filePath": "admin/_admin-layout/settings.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/voucher": {
      "filePath": "admin/_admin-layout/voucher.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/auth/_auth-layout/sign-in": {
      "filePath": "auth/_auth-layout/sign-in.lazy.tsx",
      "parent": "/auth/_auth-layout"
    },
    "/auth/_auth-layout/sign-up": {
      "filePath": "auth/_auth-layout/sign-up.lazy.tsx",
      "parent": "/auth/_auth-layout"
    },
    "/admin/_admin-layout/": {
      "filePath": "admin/_admin-layout/index.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/customer-history/$id": {
      "filePath": "admin/_admin-layout/customer-history.$id.lazy.tsx",
      "parent": "/admin/_admin-layout"
    },
    "/admin/_admin-layout/product-detail/$id": {
      "filePath": "admin/_admin-layout/product-detail.$id.lazy.tsx",
      "parent": "/admin/_admin-layout"
    }
  }
}
ROUTE_MANIFEST_END */
