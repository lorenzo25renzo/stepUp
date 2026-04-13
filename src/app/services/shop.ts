import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  type: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  badge?: string;
  img: string;
  images: string[];
  description: string;
  sizes: number[];
  colors: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  color: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zip: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  paymentMethod: string;
  total: number;
  date: Date;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ShopService {

  readonly products: Product[] = [
    {
      id: 1,
      title: 'Classic White Sneakers',
      type: 'Sneakers',
      price: 89.99, oldPrice: 120, discount: '25% OFF',
      rating: 4.5, reviews: 128, badge: 'SALE',
      img: 'https://placehold.co/300x300/fdf0f7/e91e8c?text=Shoe+1',
      images: [
        'https://placehold.co/600x600/fdf0f7/e91e8c?text=Shoe+1+Front',
        'https://placehold.co/600x600/fce8f3/e91e8c?text=Shoe+1+Side',
        'https://placehold.co/600x600/fbe0ef/e91e8c?text=Shoe+1+Back',
      ],
      // 📸 Replace with: img: 'assets/img/shoe1.png', images: ['assets/img/shoe1-a.png', ...]
      description: 'Premium white leather sneakers with cushioned soles. Perfect for everyday wear with a timeless design that pairs with any outfit.',
      sizes: [36, 37, 38, 39, 40, 41], colors: ['#ffffff', '#1a1a1a', '#e91e8c'], inStock: true,
    },
    {
      id: 2,
      title: 'Urban Runner Pro',
      type: 'Sports',
      price: 149.99,
      rating: 4.8, reviews: 64,
      img: 'https://placehold.co/300x300/fdf0f7/ff6b9d?text=Shoe+2',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff6b9d?text=Shoe+2+Front',
        'https://placehold.co/600x600/fce8f3/ff6b9d?text=Shoe+2+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe2.png', images: ['assets/img/shoe2-a.png', ...]
      description: 'High-performance running shoes engineered for speed and comfort. Responsive foam midsole absorbs impact on every stride.',
      sizes: [37, 38, 39, 40, 41], colors: ['#ff6b9d', '#ffffff', '#c44dff'], inStock: true,
    },
    {
      id: 3,
      title: 'Street Style High-Top',
      type: 'Casual',
      price: 129.99, oldPrice: 160, discount: '19% OFF',
      rating: 4.3, reviews: 95, badge: 'NEW',
      img: 'https://placehold.co/300x300/fdf0f7/c44dff?text=Shoe+3',
      images: [
        'https://placehold.co/600x600/fdf0f7/c44dff?text=Shoe+3+Front',
        'https://placehold.co/600x600/fce8f3/c44dff?text=Shoe+3+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe3.png', images: ['assets/img/shoe3-a.png', ...]
      description: 'Bold high-top silhouette for the streets. Reinforced ankle support meets street-ready style in this versatile everyday shoe.',
      sizes: [36, 37, 38, 39, 40], colors: ['#c44dff', '#1a1a1a', '#ffffff'], inStock: true,
    },
    {
      id: 4,
      title: 'Comfort Slide Pro',
      type: 'Casual',
      price: 49.99,
      rating: 4.1, reviews: 210,
      img: 'https://placehold.co/300x300/fdf0f7/ff9abf?text=Shoe+4',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff9abf?text=Shoe+4+Front',
      ],
      // 📸 Replace with: img: 'assets/img/shoe4.png', images: ['assets/img/shoe4-a.png']
      description: 'Cloud-soft slides for ultimate comfort. Contoured footbed and grippy outsole for indoor and outdoor use.',
      sizes: [36, 37, 38, 39, 40, 41], colors: ['#ff9abf', '#ffffff', '#1a1a1a'], inStock: true,
    },
    {
      id: 5,
      title: 'Trail Blazer GTX',
      type: 'Sports',
      price: 189.99, oldPrice: 220, discount: '14% OFF',
      rating: 4.7, reviews: 47, badge: 'HOT',
      img: 'https://placehold.co/300x300/fdf0f7/e91e8c?text=Shoe+5',
      images: [
        'https://placehold.co/600x600/fdf0f7/e91e8c?text=Shoe+5+Front',
        'https://placehold.co/600x600/fce8f3/e91e8c?text=Shoe+5+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe5.png', images: ['assets/img/shoe5-a.png', ...]
      description: 'Waterproof trail runner built for rugged terrain. Gore-Tex lining keeps feet dry while aggressive lugs grip every surface.',
      sizes: [37, 38, 39, 40, 41], colors: ['#e91e8c', '#1a1a1a', '#ff6b9d'], inStock: false,
    },
    {
      id: 6,
      title: 'Retro Court Low',
      type: 'Sneakers',
      price: 99.99,
      rating: 4.4, reviews: 183,
      img: 'https://placehold.co/300x300/fdf0f7/ff6b9d?text=Shoe+6',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff6b9d?text=Shoe+6+Front',
        'https://placehold.co/600x600/fce8f3/ff6b9d?text=Shoe+6+Side',
        'https://placehold.co/600x600/fbe0ef/ff6b9d?text=Shoe+6+Back',
      ],
      // 📸 Replace with: img: 'assets/img/shoe6.png', images: ['assets/img/shoe6-a.png', ...]
      description: 'Heritage-inspired court shoe with a modern twist. Clean lines and premium suede upper deliver timeless style.',
      sizes: [36, 37, 38, 39, 40, 41], colors: ['#ff6b9d', '#ffffff', '#f7b731'], inStock: true,
    },
    {
      id: 7,
      title: 'Blossom Platform',
      type: 'Casual',
      price: 79.99, oldPrice: 100, discount: '20% OFF',
      rating: 4.6, reviews: 312, badge: 'SALE',
      img: 'https://placehold.co/300x300/fdf0f7/c44dff?text=Shoe+7',
      images: [
        'https://placehold.co/600x600/fdf0f7/c44dff?text=Shoe+7+Front',
        'https://placehold.co/600x600/fce8f3/c44dff?text=Shoe+7+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe7.png', images: ['assets/img/shoe7-a.png', ...]
      description: 'Chunky platform sole meets delicate floral detailing. The perfect blend of bold and feminine for any occasion.',
      sizes: [35, 36, 37, 38, 39, 40], colors: ['#c44dff', '#ffb3d1', '#ffffff'], inStock: true,
    },
    {
      id: 8,
      title: 'Rose Gold Runner',
      type: 'Sports',
      price: 119.99,
      rating: 4.5, reviews: 88,
      img: 'https://placehold.co/300x300/fdf0f7/e91e8c?text=Shoe+8',
      images: [
        'https://placehold.co/600x600/fdf0f7/e91e8c?text=Shoe+8+Front',
        'https://placehold.co/600x600/fce8f3/e91e8c?text=Shoe+8+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe8.png', images: ['assets/img/shoe8-a.png', ...]
      description: 'Lightweight mesh upper with rose gold metallic accents. Built for performance, designed to turn heads.',
      sizes: [36, 37, 38, 39, 40], colors: ['#e8b4a0', '#ffffff', '#e91e8c'], inStock: true,
    },
    {
      id: 9,
      title: 'Pastel Dream Slip-On',
      type: 'Casual',
      price: 64.99,
      rating: 4.2, reviews: 156, badge: 'NEW',
      img: 'https://placehold.co/300x300/fdf0f7/ff9abf?text=Shoe+9',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff9abf?text=Shoe+9+Front',
      ],
      // 📸 Replace with: img: 'assets/img/shoe9.png', images: ['assets/img/shoe9-a.png']
      description: 'Effortlessly chic slip-ons in soft pastel hues. Elastic goring for easy on-off, memory foam insole for all-day comfort.',
      sizes: [35, 36, 37, 38, 39, 40, 41], colors: ['#ffb3d1', '#b3d9ff', '#b3ffcc'], inStock: true,
    },
    {
      id: 10,
      title: 'Velvet Wedge Sneaker',
      type: 'Sneakers',
      price: 109.99, oldPrice: 139.99, discount: '21% OFF',
      rating: 4.3, reviews: 74,
      img: 'https://placehold.co/300x300/fdf0f7/c44dff?text=Shoe+10',
      images: [
        'https://placehold.co/600x600/fdf0f7/c44dff?text=Shoe+10+Front',
        'https://placehold.co/600x600/fce8f3/c44dff?text=Shoe+10+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe10.png', images: ['assets/img/shoe10-a.png', ...]
      description: 'Hidden wedge heel with a velvet upper for a luxe elevated look. Style meets comfort in every step.',
      sizes: [35, 36, 37, 38, 39], colors: ['#c44dff', '#1a1a1a', '#e8b4a0'], inStock: true,
    },
    {
      id: 11,
      title: 'Cherry Blossom Kicks',
      type: 'Sneakers',
      price: 84.99,
      rating: 4.7, reviews: 201, badge: 'HOT',
      img: 'https://placehold.co/300x300/fdf0f7/ff6b9d?text=Shoe+11',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff6b9d?text=Shoe+11+Front',
        'https://placehold.co/600x600/fce8f3/ff6b9d?text=Shoe+11+Side',
        'https://placehold.co/600x600/fbe0ef/ff6b9d?text=Shoe+11+Back',
      ],
      // 📸 Replace with: img: 'assets/img/shoe11.png', images: ['assets/img/shoe11-a.png', ...]
      description: 'Soft pink canvas with embroidered cherry blossom motifs. Lightweight and breathable for everyday wear.',
      sizes: [35, 36, 37, 38, 39, 40], colors: ['#ff6b9d', '#ffffff', '#ffb3d1'], inStock: true,
    },
    {
      id: 12,
      title: 'Lilac Cloud Foam',
      type: 'Sports',
      price: 134.99, oldPrice: 160, discount: '16% OFF',
      rating: 4.9, reviews: 39,
      img: 'https://placehold.co/300x300/fdf0f7/c44dff?text=Shoe+12',
      images: [
        'https://placehold.co/600x600/fdf0f7/c44dff?text=Shoe+12+Front',
        'https://placehold.co/600x600/fce8f3/c44dff?text=Shoe+12+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe12.png', images: ['assets/img/shoe12-a.png', ...]
      description: 'Ultra-cushioned cloud foam midsole in dreamy lilac. Maximum energy return for long-distance comfort.',
      sizes: [36, 37, 38, 39, 40, 41], colors: ['#c44dff', '#e8b4ff', '#ffffff'], inStock: true,
    },
    {
      id: 13,
      title: 'Glitter Pump Sneaker',
      type: 'Casual',
      price: 94.99,
      rating: 4.0, reviews: 128, badge: 'NEW',
      img: 'https://placehold.co/300x300/fdf0f7/e91e8c?text=Shoe+13',
      images: [
        'https://placehold.co/600x600/fdf0f7/e91e8c?text=Shoe+13+Front',
        'https://placehold.co/600x600/fce8f3/e91e8c?text=Shoe+13+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe13.png', images: ['assets/img/shoe13-a.png', ...]
      description: 'Statement glitter upper with a subtle pump heel. Goes from day to night without missing a beat.',
      sizes: [35, 36, 37, 38, 39, 40], colors: ['#e91e8c', '#f7c948', '#c44dff'], inStock: true,
    },
    {
      id: 14,
      title: 'Sakura Trail Hiker',
      type: 'Sports',
      price: 159.99, oldPrice: 195, discount: '18% OFF',
      rating: 4.6, reviews: 55, badge: 'SALE',
      img: 'https://placehold.co/300x300/fdf0f7/ff9abf?text=Shoe+14',
      images: [
        'https://placehold.co/600x600/fdf0f7/ff9abf?text=Shoe+14+Front',
        'https://placehold.co/600x600/fce8f3/ff9abf?text=Shoe+14+Side',
      ],
      // 📸 Replace with: img: 'assets/img/shoe14.png', images: ['assets/img/shoe14-a.png', ...]
      description: 'Trail-ready hiker with a feminine sakura pink colorway. Waterproof upper and aggressive outsole for any adventure.',
      sizes: [36, 37, 38, 39, 40, 41], colors: ['#ff9abf', '#1a1a1a', '#e8b4a0'], inStock: true,
    },
  ];

  // ─── Wishlist ─────────────────────────────────────────────
  private _wishlist = signal<number[]>([]);
  wishlist = computed(() => this._wishlist());
  wishlistCount = computed(() => this._wishlist().length);

  toggleWishlist(id: number) {
    this._wishlist.update(list =>
      list.includes(id) ? list.filter(i => i !== id) : [...list, id]
    );
  }

  isWishlisted(id: number) {
    return this._wishlist().includes(id);
  }

  // ─── Cart ─────────────────────────────────────────────────
  private _cart = signal<CartItem[]>([]);
  cart = computed(() => this._cart());
  cartCount = computed(() => this._cart().reduce((a, b) => a + b.quantity, 0));
  cartTotal = computed(() =>
    this._cart().reduce((a, b) => a + b.product.price * b.quantity, 0)
  );

  addToCart(product: Product, size: number, color: string) {
    this._cart.update(cart => {
      const existing = cart.find(
        i => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existing) {
        return cart.map(i =>
          i === existing ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...cart, { product, quantity: 1, size, color }];
    });
  }

  removeFromCart(index: number) {
    this._cart.update(cart => cart.filter((_, i) => i !== index));
  }

  updateQuantity(index: number, delta: number) {
    this._cart.update(cart =>
      cart.map((item, i) => {
        if (i !== index) return item;
        const q = item.quantity + delta;
        return q < 1 ? item : { ...item, quantity: q };
      })
    );
  }

  // ─── Buy Now ──────────────────────────────────────────────
  private _buyNowItem = signal<{ product: Product; size: number; color: string } | null>(null);
  buyNowItem = computed(() => this._buyNowItem());

  setBuyNow(product: Product, size: number, color: string) {
    this._buyNowItem.set({ product, size, color });
  }

  clearBuyNow() {
    this._buyNowItem.set(null);
  }

  // ─── Orders ──────────────────────────────────────────────
  private _orders = signal<Order[]>([]);
  orders = computed(() => this._orders());

  // ─── Checkout Helpers ────────────────────────────────────
  // Returns buy-now item OR full cart depending on flow
  getCheckoutItems(): CartItem[] {
    const buyNow = this._buyNowItem();
    if (buyNow) {
      return [{
        product: buyNow.product,
        quantity: 1,
        size: buyNow.size,
        color: buyNow.color
      }];
    }
    return this._cart();
  }

  getCheckoutTotal(): number {
    return this.getCheckoutItems()
      .reduce((a, b) => a + b.product.price * b.quantity, 0);
  }

  placeOrder(shipping: ShippingInfo, paymentMethod: string): Order {
    const order: Order = {
      id: 'ORD-' + Date.now(),
      items: this.getCheckoutItems(),
      shipping,
      paymentMethod,
      total: this.getCheckoutTotal(),
      date: new Date(),
      status: 'Confirmed',
    };
    this._orders.update(o => [order, ...o]);

    // Clear cart only when coming from cart flow, not buy-now
    if (!this._buyNowItem()) {
      this._cart.set([]);
    }
    this._buyNowItem.set(null);

    return order;
  }

  // ─── Utilities ───────────────────────────────────────────
  getProduct(id: number) {
    return this.products.find(p => p.id === id);
  }

  getByCategory(cat: string) {
    if (cat === 'All') return this.products;
    return this.products.filter(p => p.type === cat);
  }
}