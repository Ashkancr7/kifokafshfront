// src/services/api.ts
import axios from "axios";
import { Product } from "@/types"; // تایپ‌های خودت رو ایمپورت کن

const API_URL = "http://localhost:8000";

// ساخت یک اینستنس از اکسدیوس برای تنظیمات تکراری
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ProductParams {
  category?: string;
  search?: string;
  minPrice?: number; // توی فرانت minPrice میگیم
  maxPrice?: number;
}

// 1. دریافت لیست همه محصولات
export const getProducts = async (params?: ProductParams): Promise<Product[]> => {
  try {
    // تبدیل پارامترهای فرانت (minPrice) به فرمت بکند (min_price) اگر لازم بود
    // اما اینجا ساده میریم جلو. فقط حواست باشه اسم کلیدها با پایتون مچ باشه.
    // پایتون: min_price / فرانت: min_price بفرستیم راحت تره
    
    const response = await api.get("/products", {
      params: {
        category: params?.category,
        search: params?.search,
        min_price: params?.minPrice, // نگاشت minPrice به min_price
        max_price: params?.maxPrice,
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
    return [];
  }
};

// 2. دریافت یک محصول خاص (برای صفحه جزئیات)
export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`خطا در دریافت محصول ${id}:`, error);
    return null;
  }
};

// اینترفیس‌ها برای تایپ‌اسکریپت
interface OrderItem {
  product_id: number;
  quantity: number;
}

interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
}

export const createOrder = async (orderData: OrderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error; 
  }
};