import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'home',     loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'products', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },
      { path: 'cart',     loadComponent: () => import('./cart/cart.page').then(m => m.CartPage) },
      { path: 'profile',  loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) },
    ]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then(m => m.CheckoutPage)
  },
  {
    path: 'order-success',
    loadComponent: () => import('./order-success/order-success.page').then(m => m.OrderSuccessPage)
  },
  {
    path: '**',
    redirectTo: 'splash'
  },  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  }

];