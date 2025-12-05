"use client";

import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useEffect, } from "react";
import { useRouter } from "next/navigation"; // <--- اضافه کن
// import { useSearchParams } from "next/navigation"; // اگر بعدا خواستی وصل کنی به درگاه

const Summary = () => {
    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);
    const router = useRouter();

    // محاسبه قیمت کل
    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0);

    const onCheckout = () => {
        // اینجا بعداً ریکوئست می‌زنی به FastAPI برای دریافت لینک پرداخت
        router.push("/checkout");
    };

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">خلاصه سفارش</h2>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">جمع کل</div>
                    <div className="text-base font-medium text-gray-900">{formatPrice(totalPrice)} تومان</div>
                </div>
            </div>

            <button
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full mt-6 bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
                تسویه حساب
            </button>
        </div>
    );
};

export default Summary;