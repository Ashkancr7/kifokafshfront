// src/types/index.ts

// اینترفیس محصول دقیقاً منطبق با مدل Python
export interface Product {
  id: number; // پایتون عدد برمیگردونه (اگه int تعریف کردی)
  title: string;
  price: number;
  category: string;
  description: string;
  image_url: string; // <--- تغییر مهم: از imageUrl شد image_url
  // is_available?: boolean;
}

// پارامترهای فیلتر کردن محصولات
export interface ProductParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

// ساختار آیتم‌های سفارش برای ارسال به بکند
export interface OrderItem {
  product_id: number;
  quantity: number;
}

// ساختار کلی سفارش برای ارسال
export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
}