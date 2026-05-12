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
    path: 'wishlist',
    loadComponent: () => import('./wishlist/wishlist.page').then(m => m.WishlistPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage)
  },
  {
    path: 'addresses',
    loadComponent: () => import('./addresses/addresses.page').then(m => m.AddressesPage)
  },
  {
    path: 'payment-methods',
    loadComponent: () => import('./payment-methods/payment-methods.page').then(m => m.PaymentMethodsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'help-support',
    loadComponent: () => import('./help-support/help-support.page').then(m => m.HelpSupportPage)
  },
  {
    path: '**',
    redirectTo: 'splash'
  }
];