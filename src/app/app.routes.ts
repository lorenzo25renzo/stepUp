import { Routes } from '@angular/router';

export const routes: Routes = [

  /* Default Route */
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },

  /* Splash */
  {
    path: 'splash',
    loadComponent: () =>
      import('./splash/splash.page')
        .then(m => m.SplashPage)
  },

  /* Authentication */
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page')
        .then(m => m.RegisterPage)
  },

  /* Tabs Layout */
  {
    path: '',
    loadComponent: () =>
      import('./tabs/tabs.page')
        .then(m => m.TabsPage),

    children: [

      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.page')
            .then(m => m.HomePage)
      },

      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.page')
            .then(m => m.ProductsPage)
      },

      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart.page')
            .then(m => m.CartPage)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page')
            .then(m => m.ProfilePage)
      }

    ]
  },

  /* Product Detail */
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product-detail/product-detail.page')
        .then(m => m.ProductDetailPage)
  },

  /* Checkout */
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.page')
        .then(m => m.CheckoutPage)
  },

  /* Order Success */
  {
    path: 'order-success',
    loadComponent: () =>
      import('./order-success/order-success.page')
        .then(m => m.OrderSuccessPage)
  },

  /* Wishlist */
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./wishlist/wishlist.page')
        .then(m => m.WishlistPage)
  },

  /* Orders */
  {
    path: 'orders',
    loadComponent: () =>
      import('./orders/orders.page')
        .then(m => m.OrdersPage)
  },

  /* Addresses */
  {
    path: 'addresses',
    loadComponent: () =>
      import('./addresses/addresses.page')
        .then(m => m.AddressesPage)
  },

  /* Payment Methods */
  {
    path: 'payment-methods',
    loadComponent: () =>
      import('./payment-methods/payment-methods.page')
        .then(m => m.PaymentMethodsPage)
  },

  /* Settings */
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page')
        .then(m => m.SettingsPage)
  },

  /* Help Support */
  {
    path: 'help-support',
    loadComponent: () =>
      import('./help-support/help-support.page')
        .then(m => m.HelpSupportPage)
  },

  /* Notifications */
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notifications/notifications.page')
        .then(m => m.NotificationsPage)
  },

  /* Wildcard Route */
  {
    path: '**',
    redirectTo: 'splash'
  }

];