"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // برای نمایش پیام
import Container from "@/components/ui/Container";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { createOrder } from "@/services/api"; // تابع جدیدمون

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.items.reduce((total, item) => total + Number(item.price), 0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // ساخت آبجکت سفارش برای ارسال به پایتون
    const orderData = {
      customer_name: formData.get("name") as string,
      customer_phone: formData.get("phone") as string,
      customer_address: formData.get("address") as string,
      items: cart.items.map((item) => ({
        product_id: Number(item.id),
        quantity: 1, 
      })),
    };

    try {
      await createOrder(orderData);
      toast.success("سفارش شما با موفقیت ثبت شد! 🎉");
      cart.removeAll(); // خالی کردن سبد
      router.push("/"); // بازگشت به خانه
    } catch (error) {
      toast.error("خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  // اگر سبد خالیه، فرم رو نشون نده
  if (cart.items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <p className="text-gray-500">سبد خرید شما خالی است.</p>
      </Container>
    );
  }

  return (
    <div className="bg-white">
      <Container className="py-10">
        <h1 className="text-3xl font-bold mb-8">نهایی کردن خرید</h1>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
          {/* فرم اطلاعات */}
          <div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">نام کامل</label>
                <input required name="name" className="mt-1 block w-full rounded-md border border-gray-300 p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره تماس</label>
                <input required name="phone" type="tel" className="mt-1 block w-full rounded-md border border-gray-300 p-3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">آدرس دقیق</label>
                <textarea required name="address" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 p-3" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {loading ? "در حال ثبت..." : `پرداخت مبلغ (${formatPrice(totalPrice)})`}
              </button>
            </form>
          </div>

          {/* خلاصه سبد خرید (اختیاری ولی قشنگه) */}
          <div className="mt-10 lg:mt-0 bg-gray-50 p-6 rounded-xl h-fit">
            <h3 className="font-bold mb-4">اقلام سفارش</h3>
            <ul className="space-y-4">
                {cart.items.map(item => (
                    <li key={item.id} className="flex justify-between text-sm">
                        <span>{item.title}</span>
                        <span>{formatPrice(item.price)}</span>
                    </li>
                ))}
            </ul>
            <div className="border-t mt-4 pt-4 font-bold flex justify-between">
                <span>جمع کل</span>
                <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}