import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'products', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },
      { path: 'cart', loadComponent: () => import('./cart/cart.page').then(m => m.CartPage) },
      { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'order-success',
    loadComponent: () => import('./order-success/order-success.page').then( m => m.OrderSuccessPage)
  },
];